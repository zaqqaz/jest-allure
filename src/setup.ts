import Allure from "allure-js-commons";
import stripAnsi from "strip-ansi";
import {EndPrerequisitesStep, Reporter, StartPrerequisitesStep, Status} from "./Reporter";

declare namespace jasmine {
    function getEnv(): any;
    interface CustomReporter {
        jasmineStarted?(suiteInfo: any): void;
        suiteStarted?(result: CustomReporterResult): void;
        specStarted?(result: CustomReporterResult): void;
        specDone?(result: CustomReporterResult): void;
        suiteDone?(result: CustomReporterResult): void;
        jasmineDone?(runDetails: any): void;
    }
    interface CustomReporterResult {
        description: string;
        failedExpectations?: any[];
        fullName: string;
        id: string;
        passedExpectations?: any[];
        pendingReason?: string;
        status?: string;
    }
}

class JasmineAllureReporter implements jasmine.CustomReporter {
    private allure: Allure;
    private reporter: Reporter;

    constructor(allure: Allure, reporter: Reporter) {
        this.allure = allure;
        this.reporter = reporter;
    }

    suiteStarted(suite: jasmine.CustomReporterResult) {
        this.allure.startSuite(suite.fullName);
    }

    suiteDone() {
        this.allure.endSuite();
    };

    specStarted(spec: jasmine.CustomReporterResult) {
        this.allure.startCase(spec.description);
        const prerequisiteActions = this.reporter.getPrerequisiteActions();
        if (prerequisiteActions.length > 0) {
            this.allure.startStep('Prerequisites', prerequisiteActions[0].timestamp);
            for (const action of prerequisiteActions) {
                if (typeof (action as StartPrerequisitesStep).name !== "undefined") {
                    this.allure.startStep((action as StartPrerequisitesStep).name, action.timestamp);
                    continue;
                }
                if (typeof (action as EndPrerequisitesStep).status !== "undefined") {
                    this.allure.endStep((action as EndPrerequisitesStep).status, action.timestamp);
                }
            }
            this.allure.endStep(Status.Passed, prerequisiteActions[prerequisiteActions.length - 1].timestamp);
        }
    };

    specDone(spec: jasmine.CustomReporterResult) {
        let error;
        if (spec.status === "pending") {
            error = { message: spec.pendingReason };
        }
        if (spec.status === "disabled") {
            error = { message: "This test was disabled" };
        }
        const failure = spec.failedExpectations && spec.failedExpectations.length ? spec.failedExpectations[0] : undefined;
        if (failure) {
            error = {
                message: stripAnsi(failure.message),
                stack: stripAnsi(failure.stack)
            };
        }

        this.allure.endCase(spec.status as jest.Status, error);
    };
}

export function registerAllureReporter() {
    const allure = new Allure();
    const reporter = (global as any).reporter = new Reporter(allure);
    jasmine.getEnv().addReporter(new JasmineAllureReporter(allure, reporter));
}

registerAllureReporter();

declare global {
    export const reporter: Reporter;
}

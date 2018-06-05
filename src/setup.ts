import Allure from "allure-js-commons";
import stripAnsi from "strip-ansi";
import { Reporter } from "./Reporter";

class JasmineAllureReporter implements jasmine.CustomReporter{
    private allure: Allure;

    constructor(allure: Allure) {
        this.allure = allure;
    }

    suiteStarted(suite: jasmine.CustomReporterResult) {
        this.allure.startSuite(suite.fullName);
    }

    suiteDone() {
        this.allure.endSuite();
    };

    specStarted(spec: jasmine.CustomReporterResult) {
        this.allure.startCase(spec.description);
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
    jasmine.getEnv().addReporter(new JasmineAllureReporter(allure));
}

registerAllureReporter();

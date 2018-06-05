import Allure from "allure-js-commons";

export enum Status {
    Passed = "passed",
    Pending = "pending",
    Skipped = "skipped",
    Failed = "failed",
    Broken = "broken",
}

export enum Severity {
    Blocker = 'blocker',
    Critical = 'critical',
    Normal = 'normal',
    Minor = 'minor',
    Trivial = 'trivial'
}

export class Reporter {
    private allure: Allure;

    constructor(allure: Allure) {
        this.allure = allure;
    }

    public description(description: string) {
        this.allure.setDescription(description);
    }

    public severity(severity: Severity) {
        this.addLabel('severity', severity);
    }

    public epic(epic: string) {
        this.addLabel('epic', epic);
    }

    public feature(feature: string) {
        this.addLabel('feature', feature);
    }

    public story(story: string) {
        this.addLabel('story', story);
    }

    public startStep(name: string) {
        this.allure.startStep(name);
    }

    public endStep(status: Status = Status.Passed) {
        this.allure.endStep(status);
    }

    public addArgument(name: string) {
        this.allure.startStep(name);
    }

    public addEnvironment(name: string, value: string) {
        this.allure.getCurrentTest().addParameter('environment-variable', name, value);
    }

    public addAttachment(name: string, buffer: any, type: string) {
        this.allure.addAttachment(name, buffer, type);
    }

    public addLabel(name: string, value: string) {
        this.allure.getCurrentTest().addLabel(name, value);
    };

    public addParameter(paramName: string, name: string, value: string) {
        this.allure.getCurrentTest().addParameter(paramName, name, value);
    };
}

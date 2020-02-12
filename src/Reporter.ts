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
        return this;
    }

    public severity(severity: Severity) {
        this.addLabel('severity', severity);
        return this;
    }

    public epic(epic: string) {
        this.addLabel('epic', epic);
        return this;
    }

    public feature(feature: string) {
        this.addLabel('feature', feature);
        return this;
    }

    public story(story: string) {
        this.addLabel('story', story);
        return this;
    }

    public testId(testId: string) {
        this.addLabel('testId', testId);
        return this;
    }

    public startStep(name: string) {
        this.allure.startStep(name);
        return this;
    }

    public endStep(status: Status = Status.Passed) {
        this.allure.endStep(status);
        return this;
    }

    public addArgument(name: string) {
        this.allure.startStep(name);
        return this;
    }

    public addEnvironment(name: string, value: string) {
        this.allure.getCurrentTest().addParameter('environment-variable', name, value);
        return this;
    }

    public addAttachment(name: string, buffer: any, type: string) {
        this.allure.addAttachment(name, buffer, type);
        return this;
    }

    public addLabel(name: string, value: string) {
        this.allure.getCurrentTest().addLabel(name, value);
        return this;
    };

    public addParameter(paramName: string, name: string, value: string) {
        this.allure.getCurrentTest().addParameter(paramName, name, value);
        return this;
    };
}

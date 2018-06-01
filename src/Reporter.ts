import Allure from "allure-js-commons";

export enum ReporterStatus {
    Passed = "passed",
    Pending = "pending",
    Skipped = "skipped",
    Failed = "failed",
    Broken = "broken",
}

class Reporter {
    private allure = new Allure();

    public setDescription(description: string) {
        this.allure.setDescription(description);
    }

    public startStep(name: string) {
        this.allure.startStep(name);
    }

    public endStep(status: ReporterStatus) {
        this.allure.endStep(status);
    }

    public addAttachment(name: string, buffer: any, type: string) {
        this.allure.addAttachment(name, buffer, type);
    }
}

import path from "path";

declare namespace JestAllureReporter {
    type ReporterConfig = {
        resultsDir: string
    }
}

class JestAllureReporter implements jest.Reporter {
    private reporterOptions: JestAllureReporter.ReporterConfig;

    constructor(globalConfig: jest.GlobalConfig, options: Partial<JestAllureReporter.ReporterConfig> = {}) {
        this.reporterOptions = { resultsDir: path.resolve(".", options.resultsDir || "allure-results") };
    }

    onTestStart(test: jest.Test) {
        const setupPath = require.resolve('./setup');
        const setupTestFrameworkScriptFile = test.context.config.setupTestFrameworkScriptFile;
        if (!setupTestFrameworkScriptFile) {
            test.context.config = { ...test.context.config, setupTestFrameworkScriptFile: setupPath }
        }
    }
}

export = JestAllureReporter;

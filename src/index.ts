import path from "path";
import Allure from "allure-js-commons";
import stripAnsi from "strip-ansi";

declare namespace JestAllureReporter {
    type ReporterConfig = {
        resultsDir: string
    }
}

class JestAllureReporter implements jest.Reporter {
    private globalConfig: jest.GlobalConfig;
    static allure = new Allure();

    constructor(globalConfig: jest.GlobalConfig, options?: JestAllureReporter.ReporterConfig) {
        this.globalConfig = globalConfig;
        const outDir = path.resolve(".", options && options.resultsDir || 'allure-results');
        JestAllureReporter.allure.setOptions({targetDir: outDir})
    }

    public onTestResult(test: jest.Test, testResult: jest.TestResult, aggregatedResult: jest.AggregatedResult) {
        let time = Date.now();
        for (const result of testResult.testResults) {
            const currentSuite = JestAllureReporter.allure.getCurrentSuite();
            const testSuiteName = result.ancestorTitles.join(" ");
            if (!currentSuite) {
                JestAllureReporter.allure.startSuite(testSuiteName, time);
            } else if (currentSuite.name !== testSuiteName) {
                JestAllureReporter.allure.endSuite(time);
                JestAllureReporter.allure.startSuite(testSuiteName, time);
            }
            JestAllureReporter.allure.startCase(result.title, time);
            time += result.duration || 0;
            JestAllureReporter.allure.endCase(
                result.status,
                result.failureMessages.length ? {message: stripAnsi(result.failureMessages[0])} : undefined,
                time
            );
        }

        if(JestAllureReporter.allure.getCurrentSuite()) {
            JestAllureReporter.allure.endSuite(time);
        }
    }
}

export = JestAllureReporter;

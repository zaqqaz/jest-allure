import * as path from "path";
import * as fs from "fs";

type ReporterConfig = {
    resultsDir: string
}

class JestAllureReporter implements jest.Reporter {
    private globalConfig: jest.GlobalConfig;

    constructor(globalConfig: jest.GlobalConfig, options?: ReporterConfig) {
        this.globalConfig = globalConfig;
        const resultsDir = options.resultsDir || 'allure-results';
        const outDir = path.resolve(".", resultsDir);
        allure.setOptions({targetDir: outDir});
    }

    public onTestResult(...props) {
        fs.writeFileSync("./test_results.js", JSON.stringify(props));
    }
    public onRunComplete(contexts: jest.Set<jest.Context>, results: jest.AggregatedResult) {
        fs.writeFileSync("./results.js", JSON.stringify(results));
    }
}

export = JestAllureReporter;

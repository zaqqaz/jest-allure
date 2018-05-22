const fs = require("fs");

class JestAllureReport implements jest.Reporter {
    private _globalConfig: jest.GlobalConfig;
    private _options: {};

    constructor(globalConfig: jest.GlobalConfig, options: {}) {
        this._globalConfig = globalConfig;
        this._options = options;
    }

    public onTestResult(...props) {
        console.log('Custom reporter output:');
        // console.log('GlobalConfig: ', this._globalConfig);
        // console.log('Options: ', this._options)
        fs.writeFileSync("./test_results.js", JSON.stringify(props));
    }
    public onRunComplete(contexts: jest.Set<jest.Context>, results: jest.AggregatedResult) {
        console.log('Custom reporter output:');
        // console.log('GlobalConfig: ', this._globalConfig);
        // console.log('Options: ', this._options)
        console.log('results: ', results)
        fs.writeFileSync("./results.js", JSON.stringify(results));
    }
}

export = JestAllureReport;

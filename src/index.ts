class JestAllureReport {
    constructor(globalConfig: any, options: any) {
        this._globalConfig = globalConfig;
        this._options = options;
    }

    public onRunStart(...props) {
        console.log(props);
    }
}

export = JestAllureReport;

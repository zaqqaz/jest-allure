const NodeEnvironment = require('jest-environment-node');
const JestAllureReporter = require('./index');

class AllureEnvironment extends NodeEnvironment {
    setup() {
        super.setup();
        this.global.allure = JestAllureReporter.allure;
    }
}

export = AllureEnvironment

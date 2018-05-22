"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JestAllureReport = /** @class */ (function () {
    function JestAllureReport(globalConfig, options) {
        this._globalConfig = globalConfig;
        this._options = options;
    }
    JestAllureReport.prototype.onRunStart = function () {
        var props = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            props[_i] = arguments[_i];
        }
        console.log(props);
    };
    return JestAllureReport;
}());
exports.default = JestAllureReport;

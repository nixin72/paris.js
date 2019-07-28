"use strict";
exports.__esModule = true;
var P = /** @class */ (function () {
    function P(token, parser) {
        this.rules = [];
        this.rules.concat(token, parser ? parser.rules : []);
        return this;
    }
    P.p = function (token) {
        return new P(token);
    };
    P.or = function (par1, par2) {
        return new P("");
    };
    P.then = function (parser) {
        var p = new P("");
        return p;
    };
    P.prototype.parse = function (input) {
        console.log(this);
        return new Result([], [], []);
    };
    return P;
}());
exports["default"] = P;
var Result = /** @class */ (function () {
    function Result(ast, errors, warnings) {
        this.ast = ast;
        this.errors = errors;
        this.warnings = warnings;
    }
    Result.prototype.pass = function (cb) {
        cb(this.ast);
        return this;
    };
    Result.prototype.fail = function (cb) {
        if (this.errors.length > 0) {
            cb(this.errors);
        }
        return this;
    };
    Result.prototype.warn = function (cb) {
        if (this.warnings.length > 0) {
            cb(this.warnings);
        }
        return this;
    };
    return Result;
}());

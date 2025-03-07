"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
if (!process.env.NODE_ENV)
    process.env.NODE_ENV = "development";
var Config = /** @class */ (function () {
    function Config() {
        this.isDevelopment = process.env.NODE_ENV === "development";
        this.isProduction = process.env.NODE_ENV === "production";
        this.port = 0;
        this.sqlHost = "";
        this.sqlUser = "";
        this.sqlPassword = "";
        this.sqlDatabase = "";
    }
    return Config;
}());
var ProductionConfig = /** @class */ (function (_super) {
    __extends(ProductionConfig, _super);
    function ProductionConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.port = +process.env.PORT;
        _this.sqlHost = "eu-cdbr-west-03.cleardb.net";
        _this.sqlUser = "b222d8c70ab7a3";
        _this.sqlPassword = "33e39817";
        _this.sqlDatabase = "heroku_a21723b3120e7c8";
        return _this;
    }
    return ProductionConfig;
}(Config));
var DevelopmentConfig = /** @class */ (function (_super) {
    __extends(DevelopmentConfig, _super);
    function DevelopmentConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.port = 3001;
        _this.sqlHost = "localhost";
        _this.sqlUser = "root";
        _this.sqlPassword = "";
        _this.sqlDatabase = "booking";
        return _this;
    }
    return DevelopmentConfig;
}(Config));
// Connection String:
// mysql://user:password@host/database?reconnect=true
// mysql://b222d8c70ab7a3:33e39817@eu-cdbr-west-03.cleardb.net/heroku_a21723b3120e7c8?reconnect=true
var config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();
exports.default = config;

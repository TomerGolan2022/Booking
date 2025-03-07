if(!process.env.NODE_ENV) process.env.NODE_ENV = "development";

class Config {
    public isDevelopment = process.env.NODE_ENV === "development";
    public isProduction = process.env.NODE_ENV === "production";
    public port = 0;
    public sqlHost: string = "";
    public sqlUser: string = "";
    public sqlPassword: string = "";
    public sqlDatabase: string = "";
}

class ProductionConfig extends Config {
    public port = +process.env.PORT;
    public sqlHost = "eu-cdbr-west-03.cleardb.net";
    public sqlUser = "b222d8c70ab7a3";
    public sqlPassword = "33e39817";
    public sqlDatabase = "heroku_a21723b3120e7c8";
}

class DevelopmentConfig extends Config {
    public port = 3001;
    public sqlHost = "localhost";
    public sqlUser = "root";
    public sqlPassword = "";
    public sqlDatabase = "booking";
}

// Connection String:
// mysql://user:password@host/database?reconnect=true
// mysql://b222d8c70ab7a3:33e39817@eu-cdbr-west-03.cleardb.net/heroku_a21723b3120e7c8?reconnect=true

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;

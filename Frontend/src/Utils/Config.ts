class Config {
    public port = ""
    public registerUrl = "";
    public loginUrl = "";
    public usersUrl = "";
    public vacationsUrl = "";
    public vacationsByUserUrl = "";
    public vacationImagesUrl = "";
    public followersUrl = "";
    public followersByVacationIdUrl = "";
    public isFollowingUrl = "";
}

class ProductionConfig extends Config {
    public port = "https://booking-by-tomer-golan.herokuapp.com"
    public registerUrl = "https://booking-by-tomer-golan.herokuapp.com/api/auth/register/";
    public loginUrl = "https://booking-by-tomer-golan.herokuapp.com/api/auth/login/";
    public usersUrl = "https://booking-by-tomer-golan.herokuapp.com/api/users/";
    public vacationsUrl = "https://booking-by-tomer-golan.herokuapp.com/api/vacations/";
    public vacationsByUserUrl = "https://booking-by-tomer-golan.herokuapp.com/api/vacations-by-user/";
    public vacationImagesUrl = "https://booking-by-tomer-golan.herokuapp.com/api/vacations/images/";
    public followersUrl = "https://booking-by-tomer-golan.herokuapp.com/api/followers/";
    public followersByVacationIdUrl = "https://booking-by-tomer-golan.herokuapp.com/api/followers-by-vacationId/";
    public isFollowingUrl = "https://booking-by-tomer-golan.herokuapp.com/api/followers/is-following/";
}

class DevelopmentConfig extends Config {
    public port = "http://localhost:3001"
    public registerUrl = "http://localhost:3001/api/auth/register/";
    public loginUrl = "http://localhost:3001/api/auth/login/";
    public usersUrl = "http://localhost:3001/api/users/";
    public vacationsUrl = "http://localhost:3001/api/vacations/";
    public vacationsByUserUrl = "http://localhost:3001/api/vacations-by-user/";
    public vacationImagesUrl = "http://localhost:3001/api/vacations/images/";
    public followersUrl = "http://localhost:3001/api/followers/";
    public followersByVacationIdUrl = "http://localhost:3001/api/followers-by-vacationId/";
    public isFollowingUrl = "http://localhost:3001/api/followers/is-following/";
}

const config = process.env.NODE_ENV === "production" ? new ProductionConfig() : new DevelopmentConfig();

export default config;

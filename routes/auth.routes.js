const user = require("../controllers/user.controller");
module.exports = app => {

    const user = require("../controllers/user.controller.js");
    let router = require("express").Router();

    router.post("/register", user.registerUser);

    router.post("/login", user.loginUser);

    app.use('/api/auth', router);
};
module.exports = app => {
    const persons = require("../controllers/person.controller.js");
    const authMiddleware = require('./authMiddleware');
    let router = require("express").Router();

    router.post("/", authMiddleware,  persons.create);

    router.get("/", authMiddleware,  persons.findAll);

    router.get("/:id", authMiddleware, persons.findOne);

    router.put("/:id", authMiddleware,  persons.update);

    router.delete("/:id", authMiddleware, persons.delete);

    router.delete("/", authMiddleware,  persons.deleteAll);

    app.use('/api/person', authMiddleware,  router);
};
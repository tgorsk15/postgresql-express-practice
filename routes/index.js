const { Router } = require('express');
const usersController = require('../controllers/usersController')
const usersRouter =Router();

usersRouter.get("/", usersController.logUsersGet)
usersRouter.get("/new", usersController.newUserGet)
usersRouter.post("/new", usersController.newUserPost)

module.exports = usersRouter;
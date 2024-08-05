const { Router } = require('express');
const usersController = require('../controllers/usersController')
const usersRouter =Router();

usersRouter.get("/", usersController.logUsersGet)
usersRouter.get("/new", usersController.newUserGet)
usersRouter.post("/new", usersController.newUserPost)

usersRouter.get("/search", usersController.searchUsersGet)
usersRouter.post("/search", usersController.searchUsersPost)

module.exports = usersRouter;
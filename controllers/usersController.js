const asyncHandler = require("express-async-handler")

const { body, validationResult } = require("express-validator");

const lengthErr = 'User name must be between 4 and 15 characters long'

const validateUser = [
    body("userName").trim()
        .isLength({ min: 4, max: 15 }).withMessage(`${lengthErr}`)
]

exports.logUsersGet = asyncHandler(async (req, res) => {
    console.log('usernames being logged here - wip')
    res.render("index")
})

exports.newUserGet = asyncHandler(async (req, res) => {
    res.render("new", {
        title: "Add a New User"
    })
})

exports.newUserPost = [
    validateUser,
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      console.log(errors)
      if (!errors.isEmpty()) {
        return res.status(400).render("new", {
          title: "Add a New user",
          errors: errors.array(),
        });
      }
      console.log(`username to be saved: ${req.body.userName}`)
      res.redirect("/")
    })
]
const asyncHandler = require("express-async-handler")
const db = require("../dbs/queries")

const { body, validationResult } = require("express-validator");

const lengthErr = 'User name must be between 4 and 15 characters long'

const validateUser = [
    body("userName").trim()
        .isLength({ min: 4, max: 15 }).withMessage(`${lengthErr}`)
]

exports.logUsersGet = asyncHandler(async (req, res) => {
    
    const usernames = await db.getAllUsernames();
    console.log('usernames: ', usernames)
    const results = "Usernames: " + usernames.map(user => user.username).join(", ")
    res.render("index", {
        usernames: results,
    })
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
      if (!errors.isEmpty()) {
        return res.status(400).render("new", {
          title: "Add a New user",
          errors: errors.array(),
        });
      }
      const { userName } = req.body;
      await db.insertUsername(userName);
      console.log(`username to be saved: ${req.body.userName}`)
      res.redirect("/")
    })
]
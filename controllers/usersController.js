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
      res.redirect("/")
    })
];

exports.searchUsersGet = async (req, res) => {
    res.render("search", {
        title: "Search",
    })
}

exports.searchUsersPost = async (req, res) => {
    try {
        const queryName = req.body.queryName.toLowerCase()
        const results = await db.searchUserName(queryName)
        // console.log(results)

        res.render("search", {
            title: "Search",
            results: results
        })
    } catch (error) {
        console.log(error)
    }
    
}

exports.deleteUsersGet = async (req, res) => {
    try {
        await db.deleteUsers();
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
} 
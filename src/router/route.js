const express = require("express")
const router = express.Router()
const { } = require("../controllers/userController")
const {  } = require("../controllers/courseController")
const { } = require("../controllers/courseController")

// **********************************************Invalid Path*******************

router.all("/*", async function (req, res) {
    return res.status(400).send({ status: false, message: "Page not found" });
});

module.exports = router
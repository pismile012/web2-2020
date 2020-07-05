const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "HANDLING GET request to /users"
    });
});

router.post("/", (req, res, next) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    res.status(200).json({
        message: "HANDLING POST request to /users",
        user: user
    });
});

router.get("/:userId", (req, res, next) => {
    const id = req.params.userId;
    res.status(200).json({
        message: "You passed an id + " + id,
        id
    });
});

router.patch("/:userId", (req, res, next) => {
    const id = req.params.userId;
    res.status(200).json({
        message: "Updated user + " + id,
        id
    });
});

router.delete("/:userId", (req, res, next) => {
    const id = req.params.userId;
    res.status(200).json({
        message: "Deleted user + " + id,
        id
    });
});


module.exports = router;
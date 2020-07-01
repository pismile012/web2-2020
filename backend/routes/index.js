var express = require('express');
var crypto = require('crypto');
var bcrypt = require('bcrypt');
var router = express.Router();
const passport = require("passport");
const db = require("../models/db");
const Types = require("../models/typesOfUser");
const Users = require("../models/users");
const Todos = require("../models/todos");
const initializePassport = require("../services/passport-config");


/* GET home page. */
router.get('/', async function(req, res, next) {
  await Types.initializeTypes();
  await Users.initializeUsers();
  await Todos.initializeTodos();
  
  res.render('index', { title: 'Express' });
});

router.get('/getTodo/:id', async(req, res, next) => {
  const url = process.env.URL_RETURN || 'http://localhost:3001';
  res.setHeader('Access-Control-Allow-Origin', url); 
  const arrOfTodos = await Todos.findAll({
    where: {
      isDone: false,
      userId: req.params.id
    }
  });
  res.send(arrOfTodos);
});
router.get('/getDoneTodo/:id', async(req, res, next) => {
  const url = process.env.URL_RETURN || 'http://localhost:3001';
  res.setHeader('Access-Control-Allow-Origin', url); 
  const arrOfTodos = await Todos.findAll({
    where: {
      isDone: true,
      userId: req.params.id
    }
  });
  res.send(arrOfTodos);
});

router.get('/todo/:id', async (req, res) => {
  const todoId = req.params.id;
  const tempTodo = await Todos.findByPk(todoId);
  const url = (process.env.URL_RETURN || "http://localhost:3001") + "/todos";
  if(!tempTodo){
    console.log("Không có todo");
  }
  try{
    tempTodo.isDone = true;
    await tempTodo.save();
  }catch(err){
    console.log("Somethings wrong: ");
    console.log(err);
  }

  res.redirect(url);
});

router.get('/register', (req, res) => {
  console.log(req.query.username);
  console.log(req.query.password);
  console.log(req.query.term);
  const url = process.env.URL_RETURN || "http://localhost:3001";

  res.redirect(url);
});

router.post('/register', async (req, res) => {
  const token = crypto.randomBytes(3).toString('hex').toUpperCase();
  const id = Date.now();
  const username = req.body.username;
  const password = await bcrypt.hash(req.body.password, 10);
  const url = process.env.URL_RETURN || "http://localhost:3001";
  await Users.create({
    id,
    username,
    password,
    type: 1,
    token
  });

  res.redirect(url);
});

router.get("/getUser", async (req, res) => {
  const url = process.env.URL_RETURN || 'http://localhost:3001';
  res.setHeader('Access-Control-Allow-Origin', url);  
  const listOfUsers = await Users.findAll();

  res.send(listOfUsers);
});

router.post("/addTodo/:id", async (req, res) => {
  const id = Date.now();
  const name = req.body.name;
  const deadline = req.body.deadline;
  const note = req.body.note;
  const userId = req.params.id;
  const url = (process.env.URL_RETURN || "http://localhost:3001") + "/todos";
  await Todos.create({
    id,
    name, 
    deadline, 
    note,
    userId,
  })
  .then(() => {
    console.log("Successfully added a todo");
  })
  .catch((err) => {
    console.log("Something went wrong when you add a todo: " + err);
  });

  res.redirect(url);
});

router.post('/login', passport.authenticate("local", {successRedirect: "http://localhost:3000/success",
                                                      failureRedirect: "http://localhost:3000/failure"}));

initializePassport(passport, async (username) => {
  return await Users.findOne({
    where: {
      username
    }
  });
}, async (id) => {
  return await Users.findByPk(id);
}
);

module.exports = router;

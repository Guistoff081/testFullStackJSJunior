var express = require("express");
var router = express.Router();
const connection = require("../db/db_connection");

/* Handler Functions */
function validEmail(email) {
  var emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return emailPattern.test(email);
}

function validPassword(password) {
  var passwordPattern = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;
  return passwordPattern.test(password);
}

function validateUser(user) {
  return (
    typeof user.email == "string" &&
    user.email.trim() != "" &&
    validEmail(user.email) == true &&
    
    validPassword(user.password) == true
  );
}

function userInstanceResponseHandler (id, res, viewName) {
  if (typeof id != "undefined") {
    connection("users")
      .select()
      .where("id", id)
      .first()
      .then((user) => {
        res.render(viewName, { user: user });
      });
  } else {
    res.status(500);
    res.render("error", { message: "Invalid Id" });
  }
}

/* User controller routes methods */
/* GET users listing. */
router.get("/", function (req, res, next) {
  connection("users")
    .select()
    .then((users) => {
      //res.json({users: users});
      //res.setHeader('Content-Type', 'application/json');
      //res.send(JSON.stringify({key:"value"}));
      res.render("users/index", { users: users });
      //res.send({users: users});
    });
});

/* a view route for New form. */
router.get("/new", function (req, res, next) {
  res.render("users/new");
});

/* POST a new User */
router.post("/", function (req, res, next) {
  if (validateUser(req.body)) {
    let user = {
      email: req.body.email,
      password: req.body.password,
    };

    connection("users")
      .insert(user, "id")
      .then((ids) => {
        const id = ids[0];
        res.redirect(`/api/v1/users/${id}`);
      });
  } else {
    res.status(422);
    res.render("error", { message: "Dados Invalidos" });
  }
});

/* GET a user instance and show */
router.get("/:id", function (req, res, next) {
  let id = req.params.id;
  userInstanceResponseHandler(id, res, "users/show")
});

/* GET a user instance and edit */
router.get("/:id/edit", function (req, res, next) {
  let id = req.params.id;
  userInstanceResponseHandler(id, res, "users/edit")
});

router.put("/:id", function (req, res, next) {
  if (validateUser(req.body)) {
    let user = {
      email: req.body.email,
      password: req.body.password,
    };

    connection("users")
      .insert(user, "id")
      .then((ids) => {
        const id = ids[0];
        res.redirect(`/api/v1/users/${id}`);
      });
  } else {
    res.status(422);
    res.render("error", { message: "Dados Invalidos" });
  }
});

module.exports = router;

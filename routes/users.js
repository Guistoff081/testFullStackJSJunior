/* Controlador das rotas de usuário */
var express = require("express");
var router = express.Router();

function validateUser(user) {
  return (
    typeof user.email == "string" &&
    user.email.trim() != "" &&
    validEmail(user.email) == true &&
    validPassword(user.password) == true
  );
}

function getUserResponseHandler(id, res, viewName, next) {
  if (typeof id != "undefined") {
    connection("users")
      .select()
      .where("id", id)
      .first()
      .then((user) => {
        //res.render(viewName, { user: user });
        res.json({user:user});
      })
      .catch(next);
  } else {
    res.status(500);
    res.render("error", { message: "Invalid Id" });
  }
}

function setUserResponseHandler(req, res, callback) {
  if (validateUser(req.body)) {
    let user = {
      email: req.body.email,
      password: req.body.password,
    };
    callback(user);
    console.log(user);
  } else {
    res.status(422);
    res.render("error", { message: "Dados Invalidos" });
  }
}

/* User controller routes methods */
/* GET users listing. */
router.get("/", async function (req, res, next) {
  await connection("users")
    .select()
    .then((users) => {
      //res.json({users: users});
      //res.setHeader('Content-Type', 'application/json');
      //res.send(JSON.stringify({key:"value"}));
      //res.render("users/index", { users: users });
      res.send({users: users});
    })
    .catch(next);
});

/* a view route for New form. */
router.get("/new", function (req, res, next) {
  res.render("users/new");
});

/* POST a new User */
router.post("/", async function (req, res, next) {
  setUserResponseHandler(req, res, (user) => {
    console.log(user);
    connection("users")
      .insert(user)
      .then((user) => {
        res.json(user);
        //const id = ids[0];
        //res.redirect(`/api/v1/users/${id}`);
        //res.status(201).send({ user: user });
      })
      .catch(next);
  });
});

/* GET a user instance and render show */
router.get("/:id", async function (req, res, next) {
  let id = req.params.id;
  getUserResponseHandler(id, res, "users/show", next);
});

/* GET a user instance and  render edit */
router.get("/:id/edit", async function (req, res, next) {
  let id = req.params.id;
  getUserResponseHandler(id, res, "users/edit", next);
});

/* GET a user instance and does update */
router.put("/:id", async function (req, res, next) {
  let id = req.params.id;
  setUserResponseHandler(req, res, (user) => {
    connection("users")
      .update(user)
      .where({ id })
      .then((user) => {
        conslole.log(res.send());
        res.send();
        //res.redirect(`/api/v1/users/${id}`);
      })
      .catch(next);
  });
});

/* DELETE a single user instance */
router.delete("/:id", async function (req, res, next) {
  let id = req.params.id;
  if (typeof id != "undefined") {
    await connection("users")
      .where("id", id)
      .del()
      .then(() => {
        res.status(201).send();
        //res.redirect("/api/v1/users");
      })
      .catch(next);
  } else {
    res.status(422);
    res.render("error", { message: "Id não encontrado" });
  }
});

/* DELETE all user instances */
router.delete("/", async function (req, res, next) {
  await connection("users")
    .del()
    .then(res.status(200))
    .then(() => {
      //res.redirect("/api/v1/users");
      res.status(200).send()
    })
    .catch(next);
});

module.exports = router;

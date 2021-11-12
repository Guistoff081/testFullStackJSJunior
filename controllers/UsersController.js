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

module.exports = {
  async index(req, res, next) {
    try {
      const results = await connection("users");
      return res.json(results);
    } catch (error) {
      next(error);
    }
  },

  async show(req, res, next) {
    try {
      const { id } = req.params;
      const result = await connection("users").where({ id });
      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      if (validateUser(req.body)) {
        const user = {
          email: req.body.email,
          password: req.body.password,
        };
        await connection("users").insert(user);
        return res.status(201).send();
      } else {
        return res.status(422).send();
      }
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      if (validateUser(req.body)) {
        const { id } = req.params;
        const user = {
          email: req.body.email,
          password: req.body.password,
        };
        await connection("users").update(user).where({ id });
        return res.status(201).send();
      } else {
        return res.status(422).send();
      }
    } catch (error) {
      next(error);
    }
  },

  async destroy(req, res, next) {
    try {
      const { id } = req.params;
      if (typeof id != "undefined") {
        await connection("users").where({ id }).del();
        return res.send();
      } else {
        res.status(500);
        res.render("error", { message: "Invalid Id" });
      }
    } catch (error) {
      next(error);
    }
  },

  async destroyAll(req, res, next) {
    try {
      await knex("users").del();

      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  },
};

var jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
// var bcrypt = require("bcrypt");
const User = require('../models/user');
require('../models/role');

module.exports = {
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  login(req, res, next) {
    User.findOne({
      name: req.body.name
    })
    .populate("roles", "-__v")
    .exec((error, user) => {
      console.log('USER', user)
      if (error) {
        res.status(500).send({ error });
        return;
      }

      if (!user) {
        return res.status(404).send({ error: "User Not found." });
      }

      // var passwordIsValid = bcrypt.compareSync(
      //   req.body.password,
      //   user.password
      // );
      const passwordIsValid = (req.body.password == user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          error: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      res.status(200).send({
        id: user._id,
        name: user.name,
        roles: authorities,
        accessToken: token
      });
    });
  }

}

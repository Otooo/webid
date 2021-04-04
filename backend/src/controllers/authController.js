var jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
// var bcrypt = require("bcrypt");

require('../models/role');
const User = require('../models/user');

module.exports = {
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  login(req, res) {
    User.findOne({
      name: req.body.name
    })
    .populate("roles", "-__v")
    .exec((error, user) => {
      if (error) {
        res.status(500).send({ error });
        return;
      }

      if (!user) {
        return res.status(404).send({ error: "User not found." });
      }

      // var passwordIsValid = bcrypt.compareSync(
      //   req.body.password,
      //   user.password
      // );
      const passwordIsValid = (req.body.password == user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          error: "Invalid credentials!"
        });
      }

      const expiresIn = (60 * 60 * 24) // 24 hours;
      const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn
      });

      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      res.set('accessToken', token);
      res.set('expiresIn', expiresIn);
      res.status(200).send({
        id: user._id,
        name: user.name,
        roles: authorities,
      });
    });
  }

}

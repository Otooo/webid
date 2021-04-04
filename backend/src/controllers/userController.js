require('../models/role');
const User = require('../models/user');

module.exports = {

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  getProfile(req, res) {
    User.findOne({
      _id: req.userId
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

      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      res.status(200).send({
        id: user._id,
        name: user.name,
        roles: authorities,
      });
    });
  }
}

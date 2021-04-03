const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");

const Role = require('../models/role');
const User = require('../models/user');

module.exports = {
  verifyToken (req, res, next) {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({ error: "No token provided!" });
    }
  
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ error: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  },
  
  isAdmin (req, res, next) {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ error: err });
        return;
      }
  
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ error: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }
  
          res.status(403).send({ error: "Non-admin access denied!" });
          return;
        }
      );
    });
  },

  isRegular (req, res, next) {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ error: err });
        return;
      }
  
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ error: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "regular") {
              next();
              return;
            }
          }
  
          res.status(403).send({ error: "Access denied!" });
          return;
        }
      );
    });
  }
}

const User = require('../models/user');
const Item = require('../models/item');

module.exports = {

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  index (req, res) {
    Item.find()
    .then(result => {
      res.json({
        idUser: req.userId,
        data: result
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
  },

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  store (req, res) {
    const item = new Item({
      name: 'teste1'
    });

    item
    .save()
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
  }

}

const User = require('../models/user');
const Item = require('../models/item');

module.exports = {

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  index(req, res) {
    const filter = { ...req.body.filter, user: req.userId };
    Item.find(filter, "-__v")
    .then(result => {
      res.json({
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
  async store (req, res) {
    const user = req.userId;
    const {
      image,
      name,
      description
    } = req.body;
    
    const item = new Item({
      user,
      image,
      name,
      description
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

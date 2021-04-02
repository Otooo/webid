const Item = require('../models/item');

module.exports = {
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  index (req, res, next) {
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

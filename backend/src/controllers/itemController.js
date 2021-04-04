const User = require('../models/user');
const Auction = require('../models/auction');
const Item = require('../models/item');

module.exports = {

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  index(req, res) {
    const name = req.query.name || '';
    const description = req.query.description || '';
    
    Item.aggregate([
      {
        $match: {
          "name": new RegExp(`.*${name}.*`),
          "description": new RegExp(`.*${description}.*`)
        }
      },
      {
        $lookup: {
          from: "auctions", 
          localField: '_id',
          foreignField: 'item',
          as: 'auction'
        }
      }
    ])
    .then(result => {
      result.map(item => {
        item.auction = item.auction[0];
        return item;
      });
        
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

const User = require('../models/user');
const Item = require('../models/item');
const Auction = require('../models/auction');

module.exports = {

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  index(req, res) {
    const filter = { ...req.body.filter, user: req.userId };
    Auction.find({}, "-__v")
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
  async edit(req, res) {
    const id = req.params.id;
    const user = await User.findOne({ _id: req.userId })
    .populate("roles", "name")

    if (req.body.isbid && user.roles.find(role => 'regular' !== role.name)) {
      res.status(403).send({ error: "Access denied!" });
      return;
    } else if (!req.body.isbid && user.roles.find(role => 'admin' !== role.name)) {
      res.status(403).send({ error: "Non-admin access denied!" });
      return;
    }

    const {
      status,
      current_bid
    } = req.body;
    const auction = await Auction.findOne({ _id: id });

    if (current_bid) {
      if (auction.current_bid >= current_bid) {
        res.status(500).send({ error: "Your bid is lower then allowed amount!" });
        return;
      }
      if ('closed' === auction.status) {
        res.status(500).send({ error: "Auction is closed!" });
        return;
      }
      auction.payer = req.userId;
      auction.current_bid = current_bid;
    } else {
      if (status)
        auction.status = status;
    }

    auction.save()
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
    const {
      item,
      start_bid,
      closed_at
    } = req.body;
    const current_bid = start_bid;
    
    const auction = new Auction({
      item,
      start_bid,
      closed_at,
      current_bid
    });

    auction
    .save()
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
  }

}

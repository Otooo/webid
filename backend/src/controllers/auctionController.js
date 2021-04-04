const User = require('../models/user');
const Item = require('../models/item');
const Auction = require('../models/auction');
const BotSubscribe = require('../models/botSubscribe');
const BotSubscribeService = require('../services/botSubscribeService');

module.exports = {

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  async index(req, res) {
    const user = await User.findOne({ _id: req.userId })
    .populate("roles", "name")
    
    let itemFilter = { ...req.body.filter };
    let auctionFilter = {};
    if (user.roles.find(role => 'regular' === role.name)) {
      auctionFilter = { status: "opened" };
    }
    
    Auction.find(auctionFilter, "-__v")
    .populate("payer", "name")
    .populate("item", "name description")
    .sort('current_bid')
    .exec((error, result) => {
      if (error) {
        res.status(500).json({ error });
      }
      
      const data = result.filter(auction => {
        let matchName = /.*/;
        let matchDescription = /.*/;
        if (itemFilter.name)
          matchName = ".*" + itemFilter.name + ".*";
        if (itemFilter.description)
          matchDescription = ".*" + itemFilter.description + ".*";
        
        const item = auction.item;
        return (undefined != item.name.match(matchName)) && (undefined != item.description.match(matchDescription));
      });

      res.json({
        data
      });
    })
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

    let message = "Auction updated successfully!";
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
      if (status) {
        auction.status = status;
        if ('closed' === status) { // remove all subscribe related to auction
          try {
            await BotSubscribeService.delete({ auctionId: auction._id });
            message += " Subscriptions removed!";
          } catch(error) {
            message += error;
          }
        }
      }
    }

    auction.save()
    .then(result => {
      res.json({
        data: result,
        message
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

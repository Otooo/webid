const User = require('../models/user');
const Bidbot = require('../models/bidbot');
const Auction = require('../models/auction');
const BotSubscribe = require('../models/botSubscribe');

module.exports = {

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  async show(req, res) {
    const user = req.userId;
    const auction = req.body.auctionId;
    const bot = await Bidbot.findOne({ user }, "-__v");

    BotSubscribe.findOne({ auction, bidbot: bot._id }, "-__v")
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
  async subscribe(req, res) {
    const user = req.userId;
    const auction = req.body.auctionId;
    const bot = await Bidbot.findOne({ user }, "-__v")

    let botSubscribe = await BotSubscribe.findOne({ auction, bidbot: bot._id }, "-__v")

    if (!botSubscribe)
      botSubscribe = new BotSubscribe({
        bidbot: bot._id,
        auction
      });

    botSubscribe.save()
    .then(result => {
      res.json({
        data: botSubscribe
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
  async unsubscribe(req, res) {
    const auction = req.body.auctionId;
    const user = req.userId;
    const bot = await Bidbot.findOne({ user }, "-__v")

    BotSubscribe.deleteOne({
      bidbot: bot._id,
      auction
    })
    .then(result => {
      res.json({
        message: "Unsubscribe successfully!"
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
  },

}
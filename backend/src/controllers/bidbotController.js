const User = require('../models/user');
const Bidbot = require('../models/bidbot');

module.exports = {

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
   async show(req, res) {
    const user = req.userId;
    const bot = await Bidbot.findOne({ user }, "-__v")

    bot.save()
    .then(result => {
      res.json({
        data: bot
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
    const user = req.userId;
    const bot = await Bidbot.findOne({ user }, "-__v")
    
    const {
      active,
      max_bid,
      current_bid
    } = req.body;

    bot.active = (true === active || false === active)? active : bot.active;
    bot.max_bid = (max_bid || 0 === max_bid)? max_bid : bot.max_bid;
    bot.current_bid = (current_bid || 0 === current_bid)? current_bid : bot.current_bid;

    bot.save()
    .then(result => {
      res.json({
        message: "Bot successfully updated!"
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
  },

}

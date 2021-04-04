const User = require('../models/user');
const Bidbot = require('../models/bidbot');
const BidbotService = require('../services/bidbotService');
const BotSubscribeService = require('../services/botSubscribeService');

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
  
    BidbotService.update(bot, req.body)
    .then(async (result) => {
      let message = "Bot successfully updated!";
      if (!bot.active) { // removing all subscirbes realted to bot
        try {
          await BotSubscribeService.delete({ bidBotId: bot._id });
          message += " All subscribe removed!";
        } catch (error) {
          message += " "+ error;
        }
      }

      res.json({
        message
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
  },

}

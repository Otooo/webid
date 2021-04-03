const Bidbot = require('../models/bidbot');

module.exports = {
  
  /**
   * 
   * @param {Bidbot} bot 
   * @param {*} params 
   * @returns 
   */
  update(bot, params) {
    const {
      active,
      max_bid,
      current_bid
    } = params;

    bot.active = (true === active || false === active)? active : bot.active;
    bot.max_bid = (max_bid || 0 === max_bid)? max_bid : bot.max_bid;
    bot.current_bid = (current_bid || 0 === current_bid)? current_bid : bot.current_bid;

    return bot.save();
  }
}

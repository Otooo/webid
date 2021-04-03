require('../models/bidbot');
require('../models/auction');
const BotSubscribe = require('../models/botSubscribe');

module.exports = {
  
  /**
   * 
   * @param {*} params content with { auctionId | bidBotId }
   * @returns 
   */
  delete(params) {
    const {
      auctionId,
      bidBotId
    } = params;
    let deleteObj = null;
    
    if (auctionId)
      deleteObj = { ...deleteObj, auction: auctionId };
    if (bidBotId)
      deleteObj = { ...deleteObj, bidbot: bidBotId };

    return BotSubscribe.deleteMany(deleteObj);
  }
}

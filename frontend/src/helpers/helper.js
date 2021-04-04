
import moment from 'moment';

export default {

  /**
   * Info about connection system
   * 
   * @param networkStatus Connection status
   */
  network(networkStatus) {
    let message = '',
      verticalAlign = 'top',
      horizontalAlign = 'right',
      type = '',
      icon = '';
    
    if (networkStatus) { // Connected to internet
      message = 'Reconnected connection.';
      icon = 'fa fa-wifi';
      type = 'primary';
    } else {
      message = 'Lost connection.';
      icon = 'fa fa-chain-broken';
      type = 'danger';
    }

    this.$notifications.notify(
    {
      message: `<span>${message}</span>`,
      icon: icon,
      horizontalAlign: horizontalAlign,
      verticalAlign: verticalAlign,
      type: type,
      timeout: 20000
    });
    console.log();
  },
  
  /**
     * Error notification
     *
     * @param message Message
     * @param verticalAlign Vertical align (default 'top')
     * @param horizontalAlign Horizonal align (default 'right')
     * @param icon Notification icon (default 'fa fa-exclamation-circle')
     */
  notifyVueError(message, verticalAlign = 'top', horizontalAlign = 'right', icon = 'fa fa-exclamation-circle') {
    this.$notifications.notify(
      {
        message: `<span>${message}</span>`,
        icon: icon,
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: 'danger'
      });
  },

  /**
     * Success notification
     *
     * @param message Message
     * @param verticalAlign Vertical align (default 'top')
     * @param horizontalAlign Horizonal align (default 'right')
     * @param icon Notification icon (default 'fa fa-check-circle')
     */
  notifyVueSuccess(message, verticalAlign = 'top', horizontalAlign = 'right', icon = 'fa fa-check-circle') {
    this.$notifications.notify(
      {
        message: `<span>${message}</span>`,
        icon: icon,
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: 'success'
      });
  },

  /**
     * Alert notification
     *
     * @param message Message
     * @param verticalAlign Vertical align (default 'top')
     * @param horizontalAlign Horizonal align (default 'right')
     * @param icon Notification icon (default 'fa fa-exclamation-triangle')
     */
  notifyVueWarning(message, verticalAlign = 'top', horizontalAlign = 'right', icon = 'fa fa-exclamation-triangle') {
    this.$notifications.notify(
      {
        message: `<span>${message}</span>`,
        icon: icon,
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: 'warning'
      });
  },

  /**
     * Format date to 'YYYY-MM-DD'.
     * No time
     *
     * @param date Date
     */
  formatDateWithoutTime(date) {
    return moment(date).format('YYYY-MM-DD');
  },

  /**
   * Get month name
   * 
   * @param index month index [1-12]
   */
  getMonthNameByIndex(index) {
    const month = moment().month(index).format("MMMM");
    return month
  },

  /**
   * Format date to 'YYYY-MM-DD HH:mm'
   *
   * @param date Date
   */
  formatDate(date) {
    return moment(date).format('YYYY-MM-DD HH:mm');
  },

  /**
   * Reduces a date string by 10. To remove time fields in the format
   * yyyy-mm-dd
   * 
   * Ex.: 2025-04-24 18:30:59 reduced to 2025-04-24
   * 
   * @param date Date
   */
  sliceDate(date) {
    return date.slice(0, 10);
  },

  /**
   * Formats the money for presention
   * $ X,XXX,XXX.XX
   *
   * @param price Currency
   * @param is_in_cents If the value is set in cents (default false)
   */
  formatPriceUSD(price, is_in_cents = false) {
    if (is_in_cents)
      price /= 100;

    return price.toLocaleString('en', { style: 'currency', currency: 'USD' });
  }
};

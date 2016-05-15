var fs = require('fs');
var fx = require('./fx');
var Stripe = require('stripe');

module.exports = function(wagner) {

  wagner.factory('Config', function() {
    return JSON.parse(fs.readFileSync('./config.json').toString());
  });


  var stripe = new Stripe(wagner.invoke(function(Config){
    return Config.stripeKey;
  }));

  wagner.factory('fx', fx);

  wagner.factory('Stripe', function() {
    return stripe;
  });

};

var mongoose = require('mongoose');
var productSchema = require('./product');

var Product = mongoose.model('Product', productSchema);

var p = new Product({
    name: 'test',
    price: {
        amount: 5,
        currency: 'USD'
    },

    category: {
        name: 'test'
    }
});

console.log(p.displayPrice);

console.log(p.internal.approximatePriceUSD);

p.price.currency = 'EUR';

console.log(p.internal.approximatePriceUSD);

console.log(p.displayPrice);

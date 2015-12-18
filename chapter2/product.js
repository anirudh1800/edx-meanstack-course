var mongoose = require('mongoose');
var Category = require('./category');
var fx = require('./fx');

var productSchema = {
    name: {
        type: String,
        required: true
    },

    pictures: [{
        type: String,
        match: /^http:\/\//i
    }],

    price: {
        amount: {
            type: String,
            required: true,
            set: function (v) {
                this.internal.approximatePriceUSD =
                    v / (fx()[this.price.currency] || 1);
                return v;
            }
        },
        currency: {
            type: String,
            enum: ['USD', 'EUR', 'GBP'],
            required: true,
            set: function (v) {
                this.internal.approximatePriceUSD =
                    this.price.amount / (fx()[v] || 1);
                return v;
            }
        }
    },

    category: Category.categorySchema,
    internal: {
        approximatePriceUSD: Number
    }
};

var schema = new mongoose.Schema(productSchema);

var currencySymbols = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£'
};

/*
 *
 * An example of virtuals in schema (mongoose feature)
 * Human-readable string form of price - "$25" rather
 * than "25 USD"
 */

schema.virtual('displayPrice').get(function () {
    return currencySymbols[this.price.currency] + '' +
        this.price.amount;
});

schema.set('toObject', {
    virtuals: true
});

schema.set('toJSON', {
    virtuals: true
});

module.exports = schema;
module.exports.productSchema = productSchema;

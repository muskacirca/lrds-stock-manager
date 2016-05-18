'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getById = getById;
exports.isInitialized = isInitialized;
exports.getCart = getCart;
exports.pushItemInCart = pushItemInCart;
exports.removeItemFromCart = removeItemFromCart;
exports.emptyCart = emptyCart;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cartStore = {};

function getById(id) {

    var item = cartStore.filter(function (elt) {
        if (elt.id == id) {
            return elt;
        }
    });

    return item[0];
}

function isInitialized() {
    if (cartStore.length === 0) {
        return false;
    } else {
        return true;
    }
}

function getCart(viewerId) {
    return cartStore[viewerId] == undefined ? [] : cartStore[viewerId];
}

function pushItemInCart(viewerId, item) {

    var cart = cartStore[viewerId];

    if (cart == undefined) {

        cartStore[viewerId] = [item];
    } else {

        var itemFiltered = cart.filter(function (elt) {
            if (elt == item) {
                return elt;
            }
        });

        if (!itemFiltered[0]) {
            cartStore[viewerId].push(item);
        }
    }
}

function removeItemFromCart(viewerId, reference) {

    return _lodash2.default.remove(cartStore[viewerId], function (item) {
        return item.reference == reference;
    });
}

function emptyCart(viewerId) {

    cartStore[viewerId] = [];
    return cartStore[viewerId];
}
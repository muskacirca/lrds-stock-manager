'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SubCategory = exports.Category = exports.Cart = exports.Viewer = exports.Item = undefined;
exports.initState = initState;
exports.getById = getById;
exports.getViewer = getViewer;
exports.isInitialized = isInitialized;
exports.getCart = getCart;
exports.pushItemInCart = pushItemInCart;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = exports.Item = function (_Object) {
    _inherits(Item, _Object);

    function Item() {
        _classCallCheck(this, Item);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Item).apply(this, arguments));
    }

    return Item;
}(Object);

var Viewer = exports.Viewer = function (_Object2) {
    _inherits(Viewer, _Object2);

    function Viewer() {
        _classCallCheck(this, Viewer);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Viewer).apply(this, arguments));
    }

    return Viewer;
}(Object);

var Cart = exports.Cart = function (_Object3) {
    _inherits(Cart, _Object3);

    function Cart() {
        _classCallCheck(this, Cart);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Cart).apply(this, arguments));
    }

    return Cart;
}(Object);

var Category = exports.Category = function (_Object4) {
    _inherits(Category, _Object4);

    function Category() {
        _classCallCheck(this, Category);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Category).apply(this, arguments));
    }

    return Category;
}(Object);

var SubCategory = exports.SubCategory = function (_Object5) {
    _inherits(SubCategory, _Object5);

    function SubCategory() {
        _classCallCheck(this, SubCategory);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SubCategory).apply(this, arguments));
    }

    return SubCategory;
}(Object);

var VIEWER_ID = 'me';

var viewer = new Viewer();
viewer.id = VIEWER_ID;

var cartStore = [];

var usersById = _defineProperty({}, VIEWER_ID, viewer);

function initState(items) {

    //var typedWrecks = wrecks.map((elt) => {
    //    const todo = new Wreck();
    //    Object.assign(todo, elt);
    //    return todo
    //})

    cartStore = items;
    return cartStore;
}

function getById(id) {

    var item = cartStore.filter(function (elt) {
        if (elt.id == id) {
            return elt;
        }
    });

    return item[0];
}

function getViewer() {

    console.log("getting viewer : " + JSON.stringify(usersById[VIEWER_ID]));
    return usersById[VIEWER_ID];
}

function isInitialized() {
    if (cartStore.length === 0) {
        return false;
    } else {
        return true;
    }
}

function getCart() {

    console.log("cartStore: " + cartStore.length);
    return cartStore;
}

function pushItemInCart(item) {

    var itemFiltered = cartStore.filter(function (elt) {
        if (elt == item) {
            return elt;
        }
    });

    if (!itemFiltered[0]) {
        console.log("really pushing item into cart : " + JSON.stringify(item));
        cartStore.push(item);
    }
}
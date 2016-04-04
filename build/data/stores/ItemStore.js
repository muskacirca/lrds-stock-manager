'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SubCategory = exports.Category = exports.Domain = exports.Viewer = exports.Item = undefined;
exports.initState = initState;
exports.getById = getById;
exports.getSubCategoryById = getSubCategoryById;
exports.getViewer = getViewer;
exports.getSubcategory = getSubcategory;
exports.isInitialized = isInitialized;
exports.getItems = getItems;
exports.pushItem = pushItem;

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

var Domain = exports.Domain = function (_Object3) {
    _inherits(Domain, _Object3);

    function Domain() {
        _classCallCheck(this, Domain);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Domain).apply(this, arguments));
    }

    return Domain;
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

var itemsStore = [];

var usersById = _defineProperty({}, VIEWER_ID, viewer);

function initState(items) {

    //var typedWrecks = wrecks.map((elt) => {
    //    const todo = new Wreck();
    //    Object.assign(todo, elt);
    //    return todo
    //})

    itemsStore = items;
    return itemsStore;
}

function getById(id) {

    var item = itemsStore.filter(function (elt) {
        if (elt.id == id) {
            return elt;
        }
    });

    return item[0];
}

function getSubCategoryById(id) {

    return { name: "SUB_CATEGORY" };
}

function getViewer() {

    console.log("getting viewer : " + JSON.stringify(usersById[VIEWER_ID]));
    return usersById[VIEWER_ID];
}

function getSubcategory() {

    console.log("getting viewer : " + JSON.stringify(usersById[VIEWER_ID]));
    return usersById[VIEWER_ID];
}

function isInitialized() {
    if (itemsStore.length === 0) {
        return false;
    } else {
        return true;
    }
}

function getItems() {

    console.log("itemsStore: " + itemsStore.length);

    return itemsStore;
}

function pushItem(item) {

    var itemFiltered = itemsStore.filter(function (elt) {
        if (elt.id == item.id) {
            return elt;
        }
    });

    if (!itemFiltered[0]) itemsStore.push(item);
}
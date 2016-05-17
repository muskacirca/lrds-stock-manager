'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isItemInStock = isItemInStock;

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isItemInStock(eventIds) {

    var now = (0, _moment2.default)().format("YYYY-MM-DDTHH-mm-ss.SSSZ");
    var args = {
        where: {
            $and: [{ id: { $in: eventIds } }, { startDate: { $lte: now } }, { endDate: { $gte: now } }]
        },
        attributes: ['id']
    };

    return _database2.default.models.event.findAll(args).then(function (event) {
        if (event.length > 0) {
            return false;
        }
        return true;
    });
}
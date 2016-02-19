"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mysql_schema = process.env.CLEARDB_DATABASE_SCHEMA || "lrds";
var mysql_user = process.env.CLEARDB_DATABASE_USER || "lrds";
var mysql_pass = process.env.CLEARDB_DATABASE_PASS || "lrds";

var connection = process.env.CLEARDB_DATABASE_URL !== undefined ? new _sequelize2.default(process.env.CLEARDB_DATABASE_URL) : new _sequelize2.default(mysql_schema, mysql_user, mysql_pass, { dialect: "mysql", host: "localhost" });

var brand = connection.define('brand', {

    name: {
        type: _sequelize2.default.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: _sequelize2.default.STRING
    }

}, { timestamps: false });

var model = connection.define('model', {

    name: {
        type: _sequelize2.default.STRING,
        allowNull: false
    },
    description: {
        type: _sequelize2.default.STRING,
        allowNull: false
    }

}, { timestamps: false });

brand.hasMany(model);

var item = connection.define('item', {

    reference: {
        type: _sequelize2.default.STRING,
        allowNull: false
    },
    // TODO : remove and guess it via reserved item
    isInStock: {
        type: _sequelize2.default.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, { timestamps: false });

model.hasMany(item);

item.belongsToMany(item, { as: 'linkedItem', through: 'linkedItems', timestamps: false });
var itemComment = connection.define('itemComment', {

    text: {
        type: _sequelize2.default.STRING,
        allowNull: false
    }
});

item.hasMany(itemComment, { as: 'Comments' });

var event = connection.define('events', {

    name: { type: _sequelize2.default.STRING, allowNull: false },
    description: { type: _sequelize2.default.STRING },
    startDate: { type: _sequelize2.default.STRING, allowNull: false },
    endDate: { type: _sequelize2.default.STRING, allowNull: false }
});

event.belongsToMany(item, { through: 'reservedItems', timestamps: false });
item.belongsToMany(event, { through: 'reservedItems', timestamps: false });

var eventComment = connection.define('eventComment', {

    text: { type: _sequelize2.default.STRING, allowNull: false }
});

event.hasMany(eventComment, { as: 'Comments' });

var category = connection.define('category', {

    name: { type: _sequelize2.default.STRING, allowNull: false },
    description: { type: _sequelize2.default.STRING }

}, { timestamps: false });

var subCategory = connection.define('subCategory', {

    name: { type: _sequelize2.default.STRING, allowNull: false },
    description: { type: _sequelize2.default.STRING }
}, {
    timestamps: false
});

subCategory.belongsToMany(model, { through: 'modelCategory', timestamps: false });
model.belongsToMany(subCategory, { through: 'modelCategory', timestamps: false });

category.hasMany(subCategory, { as: 'SubCategories' });

var domain = connection.define('domain', {

    name: { type: _sequelize2.default.STRING, allowNull: false },
    description: { type: _sequelize2.default.STRING }
}, {
    timestamps: false
});

domain.belongsToMany(model, { through: 'modelDomain', timestamps: false });
model.belongsToMany(domain, { through: 'modelDomain', timestamps: false });

connection.sync({ force: false });
//    .then(() => {
//    var studio = domain.create({name: 'STUDIO'})
//    var scene = domain.create({name: 'SCENE'})
//
//    brand.create({name: "Shure"})
//        .then((brand) => {
//            brand.createModel({name: "SM58", description: "Un micro tout terrain"})
//        })
//
//
//    category.create({name: "MICRO"})
//        .then(category => {
//            return category.createSubCategory({name: "DYNAMIQUE"})
//          })
//
//        //item.find({ where: {reference: 'SM5801'} }).on('success', function(item) {
//        //    domain.find({where: {name: 'STUDIO'}}).on('success', function(domain){
//        //        item.setDomains([domain]);
//        //    });
//        //});
//
//    //item.create({name: "Fireface UC", reference:'RMEUC01', description:"une carte son 8 piste"})
//})

exports.default = connection;
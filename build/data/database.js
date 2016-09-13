"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log("process.env.PROD_URL: " + process.env.PROD_URL);
console.log("process.env.PROD_SCHEMA: " + process.env.PROD_SCHEMA);
console.log("process.env.PROD_USER: " + process.env.PROD_USER);
console.log("process.env.PROD_PASS: " + process.env.PROD_PASS);

var mysql_url = process.env.PROD_URL || "localhost";
var mysql_schema = process.env.PROD_SCHEMA || process.env.CLEARDB_DATABASE_SCHEMA || "lrds";
var mysql_user = process.env.PROD_USER || process.env.CLEARDB_DATABASE_USER || "greec";
var mysql_pass = process.env.PROD_PASS || process.env.CLEARDB_DATABASE_PASS || "test";

var connection = process.env.CLEARDB_DATABASE_URL !== undefined ? new _sequelize2.default(process.env.CLEARDB_DATABASE_URL, {
    pool: {
        max: 5,
        min: 1,
        idle: 10000
    }
}) : new _sequelize2.default(mysql_schema, mysql_user, mysql_pass, { dialect: "mysql", host: mysql_url,
    logging: function logging(param) {
        param.indexOf("Executing (default):") !== -1 ? false : true;
    } });

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
        allowNull: false,
        unique: true
    },
    description: {
        type: _sequelize2.default.STRING
    }

}, { timestamps: false });

brand.hasMany(model);

var state = connection.define('state', {

    name: {
        type: _sequelize2.default.STRING,
        allowNull: false
    },
    severity: {
        type: _sequelize2.default.INTEGER,
        allowNull: false
    }

}, { timestamps: false });

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
});

state.hasMany(item);
model.hasMany(item);

item.belongsToMany(item, { as: 'linkedItem', through: 'linkedItems', timestamps: false });
var itemComment = connection.define('itemComment', {

    text: {
        type: _sequelize2.default.STRING,
        allowNull: false
    },
    author: {

        type: _sequelize2.default.STRING,
        allowNull: false
    }
});

item.hasMany(itemComment, { as: 'Comments' });

var event = connection.define('event', {

    name: { type: _sequelize2.default.STRING, allowNull: false },
    description: { type: _sequelize2.default.STRING },
    startDate: { type: _sequelize2.default.STRING, allowNull: false },
    endDate: { type: _sequelize2.default.STRING, allowNull: false }
});

event.belongsToMany(item, { through: 'reservedItems', timestamps: false });
item.belongsToMany(event, { through: 'reservedItems', timestamps: false });

var eventComment = connection.define('eventComment', {

    text: { type: _sequelize2.default.STRING, allowNull: false },
    author: { type: _sequelize2.default.STRING, allowNull: false }
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

connection.define('user', {
    firstName: _sequelize2.default.STRING,
    lastName: _sequelize2.default.STRING,
    login: { type: _sequelize2.default.STRING, unique: true },
    password: _sequelize2.default.STRING,
    email: { type: _sequelize2.default.STRING, unique: true },
    enabled: _sequelize2.default.BOOLEAN
}, { timestamps: false, tableName: 'users', freezeTableName: true });

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
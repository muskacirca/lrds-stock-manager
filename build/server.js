module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _schema = __webpack_require__(3);

	var _expressGraphql = __webpack_require__(16);

	var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

	var _database = __webpack_require__(7);

	var _database2 = _interopRequireDefault(_database);

	var _jsonwebtoken = __webpack_require__(17);

	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

	var _bodyParser = __webpack_require__(18);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _crypto = __webpack_require__(19);

	var _crypto2 = _interopRequireDefault(_crypto);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var server_port = process.env.PORT || 3000;

	var app = (0, _express2.default)();
	app.use(_bodyParser2.default.urlencoded({ extended: false }));
	app.use(_bodyParser2.default.json());
	app.use(function (req, res, next) {
	    res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	    next();
	});

	app.get('/', function (req, res) {
	    res.sendFile(_path2.default.resolve(__dirname, "../src/frontend/index.html"));
	});

	app.use('/style', _express2.default.static(_path2.default.resolve(__dirname, '../src/style')));
	app.use('/utils', _express2.default.static(_path2.default.resolve(__dirname, '../src/utils')));

	app.get('/bundle.js', function (req, res) {
	    res.sendFile(_path2.default.resolve(__dirname, "../src/frontend/public/bundle.js"));
	});

	app.use('/graphql', (0, _expressGraphql2.default)({ schema: _schema.Schema, pretty: true, graphiql: true }));

	app.post('/api/authenticate', function (request, response) {

	    _database2.default.models.user.findOne({ where: { login: request.body.login } }).then(function (user) {

	        var password = _crypto2.default.createHash("sha256").update(request.body.password).digest("base64");

	        if (user.password != password) {

	            response.json({
	                success: false,
	                message: 'Bad authentication'
	            });
	        } else {

	            var decoded = _jsonwebtoken2.default.sign(user.dataValues, 'secret', {
	                expiresIn: 600
	            });

	            response.json({
	                success: true,
	                message: 'Enjoy your token!',
	                token: decoded
	            });
	        }
	    }).catch(function (error) {
	        console.log(error);
	        response.json({
	            success: false,
	            message: 'Unhandled error'
	        });
	    });
	});

	app.listen(server_port, function (err) {
	    if (err) return console.log(err);
	    console.log('Server is now running on port ' + server_port);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Schema = undefined;

	var _graphql = __webpack_require__(4);

	var _StockMutations = __webpack_require__(5);

	var _CartMutations = __webpack_require__(14);

	var _EventMutations = __webpack_require__(15);

	var _Model = __webpack_require__(9);

	var Mutation = new _graphql.GraphQLObjectType({
	    name: 'Mutation',
	    fields: {
	        addModel: _StockMutations.AddModelMutation,
	        addItem: _StockMutations.AddItemMutation,
	        addItemInCart: _CartMutations.AddItemInCartMutation,
	        removeItemFromCart: _CartMutations.RemoveItemFromCartMutation,
	        emptyCart: _CartMutations.EmptyCartMutation,
	        addEvent: _EventMutations.AddEventMutation
	    }
	});

	var Schema = exports.Schema = new _graphql.GraphQLSchema({
	    query: _Model.GraphQLRoot,
	    mutation: Mutation
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("graphql");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AddItemMutation = exports.AddModelMutation = undefined;

	var _graphql = __webpack_require__(4);

	var _graphqlRelay = __webpack_require__(6);

	var _database = __webpack_require__(7);

	var _database2 = _interopRequireDefault(_database);

	var _Model = __webpack_require__(9);

	var _ItemStore = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AddModelMutation = exports.AddModelMutation = new _graphqlRelay.mutationWithClientMutationId({
	    name: 'AddModel',
	    description: 'Function to create model',
	    inputFields: {
	        brandName: {
	            type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
	        },
	        name: {
	            type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
	        }
	    },
	    outputFields: {
	        viewer: {
	            type: _Model.GraphQLViewer,
	            resolve: function resolve() {
	                return _ItemStore.getViewer;
	            }
	        },
	        modelEdge: {
	            type: _Model.GraphQLModelEdge,
	            resolve: function resolve(obj, _ref) {
	                var id = _ref.id;


	                return _database2.default.models.model.findAll().then(function (dataModels) {

	                    var itemToPass = undefined;
	                    var _iteratorNormalCompletion = true;
	                    var _didIteratorError = false;
	                    var _iteratorError = undefined;

	                    try {
	                        for (var _iterator = dataModels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                            var model = _step.value;

	                            if (model.id === obj.id) {
	                                itemToPass = model;
	                            }
	                        }
	                    } catch (err) {
	                        _didIteratorError = true;
	                        _iteratorError = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion && _iterator.return) {
	                                _iterator.return();
	                            }
	                        } finally {
	                            if (_didIteratorError) {
	                                throw _iteratorError;
	                            }
	                        }
	                    }

	                    var cursor = (0, _graphqlRelay.cursorForObjectInConnection)(dataModels, itemToPass);
	                    return {
	                        cursor: cursor,
	                        node: itemToPass
	                    };
	                });
	            }
	        }
	    },
	    mutateAndGetPayload: function mutateAndGetPayload(_ref2) {
	        var brandName = _ref2.brandName;
	        var name = _ref2.name;


	        return _database2.default.models.brand.findOrCreate({ where: { name: brandName } }).spread(function (brand, wasCreated) {
	            // spread is necessary when multiple return value

	            return _database2.default.models.model.create({ name: name, brandId: brand.id }).then(function (model) {
	                return {
	                    model: {
	                        name: model.name,
	                        brand: { name: brand.name }
	                    },
	                    id: model.id

	                };
	            });
	        });
	    }
	});

	var AddItemMutation = exports.AddItemMutation = (0, _graphqlRelay.mutationWithClientMutationId)({
	    name: 'AddItem',
	    description: 'A function to create an item',
	    inputFields: {
	        modelName: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
	        severity: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
	        domains: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
	        subCategories: { type: new _graphql.GraphQLList(_graphql.GraphQLString) }
	    },
	    outputFields: {
	        viewer: {
	            type: _Model.GraphQLViewer,
	            resolve: function resolve() {
	                return _ItemStore.getViewer;
	            }
	        },
	        itemEdge: {
	            type: _Model.GraphQLItemEdge,
	            resolve: function resolve(obj) {

	                return _database2.default.models.item.findAll().then(function (items) {

	                    var itemToPass = undefined;
	                    var _iteratorNormalCompletion2 = true;
	                    var _didIteratorError2 = false;
	                    var _iteratorError2 = undefined;

	                    try {
	                        for (var _iterator2 = items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                            var item = _step2.value;

	                            if (item.id === obj.id) {
	                                itemToPass = item;
	                            }
	                        }
	                    } catch (err) {
	                        _didIteratorError2 = true;
	                        _iteratorError2 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                                _iterator2.return();
	                            }
	                        } finally {
	                            if (_didIteratorError2) {
	                                throw _iteratorError2;
	                            }
	                        }
	                    }

	                    var cursor = (0, _graphqlRelay.cursorForObjectInConnection)(items, itemToPass);
	                    return {
	                        cursor: cursor,
	                        node: itemToPass
	                    };
	                });
	            }
	        }
	    },
	    mutateAndGetPayload: function mutateAndGetPayload(_ref3) {
	        var modelName = _ref3.modelName;
	        var severity = _ref3.severity;
	        var domains = _ref3.domains;
	        var subCategories = _ref3.subCategories;


	        return _database2.default.models.model.findOne({ where: { name: modelName } }).then(function (model) {

	            domains.forEach(function (domain) {
	                _database2.default.models.domain.findOrCreate({ where: { name: domain } }).then(function (domain) {
	                    return model.addDomain(domain[0]);
	                });
	            });

	            subCategories.forEach(function (subCategory) {
	                _database2.default.models.subCategory.findOne({ where: { name: subCategory } }).then(function (retrievedSubCategory) {
	                    return model.addSubCategory(retrievedSubCategory);
	                });
	            });

	            return _database2.default.models.brand.findById(model.brandId).then(function (brand) {

	                var brandName = brand.name.replace(/ /g, '').substring(0, 4);
	                var modelName = model.name.replace(/ /g, '').substring(0, 4);
	                var reference = brandName.toUpperCase() + modelName.toUpperCase();

	                return _database2.default.models.item.count({ where: { reference: { $like: reference + '%' } } }).then(function (id) {
	                    var nextId = id + 1;
	                    reference = reference + "-" + nextId;
	                    return _database2.default.models.state.findOne({ where: { severity: severity } }).then(function (state) {
	                        return model.createItem({ stateId: state.id, reference: reference }).then(function (item) {
	                            return item;
	                        });
	                    });
	                });
	            });
	        });
	    }
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("graphql-relay");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _sequelize = __webpack_require__(8);

	var _sequelize2 = _interopRequireDefault(_sequelize);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mysql_schema = process.env.CLEARDB_DATABASE_SCHEMA || "lrds";
	var mysql_user = process.env.CLEARDB_DATABASE_USER || "greec";
	var mysql_pass = process.env.CLEARDB_DATABASE_PASS || "test";

	var connection = process.env.CLEARDB_DATABASE_URL !== undefined ? new _sequelize2.default(process.env.CLEARDB_DATABASE_URL, {
	    pool: {
	        max: 5,
	        min: 1,
	        idle: 10000
	    }
	}) : new _sequelize2.default(mysql_schema, mysql_user, mysql_pass, { dialect: "mysql", host: "localhost",
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

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("sequelize");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GraphQLRoot = exports.GraphQLViewer = exports.EventsEdge = exports.EventsConnection = exports.GraphQLModelEdge = exports.ModelsConnection = exports.GraphQLItemEdge = exports.ItemsConnection = exports.UserType = exports.EventType = exports.GraphQLCartType = exports.GraphQLItemType = exports.GraphQLStateType = exports.GraphQLCommentType = exports.GraphQLModelType = exports.GraphQLBrandType = exports.GraphQLSubCategoryType = exports.GraphQLCategoryType = exports.GraphQLDomainType = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _graphql = __webpack_require__(4);

	var _graphqlRelay = __webpack_require__(6);

	var _database = __webpack_require__(7);

	var _database2 = _interopRequireDefault(_database);

	var _ItemStore = __webpack_require__(10);

	var _CartStore = __webpack_require__(12);

	var _moment = __webpack_require__(13);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	/**
	 * The first argument defines the way to resolve an ID to its object.
	 * The second argument defines the way to resolve a node object to its GraphQL type.
	 */

	var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(function (globalId) {
	    var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(globalId);

	    var id = _fromGlobalId.id;
	    var type = _fromGlobalId.type;

	    console.log("globalId of " + type + " : " + globalId);
	    console.log("id of " + type + " : " + id);

	    if (type === 'ItemType') {
	        console.log("Im here getting ItemType");
	        return _database2.default.models.item.findOne({ where: { id: id } });
	    } else if (type === "EventType") {
	        console.log("Im here getting EventType");
	        return _database2.default.models.event.findOne({ where: { id: id } });
	    } else if (type === "ModelType") {
	        console.log("Im here getting ModelType");
	        _database2.default.models.modem.findOne({ where: { id: id } });
	    } else if (type === "Viewer") {
	        return _database2.default.models.user.findOne({ where: { id: id } });
	    } else {
	        console.log("I'm here getting " + type + " but was not present");
	    }
	    return null;
	}, function (obj) {

	    console.log("in interface obj: " + JSON.stringify(obj));

	    if (obj.password != undefined) {
	        console.log("getting by object ViewerType");
	        return GraphQLViewer;
	    } else if (obj.reference != undefined) {
	        console.log("getting by object ItemType");
	        return GraphQLItemType;
	    } else if (obj.brand != undefined) {
	        console.log("getiing by object Modeltype");
	        return GraphQLModelType;
	    } else if (obj.startDate != undefined) {
	        console.log("getting by object EventType");
	        return EventType;
	    }
	});

	var nodeInterface = _nodeDefinitions.nodeInterface;
	var nodeField = _nodeDefinitions.nodeField;
	var GraphQLDomainType = exports.GraphQLDomainType = new _graphql.GraphQLObjectType({
	    name: 'DomainType',
	    fields: {
	        id: (0, _graphqlRelay.globalIdField)('DomainType'),
	        name: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.name;
	            } },
	        description: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.description;
	            } }
	    },
	    interfaces: [nodeInterface]
	});

	var GraphQLCategoryType = exports.GraphQLCategoryType = new _graphql.GraphQLObjectType({
	    name: 'CategoryType',
	    fields: {
	        id: (0, _graphqlRelay.globalIdField)('CategoryType'),
	        name: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.name;
	            } },
	        description: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.description;
	            } }
	    },
	    interfaces: [nodeInterface]
	});

	var GraphQLSubCategoryType = exports.GraphQLSubCategoryType = new _graphql.GraphQLObjectType({
	    name: 'SubCategoryType',
	    fields: {
	        id: (0, _graphqlRelay.globalIdField)('SubCategoryType'),
	        name: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.name;
	            } },
	        description: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.description;
	            } },
	        category: {
	            type: GraphQLCategoryType,
	            resolve: function resolve(obj) {
	                return _database2.default.models.category.findById(obj.categoryId);
	            }
	        }
	    },
	    interfaces: [nodeInterface]
	});

	var GraphQLBrandType = exports.GraphQLBrandType = new _graphql.GraphQLObjectType({
	    name: 'BrandType',
	    fields: {
	        id: (0, _graphqlRelay.globalIdField)('BrandType'),
	        name: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.name;
	            } },
	        description: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.description;
	            } }
	    },
	    interfaces: [nodeInterface]
	});

	var GraphQLModelType = exports.GraphQLModelType = new _graphql.GraphQLObjectType({
	    name: 'ModelType',
	    fields: {
	        id: (0, _graphqlRelay.globalIdField)('ModelType'),
	        name: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.name;
	            } },
	        description: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.description;
	            } },
	        brand: {
	            type: GraphQLBrandType,
	            resolve: function resolve(obj) {
	                return _database2.default.models.brand.findById(obj.brandId);
	            }
	        },
	        domains: {
	            type: new _graphql.GraphQLList(GraphQLDomainType),
	            resolve: function resolve(obj) {
	                return obj.getDomains();
	            }
	        },
	        subCategories: {
	            type: new _graphql.GraphQLList(GraphQLSubCategoryType),
	            resolve: function resolve(obj) {
	                return obj.getSubCategories();
	            }
	        }
	    },
	    interfaces: [nodeInterface]
	});

	var GraphQLCommentType = exports.GraphQLCommentType = new _graphql.GraphQLObjectType({
	    name: 'ItemCommentType',
	    fields: {
	        id: (0, _graphqlRelay.globalIdField)('ItemCommentType'),
	        text: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.text;
	            } },
	        createdAt: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.createdAt;
	            } },
	        updatedAt: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.updatedAt;
	            } }
	    },
	    interfaces: [nodeInterface]
	});

	var GraphQLStateType = exports.GraphQLStateType = new _graphql.GraphQLObjectType({
	    name: 'StateType',
	    fields: {
	        id: (0, _graphqlRelay.globalIdField)('StateType'),
	        name: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.name;
	            } },
	        severity: { type: _graphql.GraphQLInt, resolve: function resolve(obj) {
	                return obj.severity;
	            } }
	    },
	    interfaces: [nodeInterface]
	});

	var _connectionDefinition =
	// ,edgeType: GraphQLSimTypesEdge,
	(0, _graphqlRelay.connectionDefinitions)({
	    name: 'ItemCommentType',
	    nodeType: GraphQLCommentType
	});

	var ItemCommentConnection = _connectionDefinition.connectionType;

	var _connectionDefinition2 =
	// ,edgeType: GraphQLSimTypesEdge,
	(0, _graphqlRelay.connectionDefinitions)({
	    name: 'EventCommentsType',
	    nodeType: GraphQLCommentType
	});

	var EventCommentsConnection = _connectionDefinition2.connectionType;
	var GraphQLItemType = exports.GraphQLItemType = new _graphql.GraphQLObjectType({
	    name: 'ItemType',
	    fields: {
	        id: (0, _graphqlRelay.globalIdField)('ItemType'),
	        model: {
	            type: GraphQLModelType,
	            resolve: function resolve(obj) {
	                return _database2.default.models.model.findById(obj.modelId);
	            }
	        },
	        reference: {
	            type: _graphql.GraphQLString,
	            resolve: function resolve(obj) {
	                return obj.reference;
	            }
	        },
	        state: {
	            type: GraphQLStateType,
	            resolve: function resolve(obj) {
	                return _database2.default.models.state.findById(obj.stateId);
	            }
	        },
	        isInStock: {
	            type: _graphql.GraphQLBoolean,
	            resolve: function resolve(obj) {
	                return obj.isInStock;
	            }
	        },
	        comments: {
	            type: ItemCommentConnection,
	            args: _extends({}, _graphqlRelay.connectionArgs),
	            resolve: function resolve(obj, _ref) {
	                var args = _objectWithoutProperties(_ref, []);

	                return (0, _graphqlRelay.connectionFromPromisedArray)(obj.getComments(), args);
	            }
	        }
	    },
	    interfaces: [nodeInterface]
	});

	var GraphQLCartType = exports.GraphQLCartType = new _graphql.GraphQLObjectType({
	    name: 'CartType',
	    description: 'It display item selected in a cart',
	    fields: {
	        id: (0, _graphqlRelay.globalIdField)('CartType'),
	        count: {
	            type: _graphql.GraphQLInt,
	            resolve: function resolve(obj) {
	                return obj.length;
	            }
	        },
	        selectedItems: {
	            type: new _graphql.GraphQLList(GraphQLItemType),
	            resolve: function resolve(obj) {
	                return obj;
	            }
	        }
	    },
	    interfaces: [nodeInterface]
	});

	var _connectionDefinition3 =
	// ,edgeType: GraphQLSimTypesEdge,
	(0, _graphqlRelay.connectionDefinitions)({
	    name: 'EventItemsType',
	    nodeType: GraphQLItemType
	});

	var EventItemsConnection = _connectionDefinition3.connectionType;

	var _connectionDefinition4 =
	// ,edgeType: GraphQLSimTypesEdge,
	(0, _graphqlRelay.connectionDefinitions)({
	    name: 'EventItemsType',
	    nodeType: GraphQLItemType
	});

	var EventItemsConnection = _connectionDefinition4.connectionType;
	var EventType = exports.EventType = new _graphql.GraphQLObjectType({

	    name: 'EventType',
	    description: 'It represents an event',
	    fields: {
	        id: (0, _graphqlRelay.globalIdField)('EventType'),
	        name: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.name;
	            } },
	        description: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.description;
	            } },
	        startDate: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.startDate;
	            } },
	        endDate: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
	                return obj.endDate;
	            } },
	        comments: {
	            type: EventCommentsConnection,
	            args: _extends({}, _graphqlRelay.connectionArgs),
	            resolve: function resolve(obj, _ref2) {
	                var args = _objectWithoutProperties(_ref2, []);

	                return (0, _graphqlRelay.connectionFromPromisedArray)(obj.getComments(), args);
	            }
	        },
	        reservedItems: {
	            type: EventItemsConnection,
	            args: _extends({}, _graphqlRelay.connectionArgs),
	            resolve: function resolve(obj, _ref3) {
	                var args = _objectWithoutProperties(_ref3, []);

	                return (0, _graphqlRelay.connectionFromPromisedArray)(obj.getItems(), args);
	            }
	        }
	    },
	    interfaces: [nodeInterface]
	});

	var UserType = exports.UserType = new _graphql.GraphQLObjectType({
	    name: 'UserType',
	    description: 'It display the information related to an user',
	    fields: {
	        id: (0, _graphqlRelay.globalIdField)('UserType'),
	        firstName: {
	            type: _graphql.GraphQLString,
	            resolve: function resolve(obj) {
	                return obj.firstName;
	            }
	        },
	        lastName: {
	            type: _graphql.GraphQLString,
	            resolve: function resolve(obj) {
	                return obj.lastName;
	            }
	        },
	        login: {
	            type: _graphql.GraphQLString,
	            resolve: function resolve(obj) {
	                return obj.login;
	            }
	        },
	        email: {
	            type: _graphql.GraphQLString,
	            resolve: function resolve(obj) {
	                return obj.email;
	            }
	        },
	        enabled: {
	            type: _graphql.GraphQLBoolean,
	            resolve: function resolve(obj) {
	                return obj.enabled;
	            }
	        }
	    },
	    interfaces: [nodeInterface]
	});

	var _connectionDefinition5 = (0, _graphqlRelay.connectionDefinitions)({
	    name: 'ItemType',
	    nodeType: GraphQLItemType
	});

	var ItemsConnection = _connectionDefinition5.connectionType;
	var GraphQLItemEdge = _connectionDefinition5.edgeType;
	exports.ItemsConnection = ItemsConnection;
	exports.GraphQLItemEdge = GraphQLItemEdge;

	var _connectionDefinition6 = (0, _graphqlRelay.connectionDefinitions)({
	    name: 'ModelType',
	    nodeType: GraphQLModelType
	});

	var ModelsConnection = _connectionDefinition6.connectionType;
	var GraphQLModelEdge = _connectionDefinition6.edgeType;
	exports.ModelsConnection = ModelsConnection;
	exports.GraphQLModelEdge = GraphQLModelEdge;

	var _connectionDefinition7 = (0, _graphqlRelay.connectionDefinitions)({
	    name: 'EventType',
	    nodeType: EventType
	});

	var EventsConnection = _connectionDefinition7.connectionType;
	var EventsEdge = _connectionDefinition7.edgeType;
	exports.EventsConnection = EventsConnection;
	exports.EventsEdge = EventsEdge;
	var GraphQLViewer = exports.GraphQLViewer = new _graphql.GraphQLObjectType({
	    name: 'Viewer',
	    fields: function fields() {
	        return {
	            id: (0, _graphqlRelay.globalIdField)('Viewer'),
	            user: {
	                type: UserType,
	                resolve: function resolve(obj) {
	                    return obj;
	                }
	            },
	            items: {
	                type: ItemsConnection,
	                args: _extends({
	                    severity: {
	                        type: _graphql.GraphQLString
	                    }
	                }, _graphqlRelay.connectionArgs),
	                resolve: function resolve(obj, _ref4) {
	                    var severity = _ref4.severity;

	                    var args = _objectWithoutProperties(_ref4, ['severity']);

	                    return _database2.default.models.state.findOne({ where: { severity: severity } }).then(function (state) {
	                        var queryArgs = { where: true };
	                        if (state != null) {
	                            queryArgs = { where: { stateId: state.id } };
	                        }
	                        return (0, _graphqlRelay.connectionFromPromisedArray)(_database2.default.models.item.findAll(queryArgs), args);
	                    });
	                }
	            },
	            item: {
	                type: GraphQLItemType,
	                args: {
	                    reference: {
	                        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
	                    }
	                },
	                resolve: function resolve(_, _ref5) {
	                    var reference = _ref5.reference;
	                    return _database2.default.models.item.findOne({ where: { reference: reference } }).then(function (response) {
	                        return response;
	                    });
	                }
	            },
	            events: {
	                type: EventsConnection,
	                args: _extends({
	                    date: {
	                        type: _graphql.GraphQLString
	                    }
	                }, _graphqlRelay.connectionArgs),
	                resolve: function resolve(obj, _ref6) {
	                    var date = _ref6.date;

	                    var args = _objectWithoutProperties(_ref6, ['date']);

	                    var date = (0, _moment2.default)(date, "YYYY-MM-DD");

	                    var beginOfMonth = (0, _moment2.default)(date.format("YYYY-MM") + "-01", "YYYY-MM-DD").format();
	                    var endOfMonth = (0, _moment2.default)(date.format("YYYY-MM") + "-" + date.daysInMonth(), "YYYY-MM-DD").format();

	                    var queryArgs = date != null ? { where: { startDate: { gte: beginOfMonth, $lte: endOfMonth } } } : null;

	                    console.log("queryArgs : " + JSON.stringify(queryArgs));
	                    return (0, _graphqlRelay.connectionFromPromisedArray)(_database2.default.models.event.findAll(queryArgs), args);
	                }
	            },
	            brands: {
	                type: new _graphql.GraphQLList(GraphQLBrandType),
	                resolve: function resolve() {
	                    return _database2.default.models.brand.findAll().then(function (response) {
	                        return response;
	                    });
	                }
	            },
	            models: {
	                type: ModelsConnection,
	                args: _extends({}, _graphqlRelay.connectionArgs),
	                resolve: function resolve(_, _ref7) {
	                    var args = _objectWithoutProperties(_ref7, []);

	                    return (0, _graphqlRelay.connectionFromPromisedArray)(_database2.default.models.model.findAll(), args);
	                }
	            },
	            domains: {
	                type: new _graphql.GraphQLList(GraphQLDomainType),
	                resolve: function resolve() {
	                    return _database2.default.models.domain.findAll().then(function (response) {
	                        return response;
	                    });
	                }
	            },
	            subCategories: {
	                type: new _graphql.GraphQLList(GraphQLSubCategoryType),
	                resolve: function resolve() {
	                    return _database2.default.models.subCategory.findAll().then(function (response) {
	                        return response;
	                    });
	                }
	            },
	            categories: {
	                type: new _graphql.GraphQLList(GraphQLCategoryType),
	                resolve: function resolve() {
	                    return _database2.default.models.category.findAll().then(function (response) {
	                        return response;
	                    });
	                }
	            },
	            states: {
	                type: new _graphql.GraphQLList(GraphQLStateType),
	                resolve: function resolve() {
	                    return _database2.default.models.state.findAll().then(function (response) {
	                        return response;
	                    });
	                }
	            },
	            countNextItemId: {
	                type: _graphql.GraphQLInt,
	                args: {
	                    itemReference: {
	                        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
	                    }
	                },
	                resolve: function resolve(functionToRetrievedViewerFromCache, _ref8) {
	                    var itemReference = _ref8.itemReference;


	                    var searchKey = itemReference + '%';
	                    return _database2.default.models.item.count({ where: { reference: { $like: searchKey } } }).then(function (response) {
	                        return response + 1;
	                    });
	                }
	            },
	            cart: {
	                type: GraphQLCartType,
	                resolve: function resolve(user) {
	                    return (0, _CartStore.getCart)(user.id);
	                }
	            }
	        };
	    },
	    interfaces: [nodeInterface]
	});

	var GraphQLRoot = exports.GraphQLRoot = new _graphql.GraphQLObjectType({
	    name: 'Root',
	    fields: {
	        viewer: {
	            type: GraphQLViewer,
	            args: {
	                viewerId: {
	                    name: 'viewerId',
	                    type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
	                }
	            },
	            resolve: function resolve(root, _ref9) {
	                var viewerId = _ref9.viewerId;
	                return _database2.default.models.user.findOne({ where: { id: viewerId } });
	            }
	        },
	        node: nodeField
	    }
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Viewer = undefined;
	exports.initState = initState;
	exports.getById = getById;
	exports.login = login;
	exports.getViewer = getViewer;

	var _lodash = __webpack_require__(11);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Viewer = exports.Viewer = function (_Object) {
	    _inherits(Viewer, _Object);

	    function Viewer() {
	        _classCallCheck(this, Viewer);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Viewer).apply(this, arguments));
	    }

	    return Viewer;
	}(Object);

	var VIEWER_ID = 'me';

	var viewer = new Viewer();
	viewer.id = VIEWER_ID;

	var itemsStore = [];

	var usersById = _defineProperty({}, VIEWER_ID, viewer);

	function initState(items) {
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

	function login(viewerId) {}

	function getViewer(viewerId) {
	    console.log("deprecated getViewer");
	    return usersById[viewerId];
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

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
	exports.removeItemFromCart = removeItemFromCart;
	exports.emptyCart = emptyCart;

	var _lodash = __webpack_require__(11);

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

	var cartStore = {};

	var usersById = _defineProperty({}, VIEWER_ID, viewer);

	function initState(items) {
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
	    return usersById[VIEWER_ID];
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

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EmptyCartMutation = exports.RemoveItemFromCartMutation = exports.AddItemInCartMutation = undefined;

	var _graphql = __webpack_require__(4);

	var _graphqlRelay = __webpack_require__(6);

	var _database = __webpack_require__(7);

	var _database2 = _interopRequireDefault(_database);

	var _Model = __webpack_require__(9);

	var _ItemStore = __webpack_require__(10);

	var _CartStore = __webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AddItemInCartMutation = exports.AddItemInCartMutation = new _graphqlRelay.mutationWithClientMutationId({
	    name: 'AddItemInCart',
	    description: 'Add one item into the cart',
	    inputFields: {
	        viewerId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
	        itemReference: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
	    },
	    outputFields: {
	        viewer: {
	            type: _Model.GraphQLViewer,
	            resolve: function resolve() {
	                return _ItemStore.getViewer;
	            }
	        },
	        cart: {
	            type: _Model.GraphQLCartType,
	            resolve: function resolve(obj) {
	                return obj;
	            }
	        }
	    },
	    mutateAndGetPayload: function mutateAndGetPayload(_ref) {
	        var viewerId = _ref.viewerId;
	        var itemReference = _ref.itemReference;

	        return _database2.default.models.item.findOne({ where: { reference: itemReference } }).then(function (item) {
	            (0, _CartStore.pushItemInCart)(viewerId, item);
	            return (0, _CartStore.getCart)(viewerId);
	        });
	    }
	});

	var RemoveItemFromCartMutation = exports.RemoveItemFromCartMutation = new _graphqlRelay.mutationWithClientMutationId({
	    name: 'RemoveItemFromCart',
	    description: 'Remove one item into the cart',
	    inputFields: {
	        viewerId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
	        itemReference: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
	    },
	    outputFields: {
	        viewer: {
	            type: _Model.GraphQLViewer,
	            resolve: function resolve() {
	                return _ItemStore.getViewer;
	            }
	        },
	        cart: {
	            type: _Model.GraphQLCartType,
	            resolve: function resolve(obj) {
	                return obj;
	            }
	        }
	    },
	    mutateAndGetPayload: function mutateAndGetPayload(_ref2) {
	        var viewerId = _ref2.viewerId;
	        var itemReference = _ref2.itemReference;

	        (0, _CartStore.removeItemFromCart)(viewerId, itemReference);
	        return (0, _CartStore.getCart)(viewerId);
	    }
	});

	var EmptyCartMutation = exports.EmptyCartMutation = new _graphqlRelay.mutationWithClientMutationId({
	    name: 'EmptyCart',
	    description: 'Empty cart',
	    inputFields: {
	        viewerId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
	    },
	    outputFields: {
	        viewer: {
	            type: _Model.GraphQLViewer,
	            resolve: function resolve() {
	                return _ItemStore.getViewer;
	            }
	        },
	        cart: {
	            type: _Model.GraphQLCartType,
	            resolve: function resolve(obj) {
	                return obj;
	            }
	        }
	    },
	    mutateAndGetPayload: function mutateAndGetPayload(_ref3) {
	        var viewerId = _ref3.viewerId;

	        (0, _CartStore.emptyCart)(viewerId);
	        return (0, _CartStore.getCart)(viewerId);
	    }
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AddEventMutation = undefined;

	var _graphql = __webpack_require__(4);

	var _graphqlRelay = __webpack_require__(6);

	var _database = __webpack_require__(7);

	var _database2 = _interopRequireDefault(_database);

	var _Model = __webpack_require__(9);

	var _ItemStore = __webpack_require__(10);

	var _CartStore = __webpack_require__(12);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AddEventMutation = exports.AddEventMutation = new _graphqlRelay.mutationWithClientMutationId({
	    name: 'AddEvent',
	    description: 'Function to add an event',
	    inputFields: {
	        name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
	        startDate: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
	        endDate: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
	        description: { type: _graphql.GraphQLString },
	        reservedItems: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
	        userId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }

	    },
	    outputFields: {
	        viewer: {
	            type: _Model.GraphQLViewer,
	            resolve: function resolve() {
	                return _CartStore.getViewer;
	            }
	        },
	        cart: {
	            type: _Model.GraphQLCartType,
	            resolve: function resolve(args) {
	                return (0, _ItemStore.emptyCart)(args.userId);
	            }
	        },
	        eventEdge: {
	            type: _Model.EventsEdge,
	            resolve: function resolve(obj, _ref) {
	                var id = _ref.id;


	                return _database2.default.models.event.findAll().then(function (events) {

	                    var eventToPass = undefined;
	                    var _iteratorNormalCompletion = true;
	                    var _didIteratorError = false;
	                    var _iteratorError = undefined;

	                    try {
	                        for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                            var event = _step.value;

	                            if (event.id === obj.id) {
	                                eventToPass = event;
	                            }
	                        }
	                    } catch (err) {
	                        _didIteratorError = true;
	                        _iteratorError = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion && _iterator.return) {
	                                _iterator.return();
	                            }
	                        } finally {
	                            if (_didIteratorError) {
	                                throw _iteratorError;
	                            }
	                        }
	                    }

	                    var cursor = (0, _graphqlRelay.cursorForObjectInConnection)(events, eventToPass);
	                    return {
	                        cursor: cursor,
	                        node: eventToPass
	                    };
	                });
	            }
	        }
	    },
	    mutateAndGetPayload: function mutateAndGetPayload(_ref2) {
	        var name = _ref2.name;
	        var startDate = _ref2.startDate;
	        var endDate = _ref2.endDate;
	        var description = _ref2.description;
	        var reservedItems = _ref2.reservedItems;


	        var event = {
	            name: name,
	            startDate: startDate,
	            endDate: endDate,
	            description: description
	        };

	        return _database2.default.models.event.create(event).then(function (event) {
	            reservedItems.forEach(function (reference) {
	                _database2.default.models.item.findOne({ where: { reference: reference } }).then(function (item) {
	                    return event.addItem(item);
	                });
	            });

	            return event;
	        });
	    }
	});

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("express-graphql");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ }
/******/ ]);
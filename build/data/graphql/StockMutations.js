'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AddItemMutation = exports.AddModelMutation = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

var _Model = require('./Model');

var _UserStore = require('../stores/UserStore');

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
                return _UserStore.getViewer;
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
        subCategories: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
        comments: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
        author: { type: _graphql.GraphQLString }
    },
    outputFields: {
        viewer: {
            type: _Model.GraphQLViewer,
            resolve: function resolve() {
                return _UserStore.getViewer;
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
        var comments = _ref3.comments;
        var author = _ref3.author;


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
                            comments.forEach(function (c) {
                                return item.createComment({ text: c, author: author });
                            });
                            return item;
                        });
                    });
                });
            });
        });
    }
});
import Sequelize from 'sequelize'

var mysql_schema = process.env.CLEARDB_DATABASE_SCHEMA || "lrds"
var mysql_user = process.env.CLEARDB_DATABASE_USER || "lrds"
var mysql_pass = process.env.CLEARDB_DATABASE_PASS || "lrds"


const connection = process.env.CLEARDB_DATABASE_URL !== undefined ? new Sequelize(process.env.CLEARDB_DATABASE_URL, {
    pool: {
        max: 5,
        min: 1,
        idle: 10000
    },
})
    :  new Sequelize(mysql_schema, mysql_user, mysql_pass, {dialect: "mysql", host: "localhost",
        logging: (param) => {param.indexOf("Executing (default):") !== -1 ? false : true}})


const brand = connection.define('brand', {

    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING
    }

}, {timestamps: false})

const model = connection.define('model', {

    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING
    }

}, {timestamps: false})

brand.hasMany(model)

const state = connection.define('state', {

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    severity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

}, {timestamps: false})

const item = connection.define('item',  {

        reference: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // TODO : remove and guess it via reserved item
        isInStock: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }
)

state.hasMany(item)
model.hasMany(item)

item.belongsToMany(item, {as: 'linkedItem', through: 'linkedItems', timestamps: false})
const itemComment = connection.define('itemComment',  {

        text: {
            type: Sequelize.STRING,
            allowNull: false
        },
        author: {
            
            type: Sequelize.STRING,
            allowNull: false
        }
    }
);

item.hasMany(itemComment, {as: 'Comments'})


const event = connection.define('event', {

    name: {type: Sequelize.STRING, allowNull: false},
    description: {type: Sequelize.STRING},
    startDate: {type: Sequelize.STRING, allowNull: false},
    endDate: {type: Sequelize.STRING, allowNull: false}
});

event.belongsToMany(item, {through: 'reservedItems', timestamps: false})
item.belongsToMany(event, {through: 'reservedItems', timestamps: false})

const eventComment = connection.define('eventComment', {

    text: {type: Sequelize.STRING, allowNull: false},
    author: {type: Sequelize.STRING, allowNull: false}
});

event.hasMany(eventComment, {as: 'Comments'});

const category = connection.define('category', {

        name: {type: Sequelize.STRING, allowNull: false},
        description: {type: Sequelize.STRING}

    },
    { timestamps: false}
);

const subCategory = connection.define('subCategory', {

        name: {type: Sequelize.STRING, allowNull: false},
        description: {type: Sequelize.STRING}
    },
    {
        timestamps: false
    }
)


subCategory.belongsToMany(model, {through: 'modelCategory', timestamps: false})
model.belongsToMany(subCategory, {through: 'modelCategory', timestamps: false})

category.hasMany(subCategory, {as: 'SubCategories'})

const domain = connection.define('domain', {

        name: {type: Sequelize.STRING, allowNull: false},
        description: {type: Sequelize.STRING}
    },
    {
        timestamps: false
    }
)


domain.belongsToMany(model, {through: 'modelDomain', timestamps: false})
model.belongsToMany(domain, {through: 'modelDomain', timestamps: false})


connection.define('user', {
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        login: {type: Sequelize.STRING, unique: true},
        password: Sequelize.STRING,
        email: {type: Sequelize.STRING, unique: true},
        enabled: Sequelize.BOOLEAN
    } , {timestamps: false, tableName: 'users', freezeTableName: true,}
);

connection.sync({force: false})
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


export default connection

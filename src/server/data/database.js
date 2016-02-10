import Sequelize from 'sequelize'

var mysql_schema = process.env.CLEARDB_DATABASE_SCHEMA || "lrds"
var mysql_user = process.env.CLEARDB_DATABASE_USER || "greec"
var mysql_pass = process.env.CLEARDB_DATABASE_PASS || "test"


const connection = process.env.CLEARDB_DATABASE_URL !== undefined ? new Sequelize(process.env.CLEARDB_DATABASE_URL)
    :  new Sequelize(mysql_schema, mysql_user, mysql_pass, {dialect: "mysql", host: "localhost"})

const item = connection.define('item',  {

        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        reference: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
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

item.belongsToMany(item, {as: 'linkedItem', through: 'linkedItems', timestamps: false})
const itemComment = connection.define('itemComment',  {

        text: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }
)

item.hasMany(itemComment, {as: 'Comments'})

const event = connection.define('events', {

    name: {type: Sequelize.STRING, allowNull: false},
    description: {type: Sequelize.STRING},
    startDate: {type: Sequelize.STRING, allowNull: false},
    endDate: {type: Sequelize.STRING, allowNull: false}
})

event.belongsToMany(item, {through: 'reservedItems', timestamps: false})
item.belongsToMany(event, {through: 'reservedItems', timestamps: false})

const eventComment = connection.define('eventComment',  {

        text: {type: Sequelize.STRING, allowNull: false}
    }
)

event.hasMany(eventComment, {as: 'Comments'})

const category = connection.define('category', {

        name: {type: Sequelize.STRING, allowNull: false},
        description: {type: Sequelize.STRING}

    },
    { timestamps: false}
)

const subCategory = connection.define('subCategory', {

        name: {type: Sequelize.STRING, allowNull: false},
        description: {type: Sequelize.STRING}
    },
    {
        timestamps: false
    }
)


subCategory.belongsToMany(item, {through: 'itemCategory', timestamps: false})
item.belongsToMany(subCategory, {through: 'itemCategory', timestamps: false})

category.hasMany(subCategory, {as: 'SubCategories'})

const domain = connection.define('domain', {

        name: {type: Sequelize.STRING, allowNull: false},
        description: {type: Sequelize.STRING}
    },
    {
        timestamps: false
    }
)

domain.belongsToMany(item, {through: 'itemDomain', timestamps: false})
item.belongsToMany(domain, {through: 'itemDomain', timestamps: false})




// Relationship
//Wreck.hasMany(Media)
//Media.belongsTo(Wreck)


connection.sync({force: true}).then(() => {
    domain.create({name: 'STUDIO'})
    domain.create({name: 'SCENE'})
    category.create({name: "MICRO"})
        .then(category => {
            return category.createSubCategory({name: "DYNAMIQUE"})
                .then(subCategory => {
                    return subCategory.createItem({name: "Fireface UC",
                                                   reference:'RMEUC01',
                                                   description:"une carte son 8 piste"})
                })
        })

    //item.create({name: "Fireface UC", reference:'RMEUC01', description:"une carte son 8 piste"})
})


export default connection

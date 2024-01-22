const BookModel = require('../models/bookModel')
const UserModel = require('../models/userModel')
const RoleModel = require('../models/roleModel')
const { Sequelize, DataTypes } = require('sequelize');
const reviewModel = require('../models/reviewModel');
const {setBooks, setUsers, setRoles } = require('../db/setDataSample')
const sequelize = new Sequelize(
    'ella_library',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mariadb',
        logging: false
    }
)


const Role = RoleModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
const Book = BookModel(sequelize, DataTypes)
const Review = reviewModel(sequelize, DataTypes)


Role.hasMany(User);
User.belongsTo(Role);

User.hasMany(Book);
Book.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Book.hasMany(Review,{
    foreignKey:{
        allowNull:false,
    },
});
Review.belongsTo(Book);



sequelize.sync({ force: true })
    .then(async () => {
        await setRoles(Role)
        await setUsers(User)
        await setBooks(Book)

    })
    .catch(error => {
        console.log(error)
    })


sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))


module.exports = { Book, User, Role, Review, sequelize }


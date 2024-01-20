const mockBooks = require('./mock-books')
const mockUsers = require('./mock-users')
const bcrypt = require('bcrypt')

const setBooks = (Book) => {
    return Promise.all(mockBooks.map((element) => {
        const newBook = { ...element, id: null }
        return Book.create(newBook)
            .then(() => { })
            .catch((error) => {
                console.log(error.message)
            })
    }))
}

const setUsers = (User) => {

    return Promise.all(mockUsers.map(user => {
        return bcrypt.hash(user.password, 10)
            .then(hashResult => {
                return User.create({ ...user, password: hashResult })
                    .then(() => { })
                    .catch((error) => {
                        console.log(error.message)
                    })
            })
    }))
}

const setRoles = (Role) => {
    return Promise.all([Role.create({ label: "superadmin" }), Role.create({ label: "admin" }), Role.create({ label: "edit" })])
}


module.exports = { setBooks, setUsers, setRoles }
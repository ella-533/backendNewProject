// const { Op } = require('sequelize')
const { UniqueConstraintError, ValidationError } = require('sequelize')
const { Book, User, Review } = require('../db/sequelizeSetup')

const findAllBooks = (req, res) => {
    Book.findAll({ include: [Review, User] })
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}



// const findAllBooksRawSQL = (req, res) => {
//     sequelize.query("SELECT name, rating FROM books LEFT JOIN reviews ON books.id = reviews.BooksId", { type: QueryTypes.SELECT })
//         .then((results) => {
//             res.json(results)
//         })
//         .catch(error => {
//             res.status(500).json(error.message)
//         })
// }

const findBookByPk = (req, res) => {
    Book.findByPk((parseInt(req.params.id)))
        .then((result) => {
            if (result) {
                res.json({ message: 'Un book a été trouvé.', data: result })
            } else {
                res.status(404).json({ message: `Aucun book n'a été trouvé.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const createBook = (req, res) => {
    User.findOne({ where: { username: req.username } })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: `L'utilisateur n'a pas été trouvé.` })
            }
            const newBook = { ...req.body, UserId: user.id }
            Book.create(newBook)
                .then((book) => {
                    res.status(201).json({ message: 'Le book a bien été créé', data: book })
                })
                .catch((error) => {
                    if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                        return res.status(400).json({ message: error.message })
                    }
                    res.status(500).json({ message: `Le book n'a pas pu être créé`, data: error.message })
                })
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const updateBook = (req, res) => {
    Book.findByPk(req.params.id)
        .then((result) => {
            if (result) {
                console.log('test')
                return result.update({ ...req.body })
                    .then(() => {
                        res.status(201).json({ message: 'Le book a bien été mis à jour.', data: result })
                    })
            } else {
                res.status(404).json({ message: `Aucun book à mettre à jour n'a été trouvé.` })
            }
        })
        .catch(error => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const deleteBook = (req, res) => {
    // A. On vérifie que l'id passé en req.params.id renvoie bien une ligne de notre table.
    Book.findByPk(req.params.id)
        .then((result) => {
            // B. Si un book correspond à l'id alors on exécute la méthode destroy()
            if (result) {
                return result.destroy()
                    // C. Si le book est bien supprimé, on affiche un message avec comme data le book récupéré dans le .findByPk()
                    .then((result) => {
                        res.json({ mesage: `Le book a bien été supprimé.`, data: result })
                    })
            } else {
                // B Si aucun book ne correspond à l'id alors on retourne une réponse à POSTMAN
                res.status(404).json({ mesage: `Aucun book trouvé.` })
            }
        })
        .catch((error) => {
            // E. Si une erreur est survenue dès le findByPk, on retourne une réponse à POSTMAN
            res.status(500).json({ mesage: `La requête n'a pas aboutie.`, data: error.message })
        })
}

module.exports = { findAllBooks, findBookByPk, createBook, updateBook, deleteBook }
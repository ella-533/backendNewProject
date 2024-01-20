const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require("cors")
const port = process.env.PORT || 3005

// const { sequelize } = require('./db/sequelizeSetup')
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
// app.use(cookieParser())

app.get('/', (req, res) => {
    // Exemple d'un cookie de première visite d'un site

    // console.log(req.cookies)
    // res.cookie('monapirest_estdejavenu', true)
    // if (req.cookies.monapirest_estdejavenu) {
    //     res.json('Hello World !')
    // } else {
    //     res.json('Salut tu es nouveau !')
    // }
 
    console.log(req);

    res.json('Hello World !')
})


app.put('/api/users/:userId', async (req, res) => {
    try {
      // Logic to update password
      // ...
  
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

const bookRouter = require('./routes/bookRoutes')
const userRouter = require('./routes/userRoutes')
const reviewRouter = require('./routes/reviewRoutes')

app.use('/api/books', bookRouter)
app.use('/api/users', userRouter)
app.use('/api/reviews', reviewRouter)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
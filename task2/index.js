const morgan = require('morgan')
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// const UsersSchema = require('./models/User')
const authRouter = require('./routes/authRouter')
// const userRouter = require('./routes/userRouter')
const notesRouter = require('./routes/notesRouter')

dotenv.config();
const app = express()
const PORT = process.env.PORT || 8080;
const db = mongoose.connection;

app.use(express.json())
app.use(morgan('combined'))

app.use('/api/auth', authRouter)
// app.use('/api/users', userRouter)
app.use('/api/notes', notesRouter)

mongoose.connect('mongodb+srv://sasha:sasha@cluster0.msjsx.mongodb.net/practice?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

// const Users = mongoose.model('Users', UsersSchema);


// app.post('/api/auth/register', (request, response) => {
//
//     console.log(request.body)
//     const {username, password} = request.body;
//
//     if(!username || !password) {
//         response.status(400).send({message: 'Bad request'})
//         return;
//     }
//
//     try {
//         Users.create({
//             username: `${request.body.username}`,
//             password: `${request.body.password}`
//         }).then(() => response.status(200).send({message: 'Success'}))
//
//     } catch(err) {
//         response.status(500).send({message: 'Internal server error'})
//     }
// })



app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`))

const {Schema, model} = require('mongoose')

const UsersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
})

module.exports = model('Users', UsersSchema);
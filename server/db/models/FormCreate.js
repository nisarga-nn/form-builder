const mongoose = require('mongoose')

    
const formCreateSchema = new mongoose.Schema({
    name: {
        type: String,
        // unique: true,
        required: true,
    },
    task_data: [mongoose.Schema.Types.Mixed]
}, {
    timestamps: true
})


const FormCreate = mongoose.model('Form Created', formCreateSchema)

module.exports = FormCreate
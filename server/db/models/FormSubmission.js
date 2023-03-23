const mongoose = require('mongoose')

    
const formSubmissionSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    message: {
        type: String
    }
}, {
    timestamps: true
})


const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema)

module.exports = FormSubmission


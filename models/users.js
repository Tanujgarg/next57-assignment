const mongoose = require("mongoose")
const Schema = mongoose.Schema


const nameSchema = new Schema({
    firstName: String,
    lastName: String,
    middleName: String
})

const authSchema = new Schema({
    username: String,
    password: String
})

const contactSchema = new Schema({
    email: {
        primary: String,
        alternative: String
    },
    mobile: {
        primary: String,
        alternative: String
    }
})

const addressSchema = new Schema({
    title: String,
    value: String,
    description: String
})

const userSchema = new Schema({
    name: nameSchema,
    fatherName: nameSchema,
    motherName: nameSchema,
    contact: contactSchema,
    dob: Date,
    auth: authSchema,
    address: [addressSchema],
    create_on: {
        type: Date,
        default: Date.now
    }
})


const User = mongoose.model("User", userSchema)

exports.User = User;
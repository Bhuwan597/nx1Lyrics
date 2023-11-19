/*
full name
email
password
profile picture
created on
*/
import mongoose from "mongoose";
const {Schema}= mongoose
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    fullName: {type:String, required:true},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    password: {type: String, required:true},
    picture: {type: String},
    createdOn: {type:String, default: Date.now()}
})
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


userSchema.methods.matchPassword = async function(enteredpassword){
    const flag = await bcrypt.compare(enteredpassword, this.password)
    return flag
}
module.exports = mongoose.models.Users || mongoose.model('Users', userSchema)
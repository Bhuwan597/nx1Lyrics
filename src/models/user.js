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
    picture: {type: String, default: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'},
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
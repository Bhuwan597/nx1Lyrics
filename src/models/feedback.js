import mongoose, { mongo } from "mongoose";
const {Schema} = mongoose

const feedbackSchema = new Schema({
    name : {type:String, required:true},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    message: {type:String},
    date: {type:String},
    isSeen:{type:Boolean, default:false}
}, {timestamps:true})

module.exports = mongoose.models.Feedbacks || mongoose.model('Feedbacks', feedbackSchema)
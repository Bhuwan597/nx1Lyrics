import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
    notificationTitle :{ type: String, required:true, trim:true},
    notificationDescription: {type: String, required:true,} ,
    callbackUrl :{type: String, required:true},
    date: {type: String, required:true},
    isSeen: {type:Boolean, default: false}
},{timestamps:true})

module.exports = mongoose.models.Notification || mongoose.model('Notification', notificationSchema)
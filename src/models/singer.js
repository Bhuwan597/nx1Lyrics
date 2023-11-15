import mongoose, { mongo } from "mongoose";

const {Schema} = mongoose

const singerSchema = new Schema({
    fullName: {type:String, required:true, unique:true, trim:true},
    nickName: {type:String, default:''},
    nationality: {type:String, required:true},
    songs : [{type: mongoose.Schema.Types.ObjectId, ref: 'Songs'}],
    profilePicture: {type:String, required:true},
},{
    timestamps: true,
})

module.exports = mongoose.models.Singer || mongoose.model('Singer', singerSchema)
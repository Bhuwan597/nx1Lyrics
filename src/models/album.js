import mongoose, { Schema } from "mongoose";

const albumSchema = new mongoose.Schema({
    name : {type:String, required:true, unique:true},
    singers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Singer'}],
    artists: [{type:String}],
    coverPicture: {type:String}
}, {timestamps:true})


module.exports = mongoose.models.Album || mongoose.model('Album', albumSchema)
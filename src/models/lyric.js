import mongoose, { Mongoose, mongo } from "mongoose";
const {Schema} = mongoose
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)
const lyricSchema = new Schema(
    {
        title : {type: String, required: true, trin: true, unique:true},
        releasedDate : {type: String},
        coverPicture : {type: String},
        singers : [{type: mongoose.Schema.Types.ObjectId, ref:'Singer', required: true}],
        writers : [{type: String}],
        composers : [{type: String}],
        artists : [{type: String}],
        language: {type: String, required: true},
        duration: {type: String},
        tags: [{type:String}],
        lyrics: [{type:String, required:true}],
        postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
        postedOn: {type: String},
        albumName: {type:String},
        source: {type: String},
        slug: {type: String, slug:'title'},
        referenceName: {type: String},
        referenceEmail: {type: String},
        singerReference: {type: String},
        views: {type: Number, default:0},
        likes: {type: Number, default:0},
        dislikes:{type:Number, default:0},
        isPublished: {type:Boolean, default:false}
    }
)

module.exports = mongoose.models.Lyrics || mongoose.model('Lyrics', lyricSchema)
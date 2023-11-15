import mongoose, { Mongoose, mongo } from "mongoose";
const {Schema} = mongoose

const lyricSchema = new Schema(
    {
        title : {type: String, required: true, trin: true, unique:true},
        releasedDate : {type: String},
        singers : [{type: mongoose.Schema.Types.ObjectId, ref:'Singer', required: true}],
        writers : [{type: String}],
        composers : [{type: String}],
        artists : [{type: String}],
        language: {type: String, required: true},
        duration: {type: String},
        tags: [{type:String}],
        lyrics: [{type:String, required:true}],
        postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        postedOn: {type: String},
        albumName: {type:String},
        source: {type: String},
        slug: {type: String},
        refernceName: {type: String},
        refernceEmail: {type: String},
        views: {type: Number},
        likes: {type: Number},

    }
)

module.exports = mongoose.models.Lyrics || mongoose.model('Lyrics', lyricSchema)

/*
title
released date
singers
writers
composers
artists
language
duration
tags
lyric
posted by
album name
posted on
source
slug
reference Name
*/
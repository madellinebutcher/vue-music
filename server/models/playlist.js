let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let schemaName = 'Playlist'

let songSchema = new Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    collection: {type: String, required: true}
    
})

let schema = new Schema({
    songs:[songSchema],
    created: { type: Number, required: true, default: Date.now() },
    userId: {type: ObjectId, ref: "User", required:true},
})


module.exports = mongoose.model(schemaName, schema)
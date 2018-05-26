let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let schemaName = 'Playlist'

let songSchema = new Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    coll: {type: String, required: true}
    
})

let schema = new Schema({
    title: {type: String, required:true},
    songs:[songSchema],
    created: {type: Number, required: true, default: Date.now() },
    // userId: {type: ObjectId, ref: "User", required:true},
})

schema.pre('save', function(next){
    this.markModified('songs')
    next()
})


module.exports = mongoose.model(schemaName, schema)
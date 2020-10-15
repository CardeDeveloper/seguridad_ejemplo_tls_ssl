const mongoose = require('mongoose')

var Schema = mongoose.Schema

//Define Schema
  var Schema = new Schema({
    user: {type: Schema.Types.ObjectId , required: true},
    created_at: { type: Date, default: Date.now },
  });


  module.exports= mongoose.model('Bitacora',  Schema)
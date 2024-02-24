const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    validatedFile:{
        type:String,
        require:false
    },
    totalEntries:{
        type:Number,
        require:false
    },
    validEntries:{
        type:Number,
        require:false
    },
    inValidEntries:{
        type:Number,
        require:false
    }
})

const files = mongoose.model('files',FileSchema);

module.exports = files;
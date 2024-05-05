
const mongoose=require('mongoose');


const urlSchema=new mongoose.Schema({
    originalUrl : {
        type : String,
        required : true
    },
    shortedUrl : {
        type : String,
        required : true,
        unique : true
    },
    requestHistory : {
        type : [ {timeStamp : Date}],
        default : []
    }

},{timestamps : true});


exports.urlModel=mongoose.model('urlCollection',urlSchema);
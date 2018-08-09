var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var task= new Schema({
time:Number,
timeampm:String,
type:String,
status:String,
priority:Number,
createdat:Date,
lastrunat:Date,
nextrunat:Date,
rate:Number,
topic:String,
devicecharge:Number,
infusionstatus:String,
infusedVolume:{type:Number,default:0},
timeRemaining:Number,
totalVolume:Number,
percentage:Number,
_station:{ type: Schema.ObjectId, ref: 'Station'},
_bed:{ type: Schema.ObjectId, ref: 'Bed'},
_patient:{ type: Schema.ObjectId, ref: 'Patient'},
_medication:{ type: Schema.ObjectId, ref: 'Medication'},
});

module.exports = mongoose.model('Task',task);


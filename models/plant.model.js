let mongoose = require('mongoose');

// define attributes to help connect to the database 
const server = 'plantsdev.4kvct.mongodb.net'
const database = 'plants-dev';
const user = 'mdiedricks';
const password = 'mongoTestDb';
const options = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true 
}

// CONNECT to the database
// this should only be done ONCE at the beginning
// this will generate the uri for the database
mongoose.connect(`mongodb+srv://${user}:${password}@${server}/${database}`, options);
// quick console message to confirm connection
mongoose.connection.on('connected', ()=>{
    console.log('Mongoose is connected')
})
// Mongoose has two main two components 
// 1. schema - represents data structure
// 2. model - HOF that wraps schema

// the below schema is used to validate the data before it goes into MongoDB
//this is because MongoDB is schema-less. It's simply json data
let PlantSchema = new mongoose.Schema({
    name:String,
    species: {
        type: String,
        required: true,
        unique: true
    },
})

module.exports = mongoose.model('Plant', PlantSchema);
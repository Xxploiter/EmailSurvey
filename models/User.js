const mongoose = require('mongoose')

// const schema = mongoose.Schema //this line and line below are same so any one can be used
const {Schema} = mongoose;
// with the schema object we are gonna define the properties that our database scehma might have
// basically how every record is gonna look like
// now below i am gonna define the schema using the above schema object

const userSchema = new Schema({
    googleId: String,

})

// our schema is created now we want to tell mongoose that this collection
// needs to be created with above respected schema
mongoose.model('users', userSchema)// first arg is the name of the collection and the 2nd is the schema associated with it
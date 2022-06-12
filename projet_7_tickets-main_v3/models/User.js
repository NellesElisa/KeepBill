import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: String,
    firstname: String,
    adress: String,
    postal: Number,
    city: String,
    mail: String,
    mdp: String,
    status: String,

});

const User = mongoose.model('User', userSchema);

export default User;
import mongoose from 'mongoose';


const adminSchema = new mongoose.Schema({
    
    mail: String,
    mdp: String,
   
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;

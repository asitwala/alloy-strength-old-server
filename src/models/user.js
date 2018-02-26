import mongoose from 'mongoose'; 
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstName: String,
    email: String,
});

let User = mongoose.model('User', UserSchema);

export default User; 

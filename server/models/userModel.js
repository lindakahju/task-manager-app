const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
module.exports = User;









// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     username: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// });

// userSchema.statics.signup = async function (username, password) {
//     if (!username || !password || typeof password !== 'string' || password.trim() === '') {
//         throw new Error('Both username and password are required');
//     }

//     const exists = await this.findOne({ username });

//     if (exists) {
//         throw new Error('Username already exists');
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);

//     const user = await this.create({ username, password: hash });

//     return user;
// };


// userSchema.statics.login = async function(username, password) {
//     if (!username || !password || typeof password !== 'string' || password.trim() === '') {
//         throw new Error('Both username and password are required');
//     }

//     const user = await this.findOne({ username });

//     if (!user) {
//         throw new Error('Username does not exist');
//     }

//     const match = await bcrypt.compare(password, user.password)

//     if (!match) {
//         throw Error('Incorrect password')
//     }

//     return user
// }

// module.exports = mongoose.model('User', userSchema);




// const UserModel = mongoose.model('User', userSchema);

// module.exports = UserModel;
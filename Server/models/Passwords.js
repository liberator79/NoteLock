const mongoose = require("mongoose")

const passwordsSchema = mongoose.Schema({
    title : {
        type : String,
    },
    password : {
        type : String,
        require : true,
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    }
}, {timestamps : true});

const Passwords = mongoose.model("Password", passwordsSchema);
module.exports = Passwords
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        default:'',
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    fullName:{
        type:String,
        max:30,
        default:''
    },
    nid:{
        type:Number,

    },
    dob:{
        type:String,
    },
    gender:{
        type:String,
    },
    address:{
        type:String,
    },
    issueDate:{
        type:String,
    },
    expiryDate:{
        type:String,
    },
    auth:{
        type:String,
        default:'streamlined-docs',
    },
    citizenship:{
        type:String,

    },
    height:{
        type:Number,
    },
    eye:{
        type:String,
    },
    blood_grp:{
        type:String,
    }

},{
    timestamps:true,
})

module.exports = mongoose.model("Users", userSchema)
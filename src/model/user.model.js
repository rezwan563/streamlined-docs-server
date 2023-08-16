const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:4,
        max:20,
        unique:true,
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
    full_name:{
        type:String,
        max:30,
        required:true,
        default:''
    },
    nid:{
        type:Number,

    },
    dob:{
        type:Date,
        required:true,
        default:'',
    },
    gender:{
        type:String,
        required:true,
        default:''
    },
    address:{
        type:String,
        required:true,
        default:'',
    },
    issue:{
        type:Date,
    },
    exp:{
        type:Date,
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

module.exports = mongoose.model("User", userSchema)
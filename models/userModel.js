const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },

    isAvatarImageSet:{
        type:Boolean,
        default:false
    },

    avatarImage:{
        type:String,
        default:""
    }
});

const User=mongoose.model("Users",userSchema);
module.exports=User;
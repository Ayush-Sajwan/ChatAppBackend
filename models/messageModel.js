const mongoose=require('mongoose');

const messageSchema=mongoose.Schema({

    body:{
        type:String,
        required:true
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    date:{
        type:Date
    }
},
{
    timestamps:true
});

const messageModel=mongoose.model("message",messageSchema);

module.exports=messageModel;
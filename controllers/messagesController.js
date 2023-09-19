const messageModel=require('../models/messageModel');

const storeMessage=async (req,res,next)=>{

    try{

        const {sender,receiver,body}=req.body;

        const msg=await messageModel.create({sender,receiver,body});
        
        if(msg){
            res.json({status:true});
        }
        else{
            throw new Error("Could not store");
        }

    }
    catch(err){
        console.log(err);
        res.json({status:false});
        next();
    }
};

const getMessages=async (req,res,next)=>{

    try{

        const {sender,receiver}=req.body;

        const msgs=await messageModel.find({$or:[
            {
                sender,receiver
            },
            {
                sender:receiver,receiver:sender
            }
        ]});

        res.json({messages:msgs});
    }
    catch(err){
        console.log(err);
        res.json({status:false});
        next();
    }
}

module.exports={storeMessage,getMessages};
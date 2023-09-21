const User = require("../models/userModel");

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const check = await User.findOne({ email });

        if (check) {

            res.json({ msg: "Email is Already registered", status: false });
        }

        const user=await User.create({ username, email, password });

        res.json({ user, status: true });
    }
    catch (err) {
        console.log(err);
        next(err);
    }

}

const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        const check = await User.findOne({ email });

        if (!check) {

            res.json({ msg: "Email is not registered !", status: false });
        } else {
            const user = await User.findOne({ email });

            if (password !== user.password) {
                res.json({ msg: "Wrong Password please check !", status: false });
            }
            else {
                res.json({ user, status: true });
            }
        }
    }
    catch (err) {
        console.log(err);
        next(err);
    }

}

const setAvatar=async (req,res,next)=>{

    try{

        const id=req.params.id;
        const {image}=req.body;

        const user1=await User.findOneAndUpdate({_id:id},{
            isAvatarImageSet:true,
            avatarImage:image
        });
        const user=await User.findOne({_id:id});

        res.json({user,isSet:true});

    }
    catch(err){

        res.json({msg:"Could not update due to some error",isSet:false});
        console.log(err);
        next(err);
    }

}

const getAllUsers=async (req,res,next)=>{

    try{
        const users=await User.find({_id:{$ne:req.params.id}}).select([
            "email","username","avatarImage","_id"
        ]);

        return res.json(users);

    }
    catch(err){
        console.log(err);
        next(err);
    }
}


module.exports = { register, login ,setAvatar,getAllUsers };
const router=require('express').Router();
const {storeMessage,getMessages}=require('../controllers/messagesController');

router.post("/storeMessage",storeMessage);
router.post('/getMessages',getMessages);

module.exports=router;
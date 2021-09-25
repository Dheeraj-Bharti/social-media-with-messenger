const router = require("express").Router();
const Conversation = require("../models/Conversation");

// new convos
router.post("/",async (req,res)=> {
    const newConvo = new Conversation({
        members:[req.body.senderId,req.body.receiverId]
    })
    try{
        const savedConvos = await newConvo.save();
        res.status(200).json(savedConvos);

    }catch(err){
        res.status(500).json(err);
    }
})
//get convos
router.get("/:userId",async(req,res)=> {
    try{
        const convos = await Conversation.find({
            members:{$in:[req.params.userId]},
        });
        res.status(200).json(convos);

    }catch(err){
        res.status(500).json(err);
    }
})

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
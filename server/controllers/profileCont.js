const User = require('../model/user')

async function getProfile(req,res) {
    
    try {
        const users =await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json(`Error:${err.message}`)
    }
}

async function getUser(req,res) {
    try {

    const user = await User.findById(req.params.id)

    if(!user){
        res.json('user doest exist')
    }
    res.json({user})
            
    } catch (err) {
        res.status(500).json(`Error:${err.message}`)
    }
}

async function editUser(req,res) {

    const userId = req.body.userId 
    const newName = req.body.name 

    try {
        
        const useredit = await User.findByIdAndUpdate(
            userId,
            {
                $set:{
                    name:newName
                }
            }
        )
        
        const user = await User.findById(userId)

        if(user.name === newName){
           return res.json("name changed")
        }
        res.json("name not changed")
        
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

async function addFollowing(req,res){

    const mainId = req.body.mainId 
    const userId = req.body.userId 
    console.log(mainId);
    console.log(userId);
    try {
        
        const follow = await User.findByIdAndUpdate(
            userId,
            {
                $addToSet:{
                    followers:mainId
                }
            },
            {new: true}
        )

        const user = await User.findById(userId)

            console.log(user);
        if(user.followers.includes(mainId)){
            return res.json("following granded")
        }

        res.json('following not granded')

    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

async function removeFollowing(req,res){

    const mainId = req.body.mainId 
    const userId = req.body.userId 

    console.log(mainId);
    console.log(userId);
    try {
        
        const follow = await User.findByIdAndUpdate(
            userId,
            {
                $pull:{
                    followers:mainId
                }
            },
            {new: true}
        )

        const user = await User.findById(userId)
        
        console.log(user);
        if(!user.followers.includes(mainId)){
            return res.json("unfollowing granded")
        }

        res.json('unfollowing not granded')

    } catch (err) {
        res.status(500).json({error:err.message})
    }
}
module.exports = {getProfile,getUser,editUser,addFollowing,removeFollowing}


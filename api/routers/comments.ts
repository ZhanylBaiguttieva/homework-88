import {Router} from "express";
import Comment from "../models/Comment";
import auth, {RequestWithUser} from "../middleware/auth";
import {Types} from "mongoose";
import Post from "../models/Post";


const commentsRouter = Router();
commentsRouter.post('/', auth, async(req:RequestWithUser,res,next) => {
    try {

        const commentData = new Comment({
            user: req.user?._id,
            post: req.body.post,
            text: req.body.text,
        });

        await commentData.save();
        res.send({commentData});
    }   catch(e) {
        next(e);
    }
});

commentsRouter.get('/', async(req,res,next) => {
    const postId = req.query.postId as  string;
    const comments = await Comment.find({post: postId}).populate('user', 'username');
    res.send(comments);
});
export default commentsRouter;
import {Router} from "express";
import {imagesUpload} from "../multer";
import Post from "../models/Post";
import auth, {RequestWithUser} from "../middleware/auth";
import {Types} from "mongoose";

const postsRouter = Router();

postsRouter.post(
    '/',
    auth,
    imagesUpload.single('image'),
    async(req: RequestWithUser,res,next) => {
    try {
        const postData = new Post({
            user: req.user?._id,
            title: req.body.title,
            datetime: Date.now(),
            image: req.file ? req.file.filename : null,
        });
        await postData.save();
        res.send({postData});
    }   catch(e) {
        next(e);
    }
});

postsRouter.get('/', async(req,res,next) => {
   const posts = await Post.find().populate('user','username');
   res.send(posts);
});

postsRouter.get('/:id', async(req,res,next) => {
    try {
        let _id: Types.ObjectId;
        try {
            _id = new Types.ObjectId(req.params.id);
        } catch {
            return res.status(404).send({error: 'Wrong ObjectId!'});
        }

        const post = await Post.findById(_id).populate('user','username');
        if (!post) {
            return res.status(404).send({error: 'Not found!'});
        }
        res.send(post);
    } catch (e) {
        next(e);
    }
});
export default postsRouter;
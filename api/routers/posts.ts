import {Router} from "express";
import {imagesUpload} from "../multer";
import Post from "../models/Post";
import auth, {RequestWithUser} from "../middleware/auth";

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

export default postsRouter;
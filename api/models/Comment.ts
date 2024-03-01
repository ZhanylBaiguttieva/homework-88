import mongoose, {Schema, Types} from "mongoose";
import User from "./User";
import Post from "./Post";

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return Boolean(user);
            },
            message: 'User does not exist!',
        },
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const post = await Post.findById(value);
                return Boolean(post);
            },
            message: 'Post does not exist!',
        },
    },
    text: {
        type: String,
        required: true,
    },
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
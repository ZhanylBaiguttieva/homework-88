import mongoose, {Schema, Types} from "mongoose";
import User from "./User";
import bcrypt from "bcrypt";

const PostSchema =  new Schema({
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
    title: {
        type: String,
        required: true,
    },
    description: String,
    datetime: {
        type: Date,
        required: true,
    },
    image: String
});

PostSchema.pre('save', async function (next) {
    const err = new Error('Fill description or browse image!');
    if(this.image === null && this.description === null) {
       next(err);
    }
    next();
});

const Post = mongoose.model('Post', PostSchema);
export default Post;
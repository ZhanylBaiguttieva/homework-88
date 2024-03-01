import mongoose, {Schema, Types} from "mongoose";
import User from "./User";

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
    image: String,

});

const Post = mongoose.model('Post', PostSchema);

export default Post;
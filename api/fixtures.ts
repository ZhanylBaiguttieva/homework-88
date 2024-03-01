import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Post from "./models/Post";
import Comment from "./models/Comment";

const dropCollection = async (
    db: mongoose.Connection,
    collectionName: string,
) => {
    try {
        await db.dropCollection(collectionName);
    } catch (e) {
        console.log(`Collection ${collectionName} was missing, skipping drop...`);
    }
};

const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;
    const collections = ['posts', 'users','comments'];

    for (const collectionName of collections) {
        await dropCollection(db, collectionName);
    }

    const [user1,user2] = await User.create(
        {
            username: 'user',
            password: '111',
            token: 'd1538ebc-1566-4565-a2b4-227db4794953',
        },
        {
            username: 'user2',
            password: '111',
            token: '6eacf8be-37bd-4ae6-bd35-a681aa63ad09',
        }
    );

    const [post1, post2] = await Post.create(
        {
            user: user1,
            title: 'Once upon a time',
            datetime: Date.now(),
            image: 'fixtures/Mike_Wazowski.png',
        },
        {
            user: user2,
            title: 'Diet culture in disguise',
            description:'Eating disorders often have similar underpinnings: a genetic predisposition combined with environmental factors, Rollin said. And often the disorder centers around a set of rigid rules, whether it be calories, timing of eating or the ingredients in food, she added.',
            datetime: Date.now(),
            image: 'fixtures/food.png',
        },
    );

    await Comment.create(
        {
            user: user2,
            post: post1,
            text: 'What happened once upon a time?',
        },
        {
            user: user2,
            post: post1,
            text: 'Who is gonna tell me?',
        },
        {
            user: user1,
            post: post2,
            text: 'Unbelievable!!!',
        },
        {
            user: user1,
            post: post2,
            text: 'For some — but not all — people with orthorexia, their body image may start to hinge on how closely they follow their food rules ',
        },
    )
    await db.close();
};

void run();
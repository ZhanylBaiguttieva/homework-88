import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Post from "./models/Post";

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
    const collections = ['posts', 'users'];

    for (const collectionName of collections) {
        await dropCollection(db, collectionName);
    }

    const user1 = await User.create({
        username: 'user',
        password: '111',
        token: 'd1538ebc-1566-4565-a2b4-227db4794953',
    });

    await Post.create(
        {
            user: user1,
            title: 'Just like that',
            datetime: Date.now(),
            image: 'fixtures/Mike_Wazowski.png',
        },
        {
            user: user1,
            title: 'Just like that',
            datetime: Date.now(),
            image: 'fixtures/Mike_Wazowski.png',
        },
    );

    await db.close();
};

void run();
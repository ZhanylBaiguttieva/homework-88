import {Model} from "mongoose";

export interface UserFields {
    username: string;
    password: string;
    token: string;
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;

export interface Post {
    user: string,
    title: string,
    description: string,
    datetime: string,
    image: string | null,
}

export interface Comment {
    user: string,
    post: string,
    text: string,
}
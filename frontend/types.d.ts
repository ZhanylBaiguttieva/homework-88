export interface User {
  _id: string;
  username: string;
  token: string;
}
export  interface GlobalError {
  error: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface Post {
  _id: string;
  title: string;
  datetime: string;
  image: string | null;
  user: User;
}

export interface PostMutation {
  title: string;
  description: string;
  image: File | null;
  user: string;
}

export interface PostInfo {
  _id: string;
  title: string;
  description: string;
  datetime: string;
  image: string | null;
  user: User;
}

export interface CommentMutation {
  text: string;
  post: string;
  user: string;
}

export interface Comment {
  _id: string;
  user: User;
  post: string;
  text: string;
}
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi.ts';
import { PostMutation } from '../../../types';
import { RootState } from '../../app/store.ts';

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async() => {
    const postsResponse = await axiosApi.get('/posts');
    return postsResponse.data;
  }
);

export const createPost = createAsyncThunk<void, PostMutation,{state: RootState}>(
  'posts/create',
  async (postMutation, {getState}) => {

    const token = getState().users.user?.token;
    const formData = new FormData();

    const keys = Object.keys(postMutation) as (keyof PostMutation)[];
    keys.forEach(key => {
      const value = postMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    return axiosApi.post('/posts', formData, {headers: {'Authorization': 'Bearer ' + token}});
  }
);
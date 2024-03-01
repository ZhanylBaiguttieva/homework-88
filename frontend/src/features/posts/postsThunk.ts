import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi.ts';

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async() => {
    const postsResponse = await axiosApi.get('/posts');
    return postsResponse.data;
  }
);

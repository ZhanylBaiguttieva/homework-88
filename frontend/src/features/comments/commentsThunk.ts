import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi.ts';
import { Comment, CommentMutation } from '../../../types';
import { RootState } from '../../app/store.ts';

export const fetchComments = createAsyncThunk<Comment[],string>(
  'comments/fetch',
  async(postId) => {
    const response = await axiosApi.get('/comments/?postId=' + postId);
    const comments = response.data;
    if (!comments) {
      return [];
    }
    return comments;
  }
);

export const createComment = createAsyncThunk<void,CommentMutation,{state: RootState}>(

  'comments/create',
  async(commentData,{getState}) => {
    const token = getState().users.user?.token;
    return axiosApi.post('/comments', commentData, {headers: {'Authorization': 'Bearer ' + token}});
  }
);
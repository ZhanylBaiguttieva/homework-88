import { Post, PostInfo } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createPost, fetchOnePost, fetchPosts } from './postsThunk.ts';
import { RootState } from '../../app/store.ts';

interface PostsState {
  items: Post[];
  post: PostInfo | null,
  fetchLoading: boolean;
  createLoading: boolean;
  fetchOneLoading: boolean;
}

const initialState: PostsState = {
  items: [],
  post: null,
  fetchLoading: false,
  createLoading: false,
  fetchOneLoading: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, {payload: posts}) => {
      state.fetchLoading = false;
      state.items = posts;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(createPost.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createPost.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createPost.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(fetchOnePost.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchOnePost.fulfilled, (state, {payload: post}) => {
      state.fetchLoading = false;
      state.post = post;
    });
    builder.addCase(fetchOnePost.rejected, (state) => {
      state.fetchLoading = false;
    });
  },
});

export const postsReducer = postsSlice.reducer;
export const selectPosts = (state:RootState) => state.posts.items;
export const selectPost = (state: RootState) => state.posts.post;
export const selectPostsLoading = (state:RootState) => state.posts.fetchLoading;
export const selectPostCreating = (state:RootState) => state.posts.createLoading;
export const selectOnePostLoading = (state:RootState) => state.posts.fetchOneLoading;
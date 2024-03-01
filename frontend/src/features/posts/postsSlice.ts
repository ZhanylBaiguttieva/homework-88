import { Post } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from './postsThunk.ts';
import { RootState } from '../../app/store.ts';

interface PostsState {
  items: Post[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: PostsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
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

    // builder.addCase(createProduct.pending, (state) => {
    //   state.createLoading = true;
    // });
    // builder.addCase(createProduct.fulfilled, (state) => {
    //   state.createLoading = false;
    // });
    // builder.addCase(createProduct.rejected, (state) => {
    //   state.createLoading = false;
    // });
  },
});

export const postsReducer = postsSlice.reducer;
export const selectPosts = (state:RootState) => state.posts.items;
export const selectPostsLoading = (state:RootState) => state.posts.fetchLoading;
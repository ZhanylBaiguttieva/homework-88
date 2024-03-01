import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useEffect } from 'react';
import { selectPosts, selectPostsLoading } from '../postsSlice.ts';
import { fetchPosts } from '../postsThunk.ts';
import { CircularProgress, Grid, Typography } from '@mui/material';
import PostItem from './PostItem.tsx';


const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const isLoading = useAppSelector(selectPostsLoading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  let postsArea: React.ReactNode = <CircularProgress/>;
  if(!isLoading && posts) {
    postsArea = posts.map(post => (
      <PostItem
        key={post._id}
        post={post}
      />
    ));
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">Posts</Typography>
      </Grid>
      <Grid item container spacing={2}>
        {postsArea}
      </Grid>
    </Grid>
  );
};

export default Posts;
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectOnePostLoading, selectPost } from '../postsSlice.ts';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { fetchOnePost } from '../postsThunk.ts';
import { Alert, Box, Card, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { apiURL } from '../../../../constants.ts';
import CommentForm from '../../comments/components/CommentForm.tsx';
import { CommentMutation } from '../../../../types';
import { createComment, fetchComments } from '../../comments/commentsThunk.ts';
import Comments from '../../comments/components/Comments.tsx';
import { selectUser } from '../../users/usersSlice.ts';
import ForumIcon from '@mui/icons-material/Forum';

const PostInfo = () => {

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const post = useAppSelector(selectPost);
  const isOneLoading = useAppSelector(selectOnePostLoading);
  const {id} = useParams() as {id: string};

  const currentDate = dayjs(post?.datetime);
  const formattedDate = currentDate.format('YYYY-MM-DD HH:mm:ss');

  const cardImage = apiURL + '/' + post?.image;

  useEffect(() => {
    dispatch(fetchOnePost(id));
    dispatch(fetchComments(id));
  }, [dispatch, id]);


  const onFormSubmit = async (commentMutation: CommentMutation) => {
    await dispatch(createComment(commentMutation)).unwrap();
  };

  let postInfo: React.ReactNode;
  if(!isOneLoading && post) {
    postInfo = (
      <Stack maxWidth={500}>
        <Card sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Posted on {formattedDate} by <strong>{post.user.username}</strong>
              </Typography>
              <Typography variant="subtitle1" color="text.primary">
                <strong>{post.title}</strong>
              </Typography>
              <Typography variant="subtitle1" color="text.primary">
                {post.description}
              </Typography>
              {post.image ? (
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={cardImage}
                />
              ) : (
                <Grid>
                  <ForumIcon style={{fontSize: '600%'}}/>
                </Grid>
              )}
            </CardContent>
          </Box>
        </Card>
          {user ? (
            <Box m={2} maxWidth={500} >
              <CommentForm onSubmit={onFormSubmit}/>
            </Box>
          ) : (
            <Box m={2} maxWidth={500}>
              <Alert severity="info">
                To comment this post, please, login or register!
              </Alert>
            </Box>
          )}
        <Stack spacing={2} m={2}>
          <Comments/>
        </Stack>
      </Stack>
    );
  }
  return (
    <Stack>
        {postInfo}
    </Stack>
  );
};

export default PostInfo;
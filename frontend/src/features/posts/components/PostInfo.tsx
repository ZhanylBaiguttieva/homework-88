import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectOnePostLoading, selectPost } from '../postsSlice.ts';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { fetchOnePost } from '../postsThunk.ts';
import { Box, Card, CardContent, CardMedia,Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import { apiURL } from '../../../../constants.ts';

const PostInfo = () => {
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPost);
  const isOneLoading = useAppSelector(selectOnePostLoading);
  const {id} = useParams() as {id: string};

  const currentDate = dayjs(post?.datetime);
  const formattedDate = currentDate.format('YYYY-MM-DD HH:mm:ss');

  let cardImage = imageNotAvailable;
  if (post?.image) {
    cardImage = apiURL + '/' + post.image;
  }

  useEffect(() => {
    dispatch(fetchOnePost(id));
  }, [dispatch, id]);

  let postInfo: React.ReactNode;
  if(!isOneLoading && post) {
    postInfo = (
      <Grid>
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
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={cardImage}
          />
        </Card>
      </Grid>
    );
  }
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container spacing={2}>
        {postInfo}
      </Grid>
    </Grid>
  );
};

export default PostInfo;
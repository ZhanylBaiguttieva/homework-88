import { Post } from '../../../../types';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material';
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import { apiURL } from '../../../../constants.ts';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import dayjs from 'dayjs';

interface Props {
  post: Post
}
const PostItem: React.FC<Props> = ({post}) => {
  const currentDate = dayjs(post.datetime);
  const formattedDate = currentDate.format('YYYY-MM-DD HH:mm:ss');

  let cardImage = imageNotAvailable;

  if (post.image) {
    cardImage = apiURL + '/' + post.image;
  }
  return (
    <Grid item sm md={6} lg={4}>
      <Card sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Posted on {formattedDate} by <strong>{post.user.username}</strong>
            </Typography>
            <Typography variant="subtitle1" color="text.primary" component={RouterLink} to={'/posts/' + post._id}>
              {post.title}
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
};

export default PostItem;

import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Comment} from '../../../../types';
interface Props {
  comment: Comment;
}
const CommentItem: React.FC<Props> = ({comment}) => {

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {comment.user?.username} said:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {comment.text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CommentItem;
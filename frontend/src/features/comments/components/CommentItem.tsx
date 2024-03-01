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
        <Typography variant="subtitle1" color="text.secondary" component="div">
          <strong>{comment.user?.username}:</strong> "{comment.text}"
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CommentItem;
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectComments, selectCommentsLoading } from '../commentsSlice.ts';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchComments } from '../commentsThunk.ts';
import { CircularProgress, Stack } from '@mui/material';
import CommentItem from './CommentItem.tsx';


const Comments = () => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const {id} = useParams() as {id: string};
  const commentsLoading = useAppSelector(selectCommentsLoading);

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  let commentsArea: React.ReactNode = <CircularProgress/>;
  if(!commentsLoading && comments) {
    commentsArea = comments.map(comment => (
      <CommentItem
        key={comment._id}
        comment={comment}
      />
    ));
  }
  return (
    <Stack spacing={1}>
      {commentsArea}
    </Stack>

  );
};

export default Comments;
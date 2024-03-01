import { CommentMutation} from '../../../../types';
import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks.ts';
import { selectCommentCreating } from '../commentsSlice.ts';


interface Props {
  onSubmit: (mutation: CommentMutation) => void;
}
const CommentForm:React.FC<Props> = ({onSubmit}) => {
  const isCreating = useAppSelector(selectCommentCreating);
  const {id} = useParams() as {id: string};
  const [state, setState] = useState<CommentMutation>({
    text: '',
    post: id,
    user: '',
  });
  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="text" label="Text"
            value={state.text}
            onChange={inputChangeHandler}
            name="text"
            required
          />
        </Grid>
        <Grid item xs>
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            loading={isCreating}
            disabled={isCreating}
          >
            Send comment
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default CommentForm;
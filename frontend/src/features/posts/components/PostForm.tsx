import { PostMutation } from '../../../../types';
import { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import FileInput from '../../../UI/FileInput.tsx';

interface Props {
  onSubmit: (mutation: PostMutation) => void;
}
const PostForm:React.FC<Props> = ({onSubmit}) => {

  const [state, setState] = useState<PostMutation>({
    title: '',
    description: '',
    image: null,
    user: ''
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

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2}>

        <Grid item xs>
          <TextField
            id="title" label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline rows={3}
            id="description" label="Description"
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Image"
            name="image"
            onChange={fileInputChangeHandler}
          />
        </Grid>

        <Grid item xs>
          <Button type="submit" color="primary" variant="contained">Create post</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PostForm;
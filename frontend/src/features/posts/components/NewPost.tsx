import { useAppDispatch } from '../../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { PostMutation } from '../../../../types';
import { createPost } from '../postsThunk.ts';
import PostForm from './PostForm.tsx';


const NewPost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (postMutation: PostMutation) => {
      await dispatch(createPost(postMutation)).unwrap();
      navigate('/');
  };
  return (
    <>
        <PostForm onSubmit={onFormSubmit} />
    </>
  );
};

export default NewPost;
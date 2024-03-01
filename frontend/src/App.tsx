
import { Container, CssBaseline } from '@mui/material';
import AppToolBar from './UI/AppToolBar.tsx';
import { Route, Routes } from 'react-router-dom';
import Register from './features/users/Register.tsx';
import Login from './features/users/Login.tsx';
import Posts from './features/posts/components/Posts.tsx';
import NewPost from './features/posts/components/NewPost.tsx';

function App() {

  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolBar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Posts />} />
            <Route path="/new-post" element={<NewPost />}></Route>
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;

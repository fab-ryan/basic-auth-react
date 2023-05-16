
import { Outlet, Route, Routes } from 'react-router-dom';
import Layout from './layouts/index';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LayoutRouter />}>
          <Route path='/' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

const LayoutRouter = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

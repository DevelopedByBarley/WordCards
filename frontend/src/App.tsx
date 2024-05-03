import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

//import axios from 'axios';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Welcome from './pages/Welcome';
import { ThemeContextProvider } from './contexts/ThemeContext';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Dashboard from './pages/user/Dashboard';
import { UserContextProvider } from './contexts/UserContext';
import AddTheme from './pages/themes/AddTheme';
import ThemeCards from './pages/themes/ThemeCards';
import Themes from './pages/themes/Themes';
import Profile from './pages/user/Profile';
import CardList from './pages/cards/CardList';
import CardForm from './pages/cards/CardForm';




const router = createBrowserRouter(
  createRoutesFromElements(<Route element={<MainLayout />} >
    <Route path='/' element={<Welcome />} />
    <Route path='user'>
      <Route path='' element={<Profile />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='dashboard' element={<Dashboard />} />
    </Route>
    <Route path='cards'>
      <Route path='' element={<CardList />} />
      <Route path='store' element={<CardForm />} />
      <Route path='update/:cardId' element={<CardForm />} />
    </Route>
    <Route path='themes'>
      <Route path='' element={<Themes />} />
      <Route path='cards/:id' element={<ThemeCards />} />
      <Route path='store' element={<AddTheme />} />
    </Route>
  </Route>)
);

function App() {
  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </ThemeContextProvider>
  )
}

export default App

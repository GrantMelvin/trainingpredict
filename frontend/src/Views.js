import {Routes, Route} from 'react-router' ;

import Home from './pages/Home';
import Register from './pages/entry/Register'
import Login from './pages/entry/Login'
import { useContext } from 'react';
import { AccountContext } from './AccountContext';
import PrivateRoutes from './PrivateRoutes';


const Views = () => {
  const {user} = useContext(AccountContext) ;
  return user.loggedIn === null ? (
    ""
  ): (
  <Routes>
    <Route path="/Login" element={<Login />} ></Route>
    <Route path="/Register" element={<Register />} />
      <Route element={<PrivateRoutes/>}>
        <Route path="/Home" element={<Home/>}/>
      </Route>
    <Route path="*" element={<Login />} />
  </Routes>
);
};

export default Views;
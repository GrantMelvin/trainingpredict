import {Routes, Route} from 'react-router' ;

import Home from './pages/home';

const Views = () => {

    return (
        <Routes>
          <Route path="*" element={<Home/>} />

        </Routes>
    )
};

export default Views;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import { Provider } from 'react-redux';
import { configStore } from './Redux/Store/Store';


function App() {
  const store = configStore();
  return (
   <>
   <Provider store={store}>
   <Routes>
    <Route exact path='/*' element = {<UserRoutes/>}/>
    <Route exact path='/admin/*' element = {<AdminRoutes/>}/>
   </Routes>
   </Provider>
   
   </>
  );
}

export default App;

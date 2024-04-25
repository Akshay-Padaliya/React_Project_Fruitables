
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import { Provider } from 'react-redux';
import { configStore } from './Redux/Store/Store';
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from './Context/ThemeContex';



function App() {
  const { store, persistor } = configStore();
  return (

    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route exact path='/*' element={<UserRoutes />} />
            <Route exact path='/admin/*' element={<AdminRoutes />} />
          </Routes>
        </PersistGate>
      </Provider>
    </ThemeProvider>


  );
}

export default App;

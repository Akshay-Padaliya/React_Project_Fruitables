
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import { Provider } from 'react-redux';
import { configStore } from './Redux/Store/Store';
import { PersistGate } from 'redux-persist/integration/react'


function App() {
  const { store, persistor } = configStore();
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route exact path='/*' element={<UserRoutes />} />
            <Route exact path='/admin/*' element={<AdminRoutes />} />
          </Routes>
        </PersistGate>
      </Provider>

    </>
  );
}

export default App;


import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import { Provider } from 'react-redux';
import { configStore } from './Redux/Store/Store';
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from './Context/ThemeContex';
import { ContactProvider } from './Context/ContactContex';



function App() {
  const { store, persistor } = configStore();
  return (
    <ContactProvider>
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
    </ContactProvider>


  );
}

export default App;

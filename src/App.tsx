import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store';
import Layout from './components/Layout';
import Home from './pages/Home';
import Details from './pages/Detail';
import Favorites from './pages/Favorite';

function App() { //Odpowiada za konfigurację Redux\ Routera oraz główny układ stron
  return ( //Provider udostępnia Redux store całej aplikacji
    <Provider store={store}>  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="details/:city" element={<Details />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
import {Home} from './pages/Home';
import {NewRoom} from './pages/NewRoom';

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AuthContextProvider } from './contexts/AuthContext'


function App() {

  return (
    <div>
      <BrowserRouter>
          <Routes>
            <AuthContextProvider>
            <Route path="/" element={<Home />} />
            <Route path="/rooms/new" element={<NewRoom />} />
            </AuthContextProvider>
          </Routes>
      </BrowserRouter>
   </div>
  );
}

export default App;

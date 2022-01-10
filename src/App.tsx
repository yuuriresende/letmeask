import {Home} from './pages/Home';
import {NewRoom} from './pages/NewRoom';

import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/rooms/new" element={<NewRoom />} />
        </Routes>
      </BrowserRouter>
   </div>
  );
}

export default App;

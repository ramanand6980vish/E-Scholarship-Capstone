import './App.css';
import Navbar from './Components/Navbar';
import Carousel from './Components/Carousel';
import Footer from './Components/Footer';
import HomePage from './Components/HomePage';
import OTR from './Components/OTR';
import Login from './Components/Login';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrackApplication from './Components/TrackApplication';
import HelpDesk from './Components/HelpDesk';
import StudentDashboard from './Components/StudentDashboard';

function App() {

return (

<Router>

<Navbar/>

<Routes>

<Route path="/" element={
<>
<Carousel/>
<HomePage/>
</>
} />

<Route path="/otr" element={<OTR/>} />

<Route path="/login" element={<Login/>} />
<Route path="/track" element={<TrackApplication/>} />
<Route path="/help" element={<HelpDesk  />} />
<Route path="/StudentDashboard" element={<StudentDashboard  />} />

</Routes>

<Footer/>

</Router>

);

}

export default App;
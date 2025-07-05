import './App.css';
import Sidebar from './pages/sidebar.tsx';
import { enrutamiento as Enrutamiento } from './enrutamiento.tsx';
import { useLocation } from 'react-router-dom'; // Import useLocation

function App() {
  const location = useLocation(); // Get the current location
  const noSidebarPaths = ['/', '/login', '/registro']; // Define paths where Sidebar should not appear

  return (
    <>
      {/* Conditionally render Sidebar */}
      {!noSidebarPaths.includes(location.pathname) && <Sidebar />}
      <div className='container'>
        <Enrutamiento />
      </div>
    </>
  );
}

export default App;
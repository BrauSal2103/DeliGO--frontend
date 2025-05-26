import './App.css'
import Sidebar from './pages/sidebar.tsx'
import { enrutamiento as Enrutamiento } from './enrutamiento.tsx'

function App() {
  return (
    <>
    <Sidebar/>
      <div className='container'>
        <Enrutamiento/>
      </div>
    </>
  )
}

export default App

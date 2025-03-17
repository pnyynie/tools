import './App.scss';
import Router from '@/router';
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useSelector } from 'react-redux';

function App() {
  const theme = useSelector(state => state.global.theme);

  return (
    <div className="app z-0" data-bs-theme={theme}>
      <Topbar />
      <div className="app-container">
        <Sidebar />
        <div className="app-container-content">
          <Navbar />
          <div className="content-wrapper">
            <div className="content-inner-wrapper">
              <Router />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

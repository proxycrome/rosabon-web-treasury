import logo from './logo.svg';
import PageRoutes from './PageRoutes';

import PersonalProfile from './pages/PersonalProfile';
import CompanyProfile from './pages/CompanyProfile';
import Profile from './pages';
import Authentication from './component/Auth';
import CompanyDetails from './component/dashboard/CompanyUpdate';
import ProfileView from './pages/ProfileView';

function App() {
  return (
    <div className="App">
      <PageRoutes />
    </div>
  );
}

export default App;

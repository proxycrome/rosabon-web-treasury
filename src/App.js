import logo from './logo.svg';
import PageRoutes from './PageRoutes';

import PersonalProfile from './pages/PersonalProfile';
import CompanyProfile from './pages/CompanyProfile';
import Profile from './pages';
import Authentication from './component/Auth';
import CompanyDetails from './component/dashboard/CompanyKYC';
import ProfileView from './pages/KYC/KYC';
import HomeView from './component/Plan/HomeView';
import CreatePlan from './component/Plan/CreatePlan';
import { PlanForm } from './component/Plan/PlanForm';
import PlanHome from './component/Plan';
import { NairaCard } from './component/Plan/Accesssories';
import { Plans } from './component/Plan/Plans';
import PlanPayment from './component/Plan/PlanPayment';

function App() {
  return (
    <div className="App">
      <HomeView />
    </div>
  );
}

export default App;

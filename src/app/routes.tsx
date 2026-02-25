import { createBrowserRouter } from 'react-router';
import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { OnboardingGoal } from './pages/onboarding/Goal';
import { OnboardingPeriod } from './pages/onboarding/Period';
import { OnboardingWater } from './pages/onboarding/Water';
import { OnboardingHabits } from './pages/onboarding/Habits';
import { ProfileCycle } from './pages/profile/gynecological/Cycle';
import { ProfileContraceptive } from './pages/profile/gynecological/Contraceptive';
import { ProfilePregnancy } from './pages/profile/gynecological/Pregnancy';
import { ProfileIntimateHealth } from './pages/profile/gynecological/IntimateHealth';
import { ProfileMedicalHistory } from './pages/profile/gynecological/MedicalHistory';
import { ProfileSharing } from './pages/profile/gynecological/Sharing';
import { Dashboard } from './pages/Dashboard';
import { Pricing } from './pages/Pricing';
import { Upgrade } from './pages/Upgrade';
import { Cycle } from './pages/Cycle';
import { Routine } from './pages/Routine';
import { Messages } from './pages/Messages';
import { Profile } from './pages/Profile';
import { DoctorDashboard } from './pages/doctor/DoctorDashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Welcome,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/signup',
    Component: Signup,
  },
  {
    path: '/onboarding/goal',
    Component: OnboardingGoal,
  },
  {
    path: '/onboarding/period',
    Component: OnboardingPeriod,
  },
  {
    path: '/onboarding/water',
    Component: OnboardingWater,
  },
  {
    path: '/onboarding/habits',
    Component: OnboardingHabits,
  },
  {
    path: '/profile/gynecological/cycle',
    Component: ProfileCycle,
  },
  {
    path: '/profile/gynecological/contraceptive',
    Component: ProfileContraceptive,
  },
  {
    path: '/profile/gynecological/pregnancy',
    Component: ProfilePregnancy,
  },
  {
    path: '/profile/gynecological/intimate-health',
    Component: ProfileIntimateHealth,
  },
  {
    path: '/profile/gynecological/medical-history',
    Component: ProfileMedicalHistory,
  },
  {
    path: '/profile/gynecological/sharing',
    Component: ProfileSharing,
  },
  {
    path: '/dashboard',
    Component: Dashboard,
  },
  {
    path: '/pricing',
    Component: Pricing,
  },
  {
    path: '/upgrade',
    Component: Upgrade,
  },
  {
    path: '/cycle',
    Component: Cycle,
  },
  {
    path: '/routine',
    Component: Routine,
  },
  {
    path: '/messages',
    Component: Messages,
  },
  {
    path: '/profile',
    Component: Profile,
  },
  {
    path: '/doctor/dashboard',
    Component: DoctorDashboard,
  },
]);
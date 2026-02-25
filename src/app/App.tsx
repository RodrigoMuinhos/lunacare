import { RouterProvider } from 'react-router';
import { router } from './routes';
import { UserProvider } from './context/UserContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { NotificationToast } from './components/NotificationToast';
import { MobileLayout } from './components/MobileLayout';

export default function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <MobileLayout>
          <RouterProvider router={router} />
          <NotificationToast />
        </MobileLayout>
      </NotificationProvider>
    </UserProvider>
  );
}
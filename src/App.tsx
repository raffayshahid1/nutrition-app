
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { UserSelector } from './components/UserSelector';
import { ProfileForm } from './components/ProfileForm';
import { Dashboard } from './components/Dashboard';

import { ProfileSettings } from './components/ProfileSettings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UserSelector />} />
          <Route path="create-profile" element={<ProfileForm />} />
          <Route path="edit-profile" element={<ProfileForm />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

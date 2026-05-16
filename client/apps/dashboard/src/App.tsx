// ─── Dashboard App — Root View (Elm Architecture) ─────────────
// Routes: / → Dashboard, /batches → Batch List,
//         /batches/:id → Batch Detail, /alerts → Alerts Page

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './view/Layout';
import { DashboardPage } from './view/DashboardPage';
import { BatchListPage } from './view/BatchListPage';
import { BatchDetailPage } from './view/BatchDetailPage';
import { AlertsPage } from './view/AlertsPage';
import { DemoLayout } from './view/demo/DemoLayout';
import { DemoSensorPage } from './view/demo/DemoSensorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/demo" element={<DemoLayout />}>
          <Route index element={<DemoSensorPage />} />
          <Route path=":id" element={<DemoSensorPage />} />
        </Route>
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/batches" element={<BatchListPage />} />
                <Route path="/batches/:id" element={<BatchDetailPage />} />
                <Route path="/alerts" element={<AlertsPage />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// ─── Dashboard App — Root View (Elm Architecture) ─────────────
// Routes: / → Dashboard, /batches → Batch List, /batches/new → New Batch,
//         /batches/:id → Batch Detail, /alerts → Alerts Page

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './view/Layout';
import { DashboardPage } from './view/DashboardPage';
import { BatchListPage } from './view/BatchListPage';
import { BatchDetailPage } from './view/BatchDetailPage';
import { NewBatchPage } from './view/NewBatchPage';
import { AlertsPage } from './view/AlertsPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/batches" element={<BatchListPage />} />
          <Route path="/batches/new" element={<NewBatchPage />} />
          <Route path="/batches/:id" element={<BatchDetailPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

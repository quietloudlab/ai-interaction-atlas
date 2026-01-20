import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ErrorFallback } from './components/ErrorFallback';
import { preloadAtlasData } from './lib/dataLoader';

// Lazy load route components
const MarketingLayout = lazy(() => import('./features/marketing/components/MarketingLayout').then(m => ({ default: m.MarketingLayout })));
const AtlasLayout = lazy(() => import('./features/atlas/components/AtlasLayout').then(m => ({ default: m.AtlasLayout })));
const LandingPage = lazy(() => import('./features/marketing/components/LandingPage').then(m => ({ default: m.LandingPage })));
const RationalePage = lazy(() => import('./features/marketing/components/RationalePage').then(m => ({ default: m.RationalePage })));
const HomeDashboard = lazy(() => import('./features/atlas/components/HomeDashboard').then(m => ({ default: m.HomeDashboard })));
const TaskDetail = lazy(() => import('./features/atlas/components/TaskDetail').then(m => ({ default: m.TaskDetail })));
const LayerDetail = lazy(() => import('./features/atlas/components/LayerDetail').then(m => ({ default: m.LayerDetail })));
const DataArtifactsPage = lazy(() => import('./features/atlas/components/DataArtifactsPage').then(m => ({ default: m.DataArtifactsPage })));
const ConstraintsPage = lazy(() => import('./features/atlas/components/ConstraintsPage').then(m => ({ default: m.ConstraintsPage })));
const TouchpointsPage = lazy(() => import('./features/atlas/components/TouchpointsPage').then(m => ({ default: m.TouchpointsPage })));
const TaskCategoryPage = lazy(() => import('./features/atlas/components/TaskCategoryPage').then(m => ({ default: m.TaskCategoryPage })));
const QuickReference = lazy(() => import('./features/atlas/components/QuickReference').then(m => ({ default: m.QuickReference })));

// Loading fallback
const LoadingFallback = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-[#F0F0EE]">
    <div className="text-gray-600">Loading...</div>
  </div>
);

import { atlasService } from './services/atlasService';

// Wrapper components that extract params
function TaskDetailRoute() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  return (
    <TaskDetail
      taskId={taskId!}
      onTaskClick={(id) => navigate(`/atlas/task/${id}`)}
      onBack={() => navigate(-1)}
    />
  );
}

function LayerDetailRoute() {
  const { layerId } = useParams<{ layerId: string }>();
  const navigate = useNavigate();

  return (
    <LayerDetail
      layerId={layerId!}
      onBack={() => navigate(-1)}
      onTaskClick={(id) => navigate(`/atlas/task/${id}`)}
    />
  );
}

// Atlas Routes Wrapper
function AtlasRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const getActiveTaskId = () => {
    const match = pathname.match(/\/atlas\/task\/([^/]+)/);
    return match ? match[1] : null;
  };

  const getActivePage = () => {
    if (pathname.includes('/atlas/data')) return 'data';
    if (pathname.includes('/atlas/constraints')) return 'constraints';
    if (pathname.includes('/atlas/touchpoints')) return 'touchpoints';
    if (pathname.includes('/atlas/reference')) return 'reference';
    if (pathname.includes('/atlas/ai')) return 'ai';
    if (pathname.includes('/atlas/human')) return 'human';
    if (pathname.includes('/atlas/system')) return 'system';
    return 'dashboard';
  };

  const handleNavigate = (type: 'task' | 'layer' | 'data' | 'constraints' | 'touchpoints' | 'reference' | 'dashboard' | 'ai' | 'human' | 'system', id?: string) => {
    if (type === 'task' && id) navigate(`/atlas/task/${id}`);
    else if (type === 'layer' && id) navigate(`/atlas/layer/${id}`);
    else if (type === 'data') navigate('/atlas/data');
    else if (type === 'constraints') navigate('/atlas/constraints');
    else if (type === 'touchpoints') navigate('/atlas/touchpoints');
    else if (type === 'reference') navigate('/atlas/reference');
    else if (type === 'ai') navigate('/atlas/ai');
    else if (type === 'human') navigate('/atlas/human');
    else if (type === 'system') navigate('/atlas/system');
    else navigate('/atlas');
  };

  return (
    <AtlasLayout
      activeTaskId={getActiveTaskId()}
      activeView="atlas"
      activeAtlasPage={getActivePage()}
      onSelectTask={(id) => {
        if (id === 'ROOT') {
          navigate('/atlas');
        } else {
          navigate(`/atlas/task/${id}`);
        }
      }}
      onNavigateAtlas={(page) => handleNavigate(page)}
      onSelectView={(view) => {
        if (view === 'landing') navigate('/');
        else navigate(`/${view}`);
      }}
    >
      <div className="px-6 lg:px-12 py-12 lg:py-16">
        <ErrorBoundary
          fallback={
            <ErrorFallback
              title="Content Error"
              message="We encountered an error loading this content."
              onRetry={() => navigate('/atlas')}
              compact
            />
          }
        >
          <Routes>
            <Route path="/" element={<HomeDashboard onNavigate={handleNavigate} />} />
            <Route path="task/:taskId" element={<TaskDetailRoute />} />
            <Route path="layer/:layerId" element={<LayerDetailRoute />} />
            <Route path="data" element={<DataArtifactsPage />} />
            <Route path="constraints" element={<ConstraintsPage />} />
            <Route path="touchpoints" element={<TouchpointsPage />} />
            <Route path="reference" element={<QuickReference />} />
            <Route path="ai" element={<TaskCategoryPage type="ai" onTaskClick={(id) => navigate(`/atlas/task/${id}`)} />} />
            <Route path="human" element={<TaskCategoryPage type="human" onTaskClick={(id) => navigate(`/atlas/task/${id}`)} />} />
            <Route path="system" element={<TaskCategoryPage type="system" onTaskClick={(id) => navigate(`/atlas/task/${id}`)} />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </AtlasLayout>
  );
}

// Marketing pages wrapper
function MarketingPageRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <MarketingLayout onNavigate={(page) => {
      if (page === 'atlas') navigate('/atlas');
      else if (page === 'landing') navigate('/');
      else navigate(`/${page}`);
    }}>
      {children}
    </MarketingLayout>
  );
}

// Main App
export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    preloadAtlasData();
  }, []);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Marketing Pages */}
        <Route path="/" element={
          <MarketingPageRoute>
            <LandingPage onNavigate={(page) => {
              if (page === 'atlas') navigate('/atlas');
              else navigate(`/${page}`);
            }} />
          </MarketingPageRoute>
        } />

        <Route path="/rationale" element={
          <MarketingPageRoute>
            <RationalePage onNavigate={(page) => {
              if (page === 'atlas') navigate('/atlas');
              else if (page === 'landing') navigate('/');
              else navigate(`/${page}`);
            }} />
          </MarketingPageRoute>
        } />

        {/* Atlas Routes */}
        <Route path="/atlas/*" element={<AtlasRoutes />} />
      </Routes>
    </Suspense>
  );
}

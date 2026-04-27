import { useEffect, useMemo, useState } from 'react';
import HomePage from './pages/HomePage';
import EnglishDetailPage from './pages/EnglishDetailPage';
import SelectedPage from './pages/SelectedPage';
import MyPage from './pages/MyPage';
import HandwritingPage from './pages/HandwritingPage';

type Route = 'home' | 'english-detail' | 'selected' | 'my-page' | 'handwriting';

function routeFromHash(hash: string): Route {
  const normalized = (hash || '').trim();
  if (!normalized || normalized === '#' || normalized === '#/') return 'home';

  // Route format: "#/english-detail" | "#/selected" | "#/my-page"
  if (normalized.startsWith('#/')) {
    const path = normalized.slice(2).split('#')[0]; // strip "#/..." and any extra fragment
    if (path === '' || path === '/') return 'home';
    if (path === 'english-detail') return 'english-detail';
    if (path === 'selected') return 'selected';
    if (path === 'my-page') return 'my-page';
    if (path === 'handwriting') return 'handwriting';
    return 'home';
  }

  // In-page anchors (e.g. "#popular") should still show Home.
  return 'home';
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => routeFromHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(routeFromHash(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const page = useMemo(() => {
    if (route === 'english-detail') return <EnglishDetailPage />;
    if (route === 'selected') return <SelectedPage />;
    if (route === 'my-page') return <MyPage />;
    if (route === 'handwriting') return <HandwritingPage />;
    return <HomePage />;
  }, [route]);

  useEffect(() => {
    // Ensure the new page is visible from the top.
    window.scrollTo(0, 0);
  }, [route]);

  return page;
}

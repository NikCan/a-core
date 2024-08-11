import { routeConfig } from '@/assets';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './RequireAuth';

export function AppRouter() {
  return (
    <Routes>
      {Object.values(routeConfig).map((route) => (
        <Route
          element={
            route.authOnly ? (
              <RequireAuth>{route.element}</RequireAuth>
            ) : (
              route.element
            )
          }
          path={route.path}
          key={route.path}
        />
      ))}
    </Routes>
  );
}

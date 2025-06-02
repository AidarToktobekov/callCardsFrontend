import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Typography } from '@mui/material';
import Layout from './Components/Layout/Layout.jsx';
import ProtectedRoute from './Components/ProtactedRoute/ProtactedRoute.jsx';
import { useAppSelector } from './app/hooks.js';
import { selectUser } from './features/user/userSlice.js';
import { lazy, Suspense } from 'react';

function App() {
  const user = useAppSelector(selectUser);

  const CreateCard = lazy(
    () => import('./Containers/CreateCard/CreateCard.jsx')
  );
  const StatsByEmployees = lazy(
    () => import('./Containers/Reports/StatsByEmployees.jsx')
  );
  const UserLogin = lazy(() => import('./Containers/UserLogin/UserLogin.jsx'));
  const UserRegister = lazy(
    () => import('./Containers/UserRegister/UserRegister.jsx')
  );
  const CardsList = lazy(() => import('./Containers/Reports/CardsList.jsx'));
  const StatsByReasons = lazy(
    () => import('./Containers/Reports/StatsByReasons.jsx')
  );
  const StatsBySolutions = lazy(
    () => import('./Containers/Reports/StatsBySolutions.jsx')
  );
  const StatsByRepeatedCalls = lazy(
    () => import('./Containers/Reports/StatsByRepeatedCalls.jsx')
  );
  const StatsByInactivesUsers = lazy(
    () => import('./Containers/Reports/StatsByInactivesUsers.jsx')
  );
  const SolutionReasonLists = lazy(
    () => import('./Containers/SolutionsAndReasons/SolutionReasonLists.jsx')
  );
  const CreateReason = lazy(
    () => import('./Containers/SolutionsAndReasons/CreateReason.jsx')
  );
  const CreateSolution = lazy(
    () => import('./Containers/SolutionsAndReasons/CreateSolution.jsx')
  );
  const Employees = lazy(() => import('./Containers/Employees/Employees.jsx'));
  const EditEmployees = lazy(
    () => import('./Containers/Employees/EditEmployees.jsx')
  );

  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Suspense fallback={<></>}>
                  <ProtectedRoute isAllowed={user} protectionType={'auth'}>
                    <CreateCard />
                  </ProtectedRoute>
                </Suspense>
              </>
            }
          />
          <Route
            path="/stats_by_employees"
            element={
              <>
                <Suspense fallback={<></>}>
                  <ProtectedRoute isAllowed={user} protectionType={'admin'}>
                    <StatsByEmployees />
                  </ProtectedRoute>
                </Suspense>
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Suspense fallback={<></>}>
                  <UserLogin></UserLogin>
                </Suspense>
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Suspense fallback={<></>}>
                  <ProtectedRoute isAllowed={user} protectionType={'admin'}>
                    <UserRegister></UserRegister>
                  </ProtectedRoute>
                </Suspense>
              </>
            }
          />
          <Route
            path="/stats_by_cards"
            element={
              <>
                <Suspense fallback={<></>}>
                  <ProtectedRoute isAllowed={user} protectionType={'auth'}>
                    <CardsList></CardsList>
                  </ProtectedRoute>
                </Suspense>
              </>
            }
          />
          <Route
            path="/stats_by_reasons"
            element={
              <>
                <Suspense fallback={<></>}>
                  <ProtectedRoute isAllowed={user} protectionType={'auth'}>
                    <StatsByReasons></StatsByReasons>
                  </ProtectedRoute>
                </Suspense>
              </>
            }
          />
          <Route
            path="/stats_by_solutions"
            element={
              <>
                <Suspense fallback={<></>}>
                  <ProtectedRoute isAllowed={user} protectionType={'auth'}>
                    <StatsBySolutions></StatsBySolutions>
                  </ProtectedRoute>
                </Suspense>
              </>
            }
          />
          <Route
            path="/stats_by_repeated_calls"
            element={
              <>
                <Suspense fallback={<></>}>
                  <ProtectedRoute isAllowed={user} protectionType={'auth'}>
                    <StatsByRepeatedCalls></StatsByRepeatedCalls>
                  </ProtectedRoute>
                </Suspense>
              </>
            }
          />
          <Route
            path="/stats_by_inactives_users"
            element={
              <>
                <Suspense fallback={<></>}>
                  <ProtectedRoute isAllowed={user} protectionType={'auth'}>
                    <StatsByInactivesUsers></StatsByInactivesUsers>
                  </ProtectedRoute>
                </Suspense>
              </>
            }
          />
          <Route
            path="/solution-and-reason"
            element={
              <>
                <Suspense fallback={<></>}>
                  <ProtectedRoute isAllowed={user} protectionType={'admin'}>
                    <SolutionReasonLists></SolutionReasonLists>
                  </ProtectedRoute>
                </Suspense>
              </>
            }
          />
          <Route
            path="/create-reason"
            element={
              <>
                <Suspense fallback={<></>}>
                  <ProtectedRoute isAllowed={user} protectionType={'admin'}>
                    <CreateReason></CreateReason>
                  </ProtectedRoute>
                </Suspense>
              </>
            }
          />
          <Route
            path="/create-solution"
            element={
              <>
                <Suspense fallback={<></>}>
                  <ProtectedRoute isAllowed={user} protectionType={'admin'}>
                    <CreateSolution></CreateSolution>
                  </ProtectedRoute>
                </Suspense>
              </>
            }
          />
          <Route
            path="/employees"
            element={
              <>
                <Suspense fallback={<></>}>
                  <ProtectedRoute
                    isAllowed={user}
                    protectionType={'senior_spec'}
                  >
                    <Employees />
                  </ProtectedRoute>
                </Suspense>
              </>
            }
          />
          <Route
            path="/edit-employees/:id"
            element={
              <>
                <Suspense fallback={<></>}>
                  <ProtectedRoute
                    isAllowed={user}
                    protectionType={'senior_spec'}
                  >
                    <EditEmployees />
                  </ProtectedRoute>
                </Suspense>
              </>
            }
          />
          <Route
            path="*"
            element={
              <Typography
                variant={'h1'}
                sx={{
                  textAlign: 'center',
                  margin: '20px 0',
                }}
              >
                Not found
              </Typography>
            }
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

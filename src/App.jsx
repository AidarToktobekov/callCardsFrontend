import './App.css';
import CardsList from './Containers/Reports/CardsList.jsx';
import { Route, Routes } from 'react-router-dom';
import CreateCard from './Containers/CreateCard/CreateCard.jsx';
import UserLogin from './Containers/UserLogin/UserLogin.jsx';
import UserRegister from './Containers/UserRegister/UserRegister.jsx';
import { Typography } from '@mui/material';
import Layout from './Components/Layout/Layout.jsx';
import StatsByEmployees from './Containers/Reports/StatsByEmployees.jsx';
import ProtectedRoute from './Components/ProtactedRoute/ProtactedRoute.jsx';
import { useAppSelector } from './app/hooks.js';
import { selectUser } from './features/user/userSlice.js';
import SolutionReasonLists from './Containers/SolutionsAndReasons/SolutionReasonLists.jsx';
import CreateReason from './Containers/SolutionsAndReasons/CreateReason.jsx';
import CreateSolution from './Containers/SolutionsAndReasons/CreateSolution.jsx';
import StatsByInactivesUsers from './Containers/Reports/StatsByInactivesUsers.jsx';
import StatsByReasons from './Containers/Reports/StatsByReasons.jsx';
import StatsByRepeatedCalls from './Containers/Reports/StatsByRepeatedCalls.jsx';
import StatsBySolutions from './Containers/Reports/StatsBySolutions.jsx';
import Employees from "./Containers/Employees/Employees.jsx";
import EditEmployees from "./Containers/Employees/EditEmployees.jsx";

function App() {
  const user = useAppSelector(selectUser);

  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ProtectedRoute isAllowed={user} protectionType={'auth'}>
                  <CreateCard></CreateCard>
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/stats_by_employees"
            element={
              <>
                <ProtectedRoute isAllowed={user} protectionType={'admin'}>
                  <StatsByEmployees></StatsByEmployees>
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <UserLogin></UserLogin>
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <ProtectedRoute isAllowed={user} protectionType={'admin'}>
                  <UserRegister></UserRegister>
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/stats_by_cards"
            element={
              <>
                <ProtectedRoute isAllowed={user} protectionType={'auth'}>
                  <CardsList></CardsList>
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/stats_by_reasons"
            element={
              <>
                <ProtectedRoute isAllowed={user} protectionType={'auth'}>
                  <StatsByReasons></StatsByReasons>
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/stats_by_solutions"
            element={
              <>
                <ProtectedRoute isAllowed={user} protectionType={'auth'}>
                  <StatsBySolutions></StatsBySolutions>
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/stats_by_repeated_calls"
            element={
              <>
                <ProtectedRoute isAllowed={user} protectionType={'auth'}>
                  <StatsByRepeatedCalls></StatsByRepeatedCalls>
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/stats_by_inactives_users"
            element={
              <>
                <ProtectedRoute isAllowed={user} protectionType={'auth'}>
                  <StatsByInactivesUsers></StatsByInactivesUsers>
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/solution-and-reason"
            element={
              <>
                <ProtectedRoute isAllowed={user} protectionType={'admin'}>
                  <SolutionReasonLists></SolutionReasonLists>
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/create-reason"
            element={
              <>
                <ProtectedRoute isAllowed={user} protectionType={'admin'}>
                  <CreateReason></CreateReason>
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/create-solution"
            element={
              <>
                <ProtectedRoute isAllowed={user} protectionType={'admin'}>
                  <CreateSolution></CreateSolution>
                </ProtectedRoute>
              </>
            }
          />
            <Route
                path="/employees"
                element={
                    <>
                        <ProtectedRoute isAllowed={user} protectionType={'admin'}>
                            <Employees/>
                        </ProtectedRoute>
                    </>
                }
            />
            <Route
                path="/edit-employees/:id"
                element={
                    <>
                        <ProtectedRoute isAllowed={user} protectionType={'admin'}>
                            <EditEmployees/>
                        </ProtectedRoute>
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

import './App.css'
import CardsList from "./Containers/CardsList/CardsList.jsx";
import {Route, Routes} from "react-router-dom";
import CreateCard from "./Containers/CreateCard/CreateCard.jsx";
import UserLogin from "./Containers/UserLogin/UserLogin.jsx";
import UserRegister from "./Containers/UserRegister/UserRegister.jsx";
import {Typography} from "@mui/material";
import Layout from "./Components/Layout/Layout.jsx";
import Reports from "./Containers/Reports/Reports.jsx";
import ProtectedRoute from "./Components/ProtactedRoute/ProtactedRoute.jsx";
import {useAppSelector} from "./app/hooks.js";
import {selectUser} from "./features/user/userSlice.js";
import SolutionReasonLists from "./Containers/SolutionsAndReasons/SolutionReasonLists.jsx";
import CreateReason from "./Containers/SolutionsAndReasons/CreateReason.jsx";
import CreateSolution from "./Containers/SolutionsAndReasons/CreateSolution.jsx";

function App() {

    const user = useAppSelector(selectUser);

  return (
    <>
        <Layout>
            <Routes>
                <Route path="/" element={
                    <>
                        <ProtectedRoute isAllowed={user} protectionType={"auth"}>
                            <CardsList></CardsList>
                        </ProtectedRoute>
                    </>
                } />
                <Route path="/create-card" element={
                    <>
                        <ProtectedRoute isAllowed={user} protectionType={"auth"}>
                            <CreateCard></CreateCard>
                        </ProtectedRoute>
                    </>
                } />
                <Route path="/sign-in" element={
                    <>
                        <UserLogin></UserLogin>
                    </>
                } />
                <Route path="/sign-up" element={
                    <>
                        <ProtectedRoute isAllowed={user} protectionType={"admin"}>
                            <UserRegister></UserRegister>
                        </ProtectedRoute>
                    </>
                } />
                <Route path="/reports" element={
                    <>
                        <ProtectedRoute isAllowed={user} protectionType={"auth"}>
                            <Reports></Reports>
                        </ProtectedRoute>
                    </>
                } />
                <Route path="/solution-and-reason" element={
                    <>
                        <ProtectedRoute isAllowed={user} protectionType={"admin"}>
                            <SolutionReasonLists></SolutionReasonLists>
                        </ProtectedRoute>
                    </>
                } />
                <Route path="/create-reason" element={
                    <>
                        <ProtectedRoute isAllowed={user} protectionType={"admin"}>
                            <CreateReason></CreateReason>
                        </ProtectedRoute>
                    </>
                } />
                <Route path="/create-solution" element={
                    <>
                        <ProtectedRoute isAllowed={user} protectionType={"admin"}>
                            <CreateSolution></CreateSolution>
                        </ProtectedRoute>
                    </>
                } />
                <Route
                    path="*"
                    element={
                        <Typography variant={"h1"} sx={{
                            textAlign: "center",
                            margin: "20px 0",
                        }}>
                            Not found
                        </Typography>
                    }
                />
            </Routes>
        </Layout>
    </>
  )
}

export default App;

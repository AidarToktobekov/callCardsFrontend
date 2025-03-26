import './App.css'
import CardsList from "./Containers/CardsList/CardsList.jsx";
import {Route, Routes} from "react-router-dom";
import CreateCard from "./Containers/CreateCard/CreateCard.jsx";
import UserLogin from "./Containers/UserLogin/UserLogin.jsx";
import UserRegister from "./Containers/UserRegister/UserRegister.jsx";
import {Typography} from "@mui/material";
import Layout from "./Components/Layout/Layout.jsx";

function App() {

  return (
    <>
        <Layout>
            <Routes>
                <Route path="/" element={
                    <>
                        <CardsList></CardsList>
                    </>
                } />
                <Route path="/create-card" element={
                    <>
                        <CreateCard></CreateCard>
                    </>
                } />
                <Route path="/sign-in" element={
                    <>
                        <UserLogin></UserLogin>
                    </>
                } />
                <Route path="/sign-up" element={
                    <>
                        <UserRegister></UserRegister>
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

import './App.css'
import CardsList from "./Containers/CardsList/CardsList.jsx";
import {Route, Routes} from "react-router-dom";
import CreateCard from "./Containers/CreateCard/CreateCard.jsx";

function App() {

  return (
    <>
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
        </Routes>
    </>
  )
}

export default App

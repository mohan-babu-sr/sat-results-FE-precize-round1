import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Candidate from "./components/candidate";
import GetRank from "./components/GetRank";
import UpdateScore from "./components/UpdateScore";
import DeleteRecord from "./components/DeleteRecord";
import NoPage from "./components/NoPage";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/candidate" element={<Candidate />} />
        <Route path="/candidate/edit/:id" element={<Candidate editMode />} />
        <Route path="/get-rank" element={<GetRank />} />
        <Route path="/update-score" element={<UpdateScore />} />
        <Route path="/delete-record" element={<DeleteRecord />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}


export default App;

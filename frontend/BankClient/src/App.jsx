import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Navbar from "../components/Navbar";
import AllBanks from "../components/AllBanks";
import CreateBank from "../components/CreateBank";
import DeleteBank from "../components/DeleteBank";
import GetBank from "../components/GetBank";
import UpdateBank from "../components/UpdateBank";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view-all-banks" element={<AllBanks />} />
        <Route path="/create-bank" element={<CreateBank />} />
        <Route path="/get-bank" element={<GetBank />} />
        <Route path="/update-bank" element={<UpdateBank />} />
        <Route path="/delete-bank" element={<DeleteBank />} />
      </Routes>
    </Router>
  );
}

export default App;

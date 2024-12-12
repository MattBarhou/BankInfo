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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view-all-banks" element={<AllBanks />} />
        <Route path="/create-bank" element={<CreateBank />} />
        {/* <Route path="/get-bank-by-name" element={<GetBankByName />} />
        <Route path="/get-bank-by-id" element={<GetBankById />} />
        <Route path="/update-bank-by-name" element={<UpdateBankByName />} />
        <Route path="/update-bank-by-id" element={<UpdateBankById />} /> */}
        <Route path="/delete-bank" element={<DeleteBank />} />
      </Routes>
    </Router>
  );
}

export default App;

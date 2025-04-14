import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardUser from "./pages/DashboardUser";
import DashboardAdmin from "./pages/DashboardAdmin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard-user" element={<DashboardUser />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
      </Routes>
    </Router>
  );
};

export default App;

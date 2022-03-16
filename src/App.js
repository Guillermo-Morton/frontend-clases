import * as React from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./common/NavigationBar";
import Error404 from "./pages/Error404"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Photos  from "./pages/Photos"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import Admin from "./pages/admin/Admin"
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="container">
        <NavigationBar/>
        <Routes>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="photos/:event_id" element={<Photos />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="admin" element={<Admin />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    </div>
  );
}

export default App;

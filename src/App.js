import * as React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./common/PrivateRoute";
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
            <Route path="profile" element={<PrivateRoute Component={Profile} />} />
            <Route path="photos/:event_id" element={<Photos />} />
            <Route path="login" element={<PrivateRoute Component={Login} noUser={true} />} />
            <Route path="register" element={<Register />} />
            <Route path="admin" element={<PrivateRoute Component={Admin} adminPrivate={true} />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    </div>
  );
}

export default App;

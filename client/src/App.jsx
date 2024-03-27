import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./context/userContext";
import { Toaster } from 'react-hot-toast'
import axios from "axios";
import Dashboard from "./pages/Dashboard/Dashboard";
import Signup from "./pages/Login/Signup";
import Login from "./pages/Login/Login";
import "./App.css";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Toaster position="bottom" toastOptions={{duration: 3000}}></Toaster>
      <main className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </main>
    </UserContextProvider>
  );
}

export default App;

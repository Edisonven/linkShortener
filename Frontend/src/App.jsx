import "./App.css";
import Home from "./views/home/Home";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import SignIn from "./views/signIn/SignIn"
import SignUp from "./views/signUp/SignUp";

function App() {
  return (
    <section className="app__container">
      <Navbar />
      <div className="max-w-[1400px] mx-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      </div>
    </section>
  );
}

export default App;

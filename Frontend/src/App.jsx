import "./App.css";
import Home from "../views/home/Home";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import SignIn from "../views/signIn/SignIn";
import SignUp from "../views/signUp/SignUp";

function App() {
  return (
    <section className="app__container max-w-[1400px] mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </section>
  );
}

export default App;

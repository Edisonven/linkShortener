import "./App.css";
import Home from "./views/home/Home";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import SignIn from "./views/signIn/SignIn";
import SignUp from "./views/signUp/SignUp";
import { useSelector } from "react-redux";
import MyProfile from "./views/MyProfile/MyProfile";
import { Navigate } from "react-router-dom";
import UrlShortener from "./components/urlShortener/UrlShortener";
import NotFound from "./views/notFound/NotFound";

function App() {
  const token = useSelector((state) => state.userToken.token);

  return (
    <section className="app__container">
      <Navbar />
      <div className="max-w-[1400px] mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/my-profile"
            element={token ? <MyProfile /> : <Navigate to="/sign-in" />}
          />
          <Route path="/:urlParams" element={<UrlShortener />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
}

export default App;

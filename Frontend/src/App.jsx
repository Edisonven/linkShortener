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
import EditMyUrl from "./views/editUrl/EditMyUrl";
import MyLinks from "./views/myLinks/MyLinks";
import EditUserInfo from "./views/MyProfile/EditUserInfo";
import EditUserPassword from "./views/MyProfile/EditUserPassword";
import DeleteUserAccount from "./views/MyProfile/DeleteUserAccount";

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
          <Route
            path="/edit-url/:id"
            element={token ? <EditMyUrl /> : <Navigate to="/sign-in" />}
          />
          <Route
            path="/my-links"
            element={token ? <MyLinks /> : <Navigate to="/sign-in" />}
          />
          <Route
            path="/edit-info"
            element={token ? <EditUserInfo /> : <Navigate to="/sign-in" />}
          />
          <Route
            path="/edit-password"
            element={token ? <EditUserPassword /> : <Navigate to="/sign-in" />}
          />
          <Route
            path="/delete-account"
            element={token ? <DeleteUserAccount /> : <Navigate to="/sign-in" />}
          />
          <Route path="/:urlParams" element={<UrlShortener />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
}

export default App;

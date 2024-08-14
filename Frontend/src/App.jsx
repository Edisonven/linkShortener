import Home from "../views/home/Home";
import "./App.css";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <section className="app__container max-w-[1400px] mx-auto">
      <Navbar />
      <Home />
    </section>
  );
}

export default App;

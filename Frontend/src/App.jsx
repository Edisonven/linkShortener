import "./App.css";
import Navbar from "./components/navbar/Navbar";
import UrlShortener from "./components/urlShortener/UrlShortener";

function App() {
  return (
    <section className="app__container max-w-[1400px] mx-auto">
      <Navbar />
      <UrlShortener />
    </section>
  );
}

export default App;

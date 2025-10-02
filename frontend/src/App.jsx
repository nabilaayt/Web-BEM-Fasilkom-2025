import Index from "./components/home/hero";
import {Route, Routes} from "react-router-dom";
import Homepage from "./pages/homepage";
import About from "./pages/aboutuspage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={  <About />} />
    </Routes>
  )
}

export default App;

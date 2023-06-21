import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Formulario from "./components/Formulario/Form";
import "./App.css";
import Form from "./components/Formulario/Form";

function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/formularioIngreso" element={<Form />} />
      </Routes>
    </main>
  );
}

export default App;

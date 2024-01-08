import "./App.css";
import Pages from "./Componentes/Pages/Pages";
import { BrowserRouter } from "react-router-dom";
import AppContext from "./Componentes/AppContext/AppContext";

function App() {
  return (
    <h1 className="App">
      <BrowserRouter>
        <AppContext>
          <Pages></Pages>
        </AppContext>
      </BrowserRouter>
      <a href="/learn">Learn React</a>
    </h1>
  );
}

export default App;

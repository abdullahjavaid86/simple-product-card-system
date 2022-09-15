import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ProductsView } from "./views";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ProductsView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DynamicInputFields from "./components/AddDynamicFields";
import FormPreview from "./components/FormView";
import AddDynamicFields from "./components/AddDynamicFields";

function App() {
  return (
    <div className="container mx-auto w-full mt-9">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form-data" element={<FormPreview />} />
          <Route path="/form-handle" element={<AddDynamicFields />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

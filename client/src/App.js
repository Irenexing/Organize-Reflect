import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Calendar from "./pages/Calendar/Calendar";
import Journal from "./pages/Journal/Journal"


function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

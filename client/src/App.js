import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Calendar from "./pages/Calendar/Calendar";
import Journal from "./pages/Journal/Journal"
import TaskModal from "./components/TaskModal/TaskModal"


function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/taskModal" element={<TaskModal />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

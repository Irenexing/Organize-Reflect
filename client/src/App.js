import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Calendar from "./pages/Calendar/Calendar";
import Journal from "./pages/Journal/Journal"
import JournalId from "./pages/JournalId/JournalId"
import JournalSideBar from "./components/JournalSideBar/JournalSideBar"
import "./App.scss"

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="app__container">
        <JournalSideBar />
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/journals" element={<Journal />} />
          <Route path=":journalsId" element={<JournalId />} />
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

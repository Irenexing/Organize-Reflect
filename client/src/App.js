import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Calendar from "./pages/Calendar/Calendar";
import Journal from "./pages/Journal/Journal";
import JournalId from "./pages/JournalId/JournalId";
import JournalSideBar from "./components/JournalSideBar/JournalSideBar";
import "./App.scss";
import { useState, useEffect } from "react";

function App() {
  const [entryId, setEntryId] = useState("");



  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="app__container">
          <JournalSideBar setEntryId={setEntryId} />
          <Routes>
            <Route path="/" element={<Calendar />} />
            <Route path="/journals" element={<Journal />} />
            <Route
              path=":journalsId"
              element={<JournalId entryId={entryId} />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

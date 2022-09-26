import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import "./JournalId.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function JournalId ({activeJournal}) {
    const [journalList, setJournalList] = useState([]);
    const journalCollectionRef = collection(db, "journal");
    const [notes, setNewNotes] = useState("");
    const [date, setNewDate] = useState("");
    const [title, setNewTitle] = useState("");

    const journalId  = useParams();
  //fetch data
  useEffect(() => {
    const getJournalList = async () => {
      const data = await getDocs(journalCollectionRef);
      setJournalList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getJournalList();
  }, []);

console.log (journalId)

  const handleEditJournal = async (title, notes, date) => {
    await updateDoc(doc(db, "journal", journalId), {title:title}, {notes:notes}, {date:date});
  };

    // const handleEditJournal = async (journals, title, date, notes) => {

            // await updateDoc(doc(db, "journal", journals.id), { title: title }, { date:date }, { notes:notes });
        //   };

    return (
        <>
            <form className="journal__form" onSubmit={handleEditJournal}>
            
            <input
              type="text"
              //use value to store to database
              value={title}
              onChange={(event) => setNewTitle(event.target.value)}
              placeholder={title}
              className="journal__title"
            />
            <input
              type="date"
              //use value to store to database
              value={date}
              onChange={(event) => setNewDate(event.target.value)}
              placeholder={date}
              className="journal__title"
            />
            <input
              type="text"
              //use value to store to database
              value={notes}
              onChange={(event) => setNewNotes(event.target.value)}
              placeholder={notes}
              className="journal__input"
            />
            <div className="journal__button-container">
            <button className="journal__button">Edit Journal</button>
            </div>
          </form>
        </>
    )
}

export default JournalId; 
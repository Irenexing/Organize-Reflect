import { db } from "../../firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  connectFirestoreEmulator,
  query,
} from "firebase/firestore";
import "./JournalId.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function JournalId({ entryId }) {
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [journalEntry, setJournalEntry] = useState("");

  const journalCollectionRef = collection(db, "journal");
  const journalId = useParams();

  //fetch data
  useEffect(() => {
    const getJournalList = async () => {
      const data = await getDocs(journalCollectionRef);

      const dataRef = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      const journalEntry = dataRef.filter(
        (data) => data.id === journalId.journalsId
      );

      setJournalEntry(journalEntry);
      setTitle(journalEntry[0].title);
      setDate(journalEntry[0].date);
      setNotes(journalEntry[0].notes);
    };
    getJournalList();
  }, [entryId]);

  const navigate = useNavigate();
  const handleEditJournal = async (e) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "journal", journalEntry[0].id), {
        title: title,
        date: date,
        notes: notes,
      });
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };

  return (
    <>
      <form className="journal__form" onSubmit={handleEditJournal}>
        <input
          type="text"
          //use value to store to database
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder={title}
          className="journal__title"
        />
        <input
          type="date"
          //use value to store to database
          value={date}
          onChange={(event) => setDate(event.target.value)}
          placeholder={date}
          className="journal__title"
        />
        <input
          type="text"
          //use value to store to database
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder={notes}
          className="journal__input"
        />
        <div className="journal__button-container">
          <button
            className="journal__button"
            // onClick={() => handleEditJournal(journalEntry[0], title)}
          >
            Edit Journal
          </button>
        </div>
      </form>
    </>
  );
}

export default JournalId;

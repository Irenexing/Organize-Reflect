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

function JournalId() {
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
  }, []);

  //fetch data
  // useEffect(() => {
  //   const getJournalList = async () => {
  //     const docRef = await doc(journalCollectionRef, journalId.journalsId);

  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       setJournalEntry(docSnap.data());
  //       setNewTitle(docSnap.data().title);
  //       setNewDate(docSnap.data().date);
  //       setNewNotes(docSnap.data().notes);
  //     }
  //   };
  //   getJournalList();
  // }, []);

  // const handleEdit = async (todo, title) => {
  //   await updateDoc(doc(db, "todos", todo.id), { title: title });
  // };

  useEffect(() => {
    
  }, []);
  
  const handleEditJournal = async (e) => {
    e.preventDefault();

    try {
      console.log("ENTERED TRY BLOCK LINE 79");
      console.log(title);
      await updateDoc(doc(db, "journal", journalEntry[0].id), {
        title: title,
        date: date,
        notes: notes,
      });
    } catch (error) {
      console.log(error);
    }
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

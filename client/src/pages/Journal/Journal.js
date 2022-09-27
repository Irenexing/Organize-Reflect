import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import "./Journal.scss";
import { useState } from "react";

function Journal ({ setJournalList }) {
    const [notes, setNotes] = useState("");
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    //collection(database, collection name "journal" is the firebase collection name)
    const journalCollectionRef = collection(db, "journal");

    const handleSubmitJournal = (event) => {
        event.preventDefault();
        // if it is not empty then store data in firebase
        if (notes !== "") {
          //data should be given as object
          addDoc(collection(db, "journal"), {
            title,
            date,
            notes,
          });
        }
      };

    return (
        <>
            <form className="journal__form" onSubmit={handleSubmitJournal}>
            <input
              type="text"
              //use value to store to database
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Add New Title"
              className="journal__title"
            />
            <input
              type="date"
              //use value to store to database
              value={date}
              onChange={(event) => setDate(event.target.value)}
              placeholder="Add New Title"
              className="journal__title"
            />
            <input
              type="text"
              //use value to store to database
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Add New Journal"
              className="journal__input"
            />
            <div className="journal__button-container">
            <button className="journal__button">Add Journal</button>
            </div>
          </form>
        </>
    )
}

export default Journal; 
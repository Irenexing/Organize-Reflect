import { db } from "../../firebase";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import "./Journal.scss";
import { useState, useEffect, useRef } from "react";

function Journal () {
    const [notes, setNotes] = useState("");
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    
    const handleSubmitJournal = (event) => {
        event.preventDefault();
        // if it is not empty then store data in firebase
        if (notes !== "") {
          //data should be given as object
          addDoc(collection(db, "journal"), {
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
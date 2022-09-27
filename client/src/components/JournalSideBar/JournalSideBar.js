import "./JournalSideBar.scss";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function JournalSideBar({ setEntryId }) {
  const [journalList, setJournalList] = useState([]);
  //collection(database, collection name "journal" is the firebase collection name)
  const journalCollectionRef = collection(db, "journal");

  //fetch data
  useEffect(() => {
    const getJournalList = async () => {
      const data = await getDocs(journalCollectionRef);
      setJournalList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getJournalList();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "journal", id)).then((res) => {
      const getJournalList = async () => {
        const data = await getDocs(journalCollectionRef);
        setJournalList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getJournalList();
    });
  };

  return (
    <div className="journalsidebar">
      <h1 className="journalsidebar__header">Journals List</h1>
      <div className="journalsidebar__container">
        {journalList.map((journals) => {
          return (
            <>
              <div className="journalsidebar__list">
                <div className="journalsidebar__title"> {journals.title} </div>
                <div className="journalsidebar__date"> {journals.date} </div>
                <Link to={journals.id}>
                  <button
                    className="journal__button--edit"
                    onClick={() => setEntryId(journals.id)}
                  >
                    <EditIcon />
                  </button>
                </Link>
                <button
                  className="journal__button--delete"
                  onClick={() => handleDelete(journals.id)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </>
          );
        })}
      </div>
      <Link to="/journals">
        <button className="journalsidebar__addbutton">Add Journal</button>
      </Link>
    </div>
  );
}

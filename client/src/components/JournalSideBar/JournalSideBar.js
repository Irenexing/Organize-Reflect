import "./JournalSideBar.scss";
import { db } from "../../firebase";
import {
  collection,
  onSnapshot,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";


export default function JournalSideBar() {
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

  const handleEdit = async (jounals, title) => {
    await updateDoc(doc(db, "journal", jounals.id), { title: title });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "journal", id));
  };

  return (
    <div className="journalsidebar">
    <h1 className="journalsidebar__title">Journals List</h1>
      <div className="journalsidebar__container">
        {journalList.map((journals) => {
          return (<>
          <div> {journals.title} </div>
          <div> {journals.date} </div>
          </>);
        })}
      </div>
    </div>
  );
}

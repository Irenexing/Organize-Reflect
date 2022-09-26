import "./Calendar.scss";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
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
import { useState, useEffect, useRef } from "react";
import ToDo from "../../components/Todo/ToDo";
import { Link } from "react-router-dom";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@chakra-ui/react";

export default function Calendar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [todos, setTodos] = useState([]);

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  //fetch data
  useEffect(() => {
    //collection(database, collection name "todos" is the firebase collection name)
    const q = query(collection(db, "todos"));
    //initial call using callback provided creates a document snapshot immediately with the current contents of the single document
    //each time the content change, another call updates the document snapshot.
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        //push each todo to the temporary array
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      //update the todo state
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const handleDateClick = (arg) => {
    onOpen();
    console.log(arg);
    setDate(arg.dateStr)
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();
    // if it is not empty then store data in firebase
    if (title !== "") {
      //data should be given as object
      addDoc(collection(db, "todos"), {
        title,
        date,
        completed: false,
      });
      //after storing data, clear input
      setTitle("");
    }
  };

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, "todos", todo.id), { title: title });
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: todo.completed });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <>
      <div className="calendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={todos}
        />
      </div>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent className="modal__container">
          <ModalHeader className="modal__title">To-Do List</ModalHeader>

          <form onSubmit={handleSubmit}>
            <label className="modal__label">New Task</label>
            <input
              type="text"
              //use value to store to database
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              ref={initialRef}
              placeholder="Add New Task"
              className="modal__input"
            />
            <button className="modal__button">Add Task</button>
          </form>
          {/* //display todo component and pass the props */}
          <div className="todo__container">
            {todos.map((todo) => {
              if(todo.date===date){
                return (
                <ToDo
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              /> 
              )}
              
            })}
          </div>
          <div className="modal__button-container">
          <Link to="/journals"><button className="modal__addbutton">Add Journal</button></Link>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

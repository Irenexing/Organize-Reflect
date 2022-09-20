import React from "react";
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
import { useState, useEffect } from "react";
import ToDo from "../../components/Todo/ToDo";

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
  const [todos, setTodos] = useState([]);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const handleDateClick = (arg) => {
    onOpen();
    console.log(arg);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title !== "") {
      addDoc(collection(db, "todos"), {
        title,
        completed: false,
      });
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
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={[
          { title: "event 1", date: "2022-09-01" },
          { title: "event 2", date: "2019-04-02" },
        ]}
      />

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>To-Do List</ModalHeader>
          <form onSubmit={handleSubmit}>
            <label>Task</label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              ref={initialRef}
              placeholder="task"
            />
            <div className="btn_container">
              <button>Save</button>
            </div>
          </form>
        </ModalContent>
      </Modal>
      <div className="todo_container">
        {todo.map((todo) => (
          <ToDo
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </>
  );
}

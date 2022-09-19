import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import TaskModal from "../../components/TaskModal/TaskModal"


export default class DemoApp extends React.Component {
  
  render() {
    return (
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin  ]}
        initialView="dayGridMonth"
        dateClick={this.handleDateClick}
        eventContent={renderEventContent}
        events={[
          { title: 'event 1', date: '2022-09-01' },
          { title: 'event 2', date: '2019-04-02' }
          
        ]}
      />
    )
  }
  
  handleDateClick = (arg) => { // bind with an arrow function
    alert(arg.dateStr)
  }
    
}

function renderEventContent(eventInfo) {
  const [openModal, setOpenModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({});
  const [itemToAdd, setItemToAdd] = useState({});
  const handleDelete = (item) => {
    setOpenModal(true);
    setItemToDelete(item);
  };

  return (
    <>
    <TaskModal/> 
    </>
  )
}

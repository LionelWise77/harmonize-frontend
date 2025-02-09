import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "../api/axiosDefaults";
import TaskForm from "../pages/TaskForm";
import Modal from "react-modal";
import styles from "../styles/CalendarView.module.css";

const localizer = momentLocalizer(moment);

Modal.setAppElement("#root");

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get("api/tasks/");
        const formattedEvents = data.results.map((task) => ({
          id: task.id,
          title: task.title,
          start: new Date(task.due_date + "T" + task.start_time),
          end: new Date(task.due_date + "T" + task.end_time),
          allDay: false,
          task,
        }));
        setEvents(formattedEvents);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event.task);
    setShowForm(true);
  };

  const handleCreateTask = async (taskData, resetForm) => {
    try {
      const { data } = await axios.post("api/tasks/", taskData);
      const newEvent = {
        id: data.id,
        title: data.title,
        start: new Date(data.due_date + "T" + data.start_time),
        end: new Date(data.due_date + "T" + data.end_time),
        allDay: false,
        task: data,
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      resetForm();
      setShowForm(false);
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      const { data } = await axios.put(`api/tasks/${id}/`, updatedTask);
      const updatedEvent = {
        id: data.id,
        title: data.title,
        start: new Date(data.due_date + "T" + data.start_time),
        end: new Date(data.due_date + "T" + data.end_time),
        allDay: false,
        task: data,
      };
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === id ? updatedEvent : event))
      );
      setSelectedEvent(null);
      setShowForm(false);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`api/tasks/${id}/`);
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
      setSelectedEvent(null);
      setShowForm(false);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleSelectSlot = () => {
    setSelectedEvent(null);
    setShowForm(true);
  };

  return (
    <div className={styles.calendarContainer}>
      <h1>Task Manager</h1>
      <button
        onClick={() => {
          setSelectedEvent(null);
          setShowForm(true);
        }}
        className={styles.createTaskButton}
      >
        Create Task
      </button>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
        selectable
        onSelectSlot={handleSelectSlot}
      />
      <Modal
        isOpen={showForm}
        onRequestClose={() => setShowForm(false)}
        contentLabel="Task Form"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <TaskForm
          initialData={selectedEvent}
          handleSubmit={selectedEvent ? handleUpdateTask : handleCreateTask}
          onCancel={() => setShowForm(false)}
        />
        {selectedEvent && (
          <button
            onClick={() => handleDeleteTask(selectedEvent.id)}
            className={styles.btnDelete}
          >
            Delete Task
          </button>
        )}
      </Modal>
    </div>
  );
};

export default CalendarView;

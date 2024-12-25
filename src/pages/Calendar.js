import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../App.module.css";

function CalendarView() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Your Calendar</h2>
      <div className="d-flex justify-content-center">
        <Calendar onChange={setDate} value={date} />
      </div>
      <p className="text-center mt-3">
        Selected Date: <strong>{date.toDateString()}</strong>
      </p>
    </div>
  );
}

export default CalendarView;

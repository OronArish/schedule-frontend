import React, { useState } from "react";

const SendToEmail = ({ shifts }) => {
  const [message, setMessage] = useState("");
  const [employees, setEmployees] = useState([]);

  const handleSendClick = async () => {
    try {
      const shiftsToSend = shifts.filter((shift) => shift.startTime && shift.endTime);
      const emailAddresses = employees.map((employee) => employee.email);

      if (shiftsToSend.length === 0) {
        alert("No shifts available to send");
        return;
      }

      const requestBody = {
        employees: emailAddresses,
        shifts: shiftsToSend.map((shift) => `${shift.employee}: ${shift.startTime} - ${shift.endTime}`),
      };

      const response = await fetch(process.env.REACT_APP_FETCH_URL + "send-shifts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert("Shifts sent by email");
      } else {
        alert("Failed to send shifts by email");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send shifts by email");
    }
  };

  return (
    <div>
      <h3>Send Shifts by Email</h3>
      <label htmlFor="messageText">Message:</label>
      <textarea
        id="messageText"
        name="messageText"
        rows="4"
        cols="50"
        placeholder="Enter message to include with shifts"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <br />
      <button disabled={!message} onClick={handleSendClick}>
        Send by Email
      </button>
    </div>
  );
};

export default SendToEmail;

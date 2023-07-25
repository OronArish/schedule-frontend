import React, { useState } from 'react';

const EmailButton = ({ shifts, handleSendEmails }) => {
  const [sendToHR, setSendToHR] = useState(false);

  const handleSendEmail = async () => {
    try {
      const requestBody = {
        employees: shifts.map((shift) => shift.employee),
        shifts: shifts.map(
          (shift) => `Employee: ${shift.employee}, Shift: ${shift.startTime} - ${shift.endTime}`
        ),
        sendToHR,
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

  const handleSendEmailToHR = async () => {
      try {
        const requestBody = {
          employees: shifts.map((shift) => shift.employee),
          shifts: shifts.map(
            (shift) => `Employee: ${shift.employee}, Shift: ${shift.startTime} - ${shift.endTime}`
          ),
        };
    
        const response = await fetch(process.env.REACT_APP_FETCH_URL + "send-shifts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
    
        if (response.ok) {
          alert("Shifts sent to HR by email");
        } else {
          alert("Failed to send shifts to HR by email");
        }
      } catch (error) {
        console.error(error);
        alert("Failed to send shifts to HR by email");
      }
    };

  return (
    <div>
      <button
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
        }}
        onClick={() => {
          handleSendEmail();
          handleSendEmails();
        }}
      >
        Send by Email
      </button>
      <label>
        <input
          type="checkbox"
          checked={sendToHR}
          onChange={() => setSendToHR(!sendToHR)}
        />
        Send to HR
      </label>
    </div>
  );
};

export default EmailButton;

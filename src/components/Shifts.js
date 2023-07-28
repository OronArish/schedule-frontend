import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Sidebar from "./Sidebar";
import ShiftForm from "./ShiftForm";
import Modal from "react-modal";
import EmailButton from "./EmailButton";
import { saveAs } from "file-saver";
import styled from "styled-components";
import { useSelector } from "react-redux";


const Shifts = () => {
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingShiftId, setEditingShiftId] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const userRole = useSelector((state) => state.user);
  // User role state
  // console.log(shifts);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_FETCH_URL + "shifts");
        setShifts(response.data);
      } catch (error) {
        console.error("Error fetching shifts:", error);
        // Handle the error here, such as showing an error message to the user
      }
    };
  
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_FETCH_URL + "employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
        // Handle the error here, such as showing an error message to the user
      }
    };
    fetchShifts();
    fetchEmployees();
  }, []);

  const createShift = (shift) => {
    // Create the shift in the database
    axios
      .post(process.env.REACT_APP_FETCH_URL + "shifts", shift)
      .then((response) => {
        // Update the shifts state
        const newShift = response.data;
        setShifts([...shifts, newShift]);
      })
      .catch((error) => {
        console.error("Error creating shift:", error);
        // Handle the error here, such as showing an error message to the user
      });
  };
  
  const updateShift = (shiftId, updatedShift) => {
    // Update the shift in the database
    axios
      .put(process.env.REACT_APP_FETCH_URL + `shifts/${shiftId}`, updatedShift)
      .then(() => {
        // Update the shifts state
        const updatedShifts = shifts.map((shift) => {
          if (shift._id === shiftId) {
            return updatedShift;
          }
          return shift;
        });
        setShifts(updatedShifts);
      })
      .catch((error) => {
        console.error("Error updating shift:", error);
        // Handle the error here, such as showing an error message to the user
      });
  };
  
  const deleteShift = (shiftId) => {
    // Delete the shift from the database
    axios
      .delete(process.env.REACT_APP_FETCH_URL + `shifts/${shiftId}`)
      .then(() => {
        // Update the shifts state
        const updatedShifts = shifts.filter((shift) => shift._id !== shiftId);
        setShifts(updatedShifts);
      })
      .catch((error) => {
        console.error("Error deleting shift:", error);
        // Handle the error here, such as showing an error message to the user
      });
  };
  

  const handleDateClick = (info) => {
    if (userRole !== "manager") {
      alert("Only managers can create shifts");
      return;
    }
    setSelectedStartTime(info.dateStr);
    setSelectedEndTime(info.dateStr);
    setSelectedEmployee(""); // Reset selected employee
    setIsModalOpen(true);
  };

  const handleShiftEdit = (shiftId, shift) => {
    if (userRole !== "manager") {
      alert("Only managers can create shifts");
      return;
    }
    setSelectedEmployee("");
    setSelectedStartTime("");
    setSelectedEndTime("");
    setEditingShiftId(shiftId);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleSendEmails = () => {
    const filteredShifts = shifts.filter((shift) => {
      const shiftStartDate = new Date(shift.startTime);
      const shiftEndDate = new Date(shift.endTime);
      const startDate = new Date(selectedStartDate);
      const endDate = new Date(selectedEndDate);
  
      return shiftStartDate >= startDate && shiftEndDate <= endDate;
    });
  
    const employeesEmail = filteredShifts
      .filter((shift) => shift.employee === selectedEmployee)
      .map((shift) => {
        if (shift.employee && shift.startTime && shift.endTime) {
          return `Employee: ${shift.employee}, Shift: ${shift.startTime} - ${shift.endTime}`;
        }
        return ""; // Skip invalid shifts without email text
      })
      .filter((email) => email !== ""); // Remove empty email entries
  
    // Pass employeesEmail to the email sending logic
    sendEmails(employeesEmail);
  };
  
  
  const sendEmails = (employeesEmail) => {
    employeesEmail.forEach((email) => {
      if (email) {
        // Implement your email sending logic using the email value
        console.log("Sending email:", email);
      }
    });
  };
  

  const handleStartDateChange = (event) => {
    setSelectedStartDate(event.target.value);
  };
  
  const handleEndDateChange = (event) => {
    setSelectedEndDate(event.target.value);
  };
  
  const role = localStorage.getItem('role');

  const generateCSVReport = () => {
    const filteredShifts = shifts.filter((shift) => {
      const shiftStartDate = new Date(shift.startTime);
      const shiftEndDate = new Date(shift.endTime);
      const startDate = new Date(selectedStartDate);
      const endDate = new Date(selectedEndDate);
  
      return shiftStartDate >= startDate && shiftEndDate <= endDate;
    });
  
    const csvData = [
      ["Shift ID", "Employee", "Start Time", " ", " " ,"End Time"], // Titles
      ...filteredShifts.flatMap((shift) => {
        const shiftStartDate = new Date(shift.startTime);
        const shiftEndDate = new Date(shift.endTime);
  
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
          timeZone: 'Asia/Jerusalem',
        };
  
        return [
          [shift._id, shift.employee, shiftStartDate.toLocaleDateString("en-US"), shiftStartDate.toLocaleTimeString("en-US", options), shiftEndDate.toLocaleDateString("en-US"), shiftEndDate.toLocaleTimeString("en-US", options)]
        ];
      }),
    ];
  
    const csvContent = "data:text/csv;charset=utf-8," + arrayToCSV(csvData);
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "shifts_report.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
  };
  
  const arrayToCSV = (arr) => {
    return arr.map((row) => row.join(",")).join("\n");
  };
  
  return (
    <StyledComponent>
      <div className="shifts-container">
        <Sidebar />
        <div className="shifts-calendar">
           
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              selectable={true}
              dateClick={handleDateClick}
              events={
                Array.isArray(shifts)
                  ? shifts.map((shift) => ({
                      id: shift._id,
                      title: shift.employee,
                      start: shift.startTime,
                      end: shift.endTime,
                    }))
                  : []
              }
              eventClick={(info) => {
                handleShiftEdit(info.event.id, info.event.extendedProps);
              }}
            />
          
        </div>
      
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => {
            setIsModalOpen(false);
            setIsEditMode(false);
            setEditingShiftId(null);
            
          }}
        >
          <ShiftForm
            employees={employees}
            shiftId={editingShiftId}
            updateShift={updateShift}
            createShift={createShift}
            deleteShift={deleteShift}
            selectedEmployee={selectedEmployee}
            selectedStartTime={selectedStartTime}
            selectedEndTime={selectedEndTime}
            setSelectedEmployee={setSelectedEmployee}
            setSelectedStartTime={setSelectedStartTime}
            setSelectedEndTime={setSelectedEndTime}
            onClose={() => {
              setIsModalOpen(false);
              setIsEditMode(false);
              setEditingShiftId(null);
            }}
            isEditMode={isEditMode}
          />
        </Modal>
  
        {userRole === "manager" && (
          <div className="button-container">
            <EmailButton shifts={shifts} employees={employees} handleSendEmails={handleSendEmails} />
            <div className="date-range-container">
              <label>From:</label>
              <input
                type="date"
                value={selectedStartDate}
                onChange={handleStartDateChange}
              />
              <label>To:</label>
              <input
                type="date"
                value={selectedEndDate}
                onChange={handleEndDateChange}
              />
            </div>
            <button className="csv-button" onClick={generateCSVReport}>
              Generate CSV Report
            </button>
          </div>
        )}
      </div>
    </StyledComponent>
  );
};

const StyledComponent = styled.div`
  .button-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .csv-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-left: 10px;
    cursor: pointer;
  }

  .date-range-container {
    display: flex;
    align-items: center;
    margin-right: 10px;
    margin-left: 10px;
  }

  .date-range-container label {
    margin-right: 5px;
    margin-left: 10px;
    font-weight: bold;
  }
`;


export default Shifts;




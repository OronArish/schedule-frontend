import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

const ShiftForm = ({
  employees,
  shiftId,
  updateShift,
  createShift,
  deleteShift,
  selectedEmployee,
  selectedStartTime,
  selectedEndTime,
  setSelectedEmployee,
  setSelectedStartTime,
  setSelectedEndTime,
  onClose,
  isEditMode
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const shift = {
      employee: selectedEmployee,
      startTime: selectedStartTime,
      endTime: selectedEndTime,
    };
    if (isEditMode) {
      // If the form is in edit mode, call the updateShift function instead
      updateShift(shiftId, shift);
    }
    else {
    createShift(shift);
    }
    setSelectedEmployee("");
    setSelectedStartTime("");
    setSelectedEndTime("");
    onClose();
    setIsOpen(false); // close the modal after the form is submitted
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this shift?")) {
      deleteShift(shiftId);
      onClose();
    }
  };

  useEffect(() => {
    setIsOpen(true);
  }, []);
 
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    style={{
    overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "1000"
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "5px",
    padding: "20px",
    maxWidth: "600px",
    maxHeight: "80%",
    overflow: "auto"
  }
      }}
    >
      <h2>{isEditMode ? "Edit Shift" : "Create Shift"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Employee:
          <select
          value={selectedEmployee}
        onChange={(event) => setSelectedEmployee(event.target.value)}
        >
  <option value="">Select an employee</option>
  {employees.map((employee, index) => (
    <option key={index} value={employee._id}>
      {employee.username}
    </option>
  ))}
</select>
        </label>
        <br />
        <label>
          Start Time:
          <input
            type="datetime-local"
            value={selectedStartTime}
            onChange={(event) => setSelectedStartTime(event.target.value)}
          />
        </label>
        <br />
        <label>
          End Time:
          <input
            type="datetime-local"
            value={selectedEndTime}
            onChange={(event) => setSelectedEndTime(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">{isEditMode ? "Update" : "Create"}</button>
        {isEditMode && (
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        )}
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

ShiftForm.propTypes = {
  employees: PropTypes.array.isRequired,
  createShift: PropTypes.func.isRequired,
  selectedEmployee: PropTypes.string.isRequired,
  selectedStartTime: PropTypes.string.isRequired,
  selectedEndTime: PropTypes.string.isRequired,
  setSelectedEmployee: PropTypes.func.isRequired,
  setSelectedStartTime: PropTypes.func.isRequired,
  setSelectedEndTime: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
};

export default ShiftForm;


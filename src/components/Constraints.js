import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components';
import Sidebar from "./Sidebar";

function Constraints({ username }) {
  const [constraints, setConstraints] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [editingConstraint, setEditingConstraint] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editEmployeeName, setEditEmployeeName] = useState("");
  const [role, setUserRole] = useState("");

  useEffect(() => {
    const storedConstraints = JSON.parse(localStorage.getItem("constraints")) || [];
    setConstraints(storedConstraints);

    const userRoleFromLocalStorage = localStorage.getItem("role");
    setUserRole(userRoleFromLocalStorage);
  }, []);

  console.log(process.env);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newConstraint = {
        employeeName,
        title,
        description,
      };

      const response = await axios.post(process.env.REACT_APP_FETCH_URL + "constraints", newConstraint);
      const createdConstraint = response.data;

      const updatedConstraints = [...constraints, createdConstraint];
      localStorage.setItem("constraints", JSON.stringify(updatedConstraints));

      setConstraints(updatedConstraints);

      setTitle("");
      setDescription("");
      setEmployeeName("");
    } catch (error) {
      console.error("Error adding constraint:", error);
    }
  };

  const handleEdit = (constraint) => {
    setEditingConstraint(constraint);
    setEditTitle(constraint.title);
    setEditDescription(constraint.description);
    setEditEmployeeName(constraint.employeeName);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      await axios.put(process.env.REACT_APP_FETCH_URL + `constraints/${editingConstraint._id}`, {
        employeeName: editEmployeeName,
        title: editTitle,
        description: editDescription,
      });

      setEditTitle("");
      setEditDescription("");
      setEditEmployeeName("");
      setEditingConstraint(null);

      const updatedConstraints = constraints.map((constraint) => {
        if (constraint._id === editingConstraint._id) {
          return {
            ...constraint,
            employeeName: editEmployeeName,
            title: editTitle,
            description: editDescription,
          };
        }
        return constraint;
      });

      setConstraints(updatedConstraints);
      localStorage.setItem("constraints", JSON.stringify(updatedConstraints));
    } catch (error) {
      console.error("Error updating constraint:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(process.env.REACT_APP_FETCH_URL + `constraints/${id}`);

      const updatedConstraints = constraints.filter((constraint) => constraint._id !== id);
      localStorage.setItem("constraints", JSON.stringify(updatedConstraints));

      setConstraints(updatedConstraints);
    } catch (error) {
      console.error("Error deleting constraint:", error);
    }
  };

  return (
    <StyledComponent>
    <Sidebar />
      <div className="constraints-container">
      <h1>Constraints Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          placeholder="Name"
          className="input-field"
        />
        {/* Add class "input-field" to other input and textarea elements */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="input-field"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="input-field"
        ></textarea>
        <button type="submit" className="add-button">
          Add Constraint
        </button>
      </form>
      {/* Add class "constraints-list" to the ul element */}
      {constraints.length > 0 ? (
        <ul className="constraints-list">
          {constraints.map((constraint) => (
            <li key={constraint._id || constraint.employeeName} className="constraint-item">
              <p><b>EmployeeName:</b> {constraint.employeeName}</p>
              <p><b>Title:</b> {constraint.title}</p>
              <p><b>Description:</b> {constraint.description}</p>
              {role === "manager" && (
              <button onClick={() => handleEdit(constraint)} className="edit-button">
                Edit
              </button>
              )}
              {role === "manager" && (
              <button onClick={() => handleDelete(constraint._id)} className="delete-button">
                Delete
              </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No constraints found.</p>
      )}
      {/* Add class "edit-form" to the form element */}
      {editingConstraint && (
        <form onSubmit={handleUpdate} className="edit-form">
          {/* Add class "input-field" to the input and textarea elements */}
          <input
            type="text"
            value={editEmployeeName}
            onChange={(e) => setEditEmployeeName(e.target.value)}
            placeholder="Name"
            className="input-field"
          />
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
            className="input-field"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description"
            className="input-field"
          ></textarea>
          <button type="submit" className="update-button">
            Update Constraint
          </button>
          <button onClick={() => setEditingConstraint(null)} className="cancel-button">
            Cancel
          </button>
        </form>
      )}
    </div>
    </StyledComponent>
  );
}

const StyledComponent = styled.div`
.constraints-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.input-field {
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
  font-size: 14px;
}

.add-button,
.update-button,
.cancel-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
}

.constraint-item {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.delete-button,
  .edit-button {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-right: 10px;
    cursor: pointer;
  }

.constraints-list {
  list-style: none;
  padding: 0;
}

.edit-form {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
}

.edit-form .input-field {
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
  font-size: 14px;
}
`;

export default Constraints;


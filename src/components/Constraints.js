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
    const userRoleFromLocalStorage = localStorage.getItem("role");
    setUserRole(userRoleFromLocalStorage);
    fetchConstraints();
  }, []);
  

  const fetchConstraints = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_FETCH_URL + "constraints");
      setConstraints(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching constraints:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newConstraint = {
        employeeName,
        title,
        description,
      };

      await axios.post(process.env.REACT_APP_FETCH_URL + "constraints", newConstraint);
      
      setTitle("");
      setDescription("");
      setEmployeeName("");

      // Fetch the updated constraints from the server
      fetchConstraints();
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

      // Fetch the updated constraints from the server
      fetchConstraints();
    } catch (error) {
      console.error("Error updating constraint:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(process.env.REACT_APP_FETCH_URL + `constraints/${id}`);

      // Fetch the updated constraints from the server
      fetchConstraints();
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
        {Array.isArray(constraints) && constraints.length > 0 ? (
          <ul className="constraints-list">
            {constraints.map((constraint) => (
              <li key={constraint._id} className="constraint-item">
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
        {editingConstraint && (
          <form onSubmit={handleUpdate} className="edit-form">
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
  margin: 0;
  padding: 0;
  background-image: url(https://miro.medium.com/v2/resize:fit:4000/format:webp/1*zh6zE-3VSIdMGkdnRH9X8w.jpeg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  min-height: 100vh;
  font-family: "Mona Sans", "Mona Sans Header Fallback", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";

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
  display: flex;
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



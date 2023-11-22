import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';

const formStyle = { margin: "20px 20px" };
const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };

const apiUrl = "http://localhost:8080/api/";

const Candidate = ({ editMode, candidateData }) => {
  const navigate = useNavigate();
  let { id } = useParams();

  if (!editMode && candidateData) {
    id = id ? id : candidateData.id;
  }
  
  if (candidateData) {
    editMode = true;
  }
  console.log(id);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    pincode: "",
    satScore: "",
  });

  const [candidates, setCandidates] = useState([]);
  const [isNameUnique, setIsNameUnique] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setIsNameUnique(true);
  };

  const addCandidate = async (e) => {
    e.preventDefault();

    const isUnique = editMode ? true : candidates.every(candidate => {
      console.log(candidates);
      return candidate.name !== formData.name
    }
    );

    if (!isUnique) {
      setIsNameUnique(false);
      return;
    }

    try {
      const response = await fetch(apiUrl + "addCandidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setCandidates((prevCandidates) => [...prevCandidates, data]);
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchData = async (tableName) => {
      try {
        const response = await fetch(apiUrl + tableName);
        const data = await response.json();
        setCandidates(data);
        if (editMode) {
          setFormData(data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (editMode) {
      fetchData(`getCandidate/${id}`);
    } else {
      fetchData(`candidates?sortBy=name`);
    }
  }, [editMode, id]);

  const renderTextField = (name, label, disabled = false) => (
    <TextField
      id={name}
      name={name}
      label={label}
      variant="standard"
      fullWidth
      value={formData[name]}
      onChange={handleChange}
      disabled={disabled}
    />
  );

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "#1976d2" }}>{editMode ? "Edit Candidate" : "Add Candidate"}</h1>
        <form style={formStyle} noValidate autoComplete="off">
          {renderTextField("name", "Name", editMode)}
          {renderTextField("address", "Address", editMode)}
          {renderTextField("city", "City", editMode)}
          {renderTextField("country", "Country", editMode)}
          {renderTextField("pincode", "Pincode", editMode)}
          {renderTextField("satScore", "SAT score")}

          {!isNameUnique && (
            <p style={{ color: "red" }}>Error: Name must be unique.</p>
          )}
        </form>
        <Button variant="outlined" onClick={addCandidate}>
          {editMode ? "Update" : "Submit"}
        </Button>
      </Paper>
    </Container>
  );
};

export default Candidate;

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button } from "@mui/material";

const formStyle = { margin: "20px 20px" };
const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };

export default function Candidate() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    satScore: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addCandidate = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add logic to submit or process the form data
  };

  const renderTextField = (name, label) => (
    <TextField
      id={name}
      name={name}
      label={label}
      variant="standard"
      fullWidth
      value={formData[name]}
      onChange={handleChange}
    />
  );

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}>Add Candidate</h1>
        <form style={formStyle} noValidate autoComplete="off">
          {renderTextField("name", "Name")}
          {renderTextField("address", "Address")}
          {renderTextField("city", "City")}
          {renderTextField("pincode", "Pincode")}
          {renderTextField("satScore", "SAT score")}
          <Button variant="outlined" onClick={addCandidate}>
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

import React, { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Paper, Button } from "@mui/material";
import CommonDialog from './CommonDialog';

const apiUrl = "http://localhost:8080/api/";

const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };

export default function DeleteRecord() {
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [candidateData, setCandidateData] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl + "candidates?sortBy=name");
                const data = await response.json();
                setCandidates(data);
            } catch (error) {
                setDialogContent({ module: "Delete Candidate", content: error });
                setDialogOpen(true);
            }
        };

        fetchData();
    }, []);

    const updateSelection = (event) => {
        const selectedValue = event.target.value;
        const candidateData = candidates[selectedValue - 1];
        setSelectedCandidate(selectedValue);
        setCandidateData(candidateData);
    }

    const deleteCandidate = async (id) => {
        try {
            const response = await fetch(apiUrl + `deleteCandidate/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                const updatedCandidates = candidates.filter((candidate) => candidate.id !== id);
                setCandidates(updatedCandidates);
                setSelectedCandidate("");
            } else {
                setDialogContent({ module: "Delete Candidate", content: "Something went wrong while deleting candidate!" });
                setDialogOpen(true);
            }
        } catch (error) {
            setDialogContent({ module: "Delete Candidate", content: error });
            setDialogOpen(true);
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <div>
            <h1 style={{ color: "#1976d2" }}>Delete Candidate</h1>

            <p>Choose a candidate:</p>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                    value={selectedCandidate || ""}
                    onChange={updateSelection}

                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {candidates.map((row, index) => (
                        <MenuItem value={index + 1} key={row.id}>{row.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {selectedCandidate &&
                <Paper elevation={3} style={paperStyle}>
                    <p>Are you sure want the delete the <b>
                        {candidateData.name}</b> candidate?</p>
                    <Button color="warning" variant="outlined" onClick={() => deleteCandidate(candidateData.id)}>
                        Delete
                    </Button>
                </Paper>}
            <CommonDialog open={dialogOpen} handleClose={handleDialogClose} dialogContent={dialogContent} />
        </div>
    )
}
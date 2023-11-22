import React, { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Candidate from "./candidate";

const apiUrl = "http://localhost:8080/api/";

export default function UpdateScore() {
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [candidateData, setCandidateData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl + "candidates?sortBy=-satScore");
                const data = await response.json();
                setCandidates(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    const updateScore = (event) => {
        const selectedValue = event.target.value;
        const candidateData = candidates[selectedValue - 1];
        setSelectedCandidate(selectedValue);
        setCandidateData(candidateData);
    }
    
    return (
        <div>
            <h1 style={{ color: "#1976d2" }}>Update Candidate</h1>

            <p>Choose a candidate:</p>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                    value={selectedCandidate || ""}
                    onChange={updateScore}

                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {candidates.map((row, index) => (
                        <MenuItem value={index + 1} key={row.id}>{row.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {selectedCandidate && <Candidate candidateData={candidateData}/>}
            </div>
            )
}
import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CommonDialog from './CommonDialog';

const tableContainerStyle = { padding: "30px 10px", width: 1200, margin: "20px auto" };
const tableStyle = { width: 1100, margin: "auto", borderCollapse: "collapse", borderRadius: "5px" };

const apiUrl = "http://localhost:8080/api/";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    backgroundColor: "lightgray",
}));


export default function GetRank() {

    const [candidates, setCandidates] = useState([]);
    const [selectedRank, setSelectedRank] = useState(null);
    const [checkPass, setCheckPass] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl + "candidates?sortBy=-satScore");
                const data = await response.json();
                setCandidates(data);
            } catch (error) {
                setDialogContent({ module: "Update Score", content: error });
                setDialogOpen(true);
            }
        };

        fetchData();
    }, []);

    const setRank = (event) => {
        const selectedValue = event.target.value;
        const selectedCandidate = candidates[selectedValue - 1];
        setSelectedRank(selectedValue);
        if (selectedCandidate.pass) {
            setCheckPass(selectedValue)
        } else {
            setCheckPass("Fail");
        }
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <div>
            <h1 style={{ color: "#1976d2" }}>Rank Order</h1>

            <p>Choose a candidate:</p>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                    value={selectedRank || ""}
                    onChange={setRank}

                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {candidates.map((row, index) => (
                        <MenuItem value={index + 1} key={row.id}>{row.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {selectedRank && <p>Selected Rank: {checkPass}</p>}
            <TableContainer component={Paper} style={tableContainerStyle}>

                <Table style={tableStyle} sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Address</StyledTableCell>
                            <StyledTableCell>City</StyledTableCell>
                            <StyledTableCell>Country</StyledTableCell>
                            <StyledTableCell>Pincode</StyledTableCell>
                            <StyledTableCell>SAT Score</StyledTableCell>
                            <StyledTableCell>Rank</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {candidates.map((row, index) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell>{row.address}</StyledTableCell>
                                <StyledTableCell>{row.city}</StyledTableCell>
                                <StyledTableCell>{row.country}</StyledTableCell>
                                <StyledTableCell>{row.pincode}</StyledTableCell>
                                <StyledTableCell style={{ color: row.pass ? 'green' : 'red', fontWeight: "600" }}>{row.satScore}</StyledTableCell>
                                <StyledTableCell>{row.pass ? index + 1 : "-"}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CommonDialog open={dialogOpen} handleClose={handleDialogClose} dialogContent={dialogContent} />
        </div>
    );
}
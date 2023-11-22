import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
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


export default function Home() {
  const navigate = useNavigate();

  const [candidates, setCandidates] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState([]);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + "candidates");
        const data = await response.json();
        setCandidates(data);
      } catch (error) {
        setDialogContent({ module: "Update Score", content: error });
        setDialogOpen(true);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/candidate/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(apiUrl + `deleteCandidate/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedCandidates = candidates.filter((candidate) => candidate.id !== id);
        setCandidates(updatedCandidates);
      } else {
        setDialogContent({ module: "Update Score", content: "Failed to delete candidate, try again!" });
        setDialogOpen(true);
      }
    } catch (error) {
      setDialogContent({ module: "Update Score", content: error });
      setDialogOpen(true);
    }
  };



  return (
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
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidates.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell>{row.address}</StyledTableCell>
              <StyledTableCell>{row.city}</StyledTableCell>
              <StyledTableCell>{row.country}</StyledTableCell>
              <StyledTableCell>{row.pincode}</StyledTableCell>
              <StyledTableCell style={{ color: row.pass ? 'green' : 'red', fontWeight: "600" }}>{row.satScore}</StyledTableCell>
              <StyledTableCell>
                <EditIcon style={{ color: 'blue' }} onClick={() => handleEdit(row.id)} />
                <DeleteIcon style={{ color: 'red' }} onClick={() => handleDelete(row.id)} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <CommonDialog open={dialogOpen} handleClose={handleDialogClose} dialogContent={dialogContent} />
    </TableContainer>
  );
}

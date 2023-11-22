import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from "react-router-dom";

const linkStyle = {
    textDecoration: "none",
    color: "#1976d2",
};

const buttonStyle = {
    backgroundColor: "white",
};

export default function NoPage() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '94vh',
                backgroundColor: "#1976d2",
            }}
        >
            <Typography variant="h1" style={{ color: 'white' }}>
                404
            </Typography>
            <Typography variant="h6" style={{ color: 'white' }}>
                The page you’re looking for doesn’t exist.
            </Typography>
            <Button style={buttonStyle} variant="outlined"><Link to="/delete-record" style={linkStyle}>
                Back to Home
            </Link></Button>
        </Box>
    );
}
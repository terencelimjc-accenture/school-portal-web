import { 
    Typography,
    Container,
    Box, 
    Button,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableContainer,
    Paper,
} from '@mui/material';
import {
    Link
} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getTeachers } from '../../api/teacher';
import StyledTableCell from '../../components/CustomTableCell';

export const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    
    useEffect(() => {
        getTeachers().then((response) => {
            setTeachers(response.data.data);
        })
    }, []);

    return (
        <>
            <Box
                sx={{
                    marginTop: '2.5rem',
                    marginBottom: '1.5rem',
                }}
            >
                <Typography
                    sx={{
                        display: 'inline',
                        fontWeight: '800',
                        fontSize: '1.5rem',
                    }}
                >
                    Teachers
                </Typography>
                <Button variant='contained'
                    sx={{
                        float: 'right',
                        textTransform: 'none'
                    }}
                    component={Link}
                    to='add' 
                >
                    + Add Teacher
                </Button>
            </Box>
            <Container maxWidth='false'
                sx={{
                    backgroundColor: '#FFFFFF',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '1.5rem',
                    boxShadow: '0px 2px 6px 0px #00000033'
                }}
            >
                {teachers.length < 1 ?
                    <Box
                        sx={{
                            minHeight: '60vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: '800',
                                fontSize: '1rem',
                                marginBottom: '1.5rem',
                            }}
                        >
                            There are no existing teachers yet.
                        </Typography>
                    </Box> :
                    <TableContainer component={ Paper }>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>#</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Subject</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Work Contact</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {teachers.map((row, index) => (
                                <TableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell>{row.name}</StyledTableCell>
                                <StyledTableCell>{row.subject}</StyledTableCell>
                                <StyledTableCell>{row.email}</StyledTableCell>
                                <StyledTableCell>{row.contactNumber}</StyledTableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </Container>
        </>
    );
};
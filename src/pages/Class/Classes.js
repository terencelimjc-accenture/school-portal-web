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
import { getClasses } from '../../api/class';
import StyledTableCell from '../../components/CustomTableCell';

export const Classes = () => {
    const [classes, setClasses] = useState([]);
    
    useEffect(() => {
        getClasses().then((response) => {
            setClasses(response.data.data);
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
                    Classes
                </Typography>
                <Button variant='contained'
                    sx={{
                        float: 'right',
                        textTransform: 'none'
                    }}
                    component={Link}
                    to='add' 
                >
                    + Add Class
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
                {classes.length < 1 ?
                
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
                            There are no existing classes yet.
                        </Typography>
                    </Box> :
                    <TableContainer component={ Paper }>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>#</StyledTableCell>
                                <StyledTableCell>Class Level</StyledTableCell>
                                <StyledTableCell>Class Name</StyledTableCell>
                                <StyledTableCell>Form Teacher</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {classes.map((row, index) => (
                                <TableRow key={index}>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell>{row.level}</StyledTableCell>
                                <StyledTableCell>{row.name}</StyledTableCell>
                                <StyledTableCell>{row.formTeacher.name}</StyledTableCell>
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
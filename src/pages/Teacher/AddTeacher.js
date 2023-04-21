import { 
    Typography,
    Container,
    Box, 
    Button,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    FormHelperText,
    Alert, 
    Collapse
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addTeacher } from '../../api/teacher';
import { commonInputRegex, contactNumberRegex, emailRegex } from '../../helper';

const SUBJECTS = [
    'English Language',
    'Mother Tongue Language',
    'Mathematics',
    'Science',
    'Art',
    'Music',
    'Physical Education',
    'Social Studies',
    'Character and Citizenship Education'
]

export const AddTeacher = () => {
    const navigate = useNavigate();
    let valid = false;

    const [openAlert, setOpenAlert] = useState(false);

    const [teacherValues, setTeacherValues] = useState({
        name: '', subject: '', email: '', contactNumber: ''
    });

    
    const setTeacher = name => {
        return ({ target: { value } }) => {
            if (value.trim() === '') {
                setError(name, 'Ensure that the field above is filled.');
            } else if (name === 'name' && !commonInputRegex.test(value.trim())) {
                setError(name, 'Valid characters are A-Z a-z 0-9 -.');
            } else if (name === 'contactNumber' && !contactNumberRegex.test(value.trim())) {
                setError(name, 'Contact number must start with (6, 8, 9) and must be 8 numbers long.');
            } else if (name === 'email' && !emailRegex.test(value.trim())) {
                setError(name, 'Email address is invalid.');
            } else {
                setError(name, '');
            }
            setTeacherValues(oldTeacherValues => ({...oldTeacherValues, [name]: value }));
        };
    };

    
    const [errorValues, seterrorValues] = useState({
        name: '', subject: '', email: '', contactNumber: ''
    });

    
    const setError = (name, value) => {
        seterrorValues(oldErrorValues => ({...oldErrorValues, [name]: value }));
    };

    const addNewTeacher = e => {
        e.preventDefault();
        valid = true;
        Object.entries(teacherValues).forEach(([key, value]) => {
            if (value.trim() === '') {
                setError(key, 'Ensure that the field above is filled.');
                valid = false;
            } else if (key === 'name' && !commonInputRegex.test(value.trim())) {
                setError(key, 'Valid characters are A-Z a-z 0-9 -.');
                valid = false;
            } else if (key === 'contactNumber' && !contactNumberRegex.test(value.trim())) {
                setError(key, 'Contact number must start with (6, 8, 9) and must be 8 numbers long.');
                valid = false;
            } else if (key === 'email' && !emailRegex.test(value.trim())) {
                setError(key, 'Email address is invalid.');
                valid = false;
            }
        });
        if (valid) {
            // Call API to add teacher
            addTeacher(teacherValues).then((response) => {
                if (response.status === 201) {
                    // Redirect to /teacher
                    navigate("/teacher");
                }
            }).catch((err) => {
                setOpenAlert(true);
            });
        }
    };

    return (
        <>
            <Typography
                sx={{
                    fontWeight: '800',
                    fontSize: '1.5rem',
                    marginTop: '2.5rem',
                    marginBottom: '1.5rem',
                }}
            >
                Add Teacher
            </Typography>
            <Collapse in={openAlert}>
                <Alert severity="error"
                    sx={{
                        marginBottom: '1rem'
                    }}
                >
                    Failed to add Teacher, please ensure the following before trying again.
                    <ul>
                        <li>Email is not currently being associated with another teacher</li>
                    </ul>
                </Alert>
            </Collapse>
            <form onSubmit={addNewTeacher}>
                <Container
                    maxWidth='false'
                    sx={{
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0px 2px 6px 0px #00000033',
                        padding: '1.5rem',
                        '& .MuiFormControl-root': { 
                            xs: {marginTop: '2ch', width: '30ch'},
                            md: {width: '45ch'} 
                        },
                    }}
                >
                    <div>
                        <TextField
                            label='Name'
                            id='name'
                            autoComplete='name'
                            variant='standard'
                            InputLabelProps={{shrink: true}}
                            value={teacherValues.name}
                            placeholder='Name'
                            onChange={setTeacher('name')}
                            InputProps={{error: errorValues.name !== ''}}
                            FormHelperTextProps={{error: errorValues.name !== ''}}
                            helperText={errorValues.name}
                        />
                    </div>
                    <div>
                        <FormControl>
                            <InputLabel id='subject-label' shrink variant='standard'>Subject</InputLabel>
                            <Select
                                labelId='subject-label'
                                id='subject'
                                onChange={setTeacher('subject')}
                                autoComplete='subject'
                                variant='standard'
                                error={errorValues.subject !== ''}
                                displayEmpty
                                defaultValue={''}
                                renderValue={
                                    teacherValues.subject === '' ? () =>
                                    <div style={{
                                        color: '#9B9B9B'
                                    }}>Select a subject</div> : () =>
                                    teacherValues.subject
                                }
                            >
                                {SUBJECTS.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText
                                error={errorValues.subject !== ''}
                                variant='standard'
                            >
                                {errorValues.subject}
                            </FormHelperText>
                        </FormControl>
                    </div>
                    <div>
                        <TextField
                            label='Email Address'
                            id='email'
                            autoComplete='email'
                            variant='standard'
                            InputLabelProps={{shrink: true}}
                            value={teacherValues.email}
                            onChange={setTeacher('email')}
                            InputProps={{error: errorValues.email !== ''}}
                            FormHelperTextProps={{error: errorValues.email !== ''}}
                            helperText={errorValues.email}
                        />
                    </div>
                    <div>
                        <TextField
                            label='Work Contact Number'
                            id='contactNumber'
                            autoComplete='mobile'
                            variant='standard'
                            pattern='[0-9]*'
                            InputLabelProps={{shrink: true}}
                            value={teacherValues.contactNumber}
                            onChange={setTeacher('contactNumber')}
                            InputProps={{error: errorValues.contactNumber !== ''}}
                            FormHelperTextProps={{error: errorValues.contactNumber !== ''}}
                            helperText={errorValues.contactNumber}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                        />
                    </div>
                </Container>
                <Box
                    sx={{
                        textAlign: 'right',
                        marginTop: '1.5rem'
                    }}
                >
                    <Button variant='outlined'
                        sx={{
                            textTransform: 'none'
                        }}
                        component={Link}
                        to='/teacher'
                    >
                        <ArrowBackIcon
                            sx={{
                                marginRight: '0.5rem'
                            }}
                            fontSize='small'
                        />
                        Back
                    </Button>
                    <Button 
                        variant='contained'
                        sx={{
                            marginLeft: '1rem',
                            textTransform: 'none'
                        }}
                        type='submit'
                    >
                        Add Teacher
                    </Button>
                </Box>
            </form>
        </>
    );
};
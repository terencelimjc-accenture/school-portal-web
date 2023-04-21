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
    Collapse,
    Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUnassignedTeachers } from '../../api/teacher';
import { addClass } from '../../api/class';
import { commonInputRegex } from '../../helper';

const LEVELS = [
    'Primary 1',
    'Primary 2',
    'Primary 3',
    'Primary 4',
    'Primary 5',
    'Primary 6',
]

export const AddClass = () => {
    const navigate = useNavigate();
    let valid = false;

    const [openAlert, setOpenAlert] = useState(false);

    const [unassignedTeachers, setUnassignedTeachers] = useState([]);
    
    useEffect(() => {
        getUnassignedTeachers().then((response) => {
            setUnassignedTeachers(response.data.data);
        })
    }, []);

    const [classValues, setClassValues] = useState({
        level: '', name: '', teacher: {
            name: '',
            subject: '',
            email: '',
            contactNumber: ''
        }
    });

    
    const setClass = name => {
        return ({ target: { value } }) => {
            if ((typeof value === 'string' && value.trim() === '') ||
            (typeof value === 'object' && value.email && value.email.trim() === '')) {
                setError(name, 'Ensure that the field above is filled.');
            } else if (name === 'name' && !commonInputRegex.test(value.trim())) {
                setError(name, 'Valid characters are A-Z a-z 0-9 -.');
            } else {
                setError(name, '');
            }
            setClassValues(oldClassValues => ({...oldClassValues, [name]: value }));
        };
    };

    
    const [errorValues, seterrorValues] = useState({
        level: '', name: '', teacher: ''
    });

    
    const setError = (name, value) => {
        seterrorValues(oldErrorValues => ({...oldErrorValues, [name]: value }));
    };

    const addNewClass = e => {
        e.preventDefault();
        valid = true;
        Object.entries(classValues).forEach(([key, value]) => {
            if ((typeof value === 'string' && value.trim() === '') ||
            (typeof value === 'object' && value.email !== undefined && value.email.trim() === '')) {
                setError(key, 'Ensure that the field above is filled.');
                valid = false;
            } else if (key === 'name' && !commonInputRegex.test(value.trim())) {
                setError(key, 'Valid characters are A-Z a-z 0-9 -.');
                valid = false;
            } 
        });
        if (valid) {
            console.log("CALL API");
            // Call API to add class
            addClass({
                level: classValues.level,
                name: classValues.name,
                teacherEmail: classValues.teacher.email
            }).then((response) => {
                if (response.status === 201) {
                    // Redirect to /class
                    navigate("/class");
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
                Add Class
            </Typography>
            <Collapse in={openAlert}>
                <Alert severity="error"
                    sx={{
                        marginBottom: '1rem'
                    }}
                >
                    Failed to add Class, please try again.
                </Alert>
            </Collapse>
            <form onSubmit={addNewClass}>
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
                        <FormControl>
                            <InputLabel id='level-label' shrink variant='standard'>Class Level</InputLabel>
                            <Select
                                labelId='level-label'
                                id='level'
                                value={classValues.level}
                                onChange={setClass('level')}
                                autoComplete='level'
                                variant='standard'
                                error={errorValues.level !== ''}
                                displayEmpty
                                defaultValue={''}
                                renderValue={
                                    classValues.level === '' ? () =>
                                    <div style={{
                                        color: '#9B9B9B'
                                    }}>Select a level</div> : () =>
                                    classValues.level
                                }
                            >
                                {LEVELS.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText
                                error={errorValues.level !== ''}
                                variant='standard'
                            >
                                {errorValues.level}
                            </FormHelperText>
                        </FormControl>
                    </div>
                    <div>
                        <TextField
                            label='Class Name'
                            id='name'
                            autoComplete='name'
                            variant='standard'
                            InputLabelProps={{shrink: true}}
                            value={classValues.name}
                            placeholder='Name'
                            onChange={setClass('name')}
                            InputProps={{error: errorValues.name !== ''}}
                            FormHelperTextProps={{error: errorValues.name !== ''}}
                            helperText={errorValues.name}
                        />
                    </div>
                    <div>
                        <FormControl>
                            <InputLabel id='teacher-label' shrink variant='standard'>Form Teacher</InputLabel>
                            <Select
                                labelId='teacher-label'
                                id='teacher'
                                onChange={setClass('teacher')}
                                variant='standard'
                                error={errorValues.teacher !== ''}
                                displayEmpty
                                defaultValue={''}
                                renderValue={
                                    classValues.teacher.name === '' ? () =>
                                    <div style={{
                                        color: '#9B9B9B'
                                    }}>Assign a form teacher</div> : () =>
                                    classValues.teacher.name
                                }
                            >
                                {
                                    unassignedTeachers.length < 1 ?
                                    <MenuItem key='empty' value=''
                                        sx={{
                                            display: 'block'
                                        }}
                                    >
                                        <p style={{
                                            margin: '0'
                                        }}>No existing teachers.</p>
                                        <Link to='/teacher/add'>Add a teacher</Link>
                                    </MenuItem> :
                                    unassignedTeachers.map((teacher) => (
                                        <MenuItem key={teacher.email} value={teacher}>
                                            {teacher.name}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                            <FormHelperText
                                error={errorValues.teacher !== ''}
                                variant='standard'
                            >
                                {errorValues.teacher}
                            </FormHelperText>
                        </FormControl>
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
                        to='/class'
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
                        Add Class
                    </Button>
                </Box>
            </form>
        </>
    );
};
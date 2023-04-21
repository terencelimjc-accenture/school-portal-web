import React from 'react';
import { 
    AppBar,
    Toolbar,
    Box,
    Typography,
    IconButton,
    Menu,
    MenuItem
} from '@mui/material';
import {
    SchoolOutlined as SchoolOutlinedIcon,
    Menu as MenuIcon
} from '@mui/icons-material';
import { NavLink, Link } from "react-router-dom";
import styled from 'styled-components';

const NavLinkCustom = styled(NavLink)`
    color: inherit;
    padding: 1.25rem;
    text-decoration: none;
    font-weight: 600;
    &.active {
        border-bottom: 4px solid #135BB4;
    }
`;

const NavBar = () => {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar
            position='sticky'
            sx={{
                color: '#135BB4',
                backgroundColor: '#FFFFFF',
            }}
        >
            <Toolbar>
                <SchoolOutlinedIcon fontSize='large'
                    sx={{
                        marginRight: '0.5rem'
                    }}/>
                <Typography
                    sx={{
                        fontWeight: '800',
                        fontSize: '1.25rem',
                    }}
                >
                    School Portal
                </Typography>
                <Box sx={{
                    marginLeft: '4.5rem',
                    display: {
                        xs: 'none',
                        md: 'block'
                    }
                }}>
                    <NavLinkCustom to="class">Classes</NavLinkCustom>
                    <NavLinkCustom to="teacher">Teachers</NavLinkCustom>
                </Box>
                <Box sx={{
                    marginLeft: 'auto',
                    display: {
                        md: 'none'
                    }
                }}>
                    <IconButton
                        size="large"
                        aria-label="menu"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: "block", md: "none" }
                        }}
                    >
                        <MenuItem 
                            key='classes' 
                            component={Link}
                            to='/class' 
                            onClick={handleCloseNavMenu}>
                            Classes
                        </MenuItem>
                        <MenuItem 
                            key='teachers' 
                            component={Link}
                            to='/teacher' 
                            onClick={handleCloseNavMenu}>
                            Teachers
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';

export default function MiniMenu({ handleLogout, setShowEditUser }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ 
                            width: 50, 
                            height: 50, 
                            color: !open ? "#FFFFFF" : "#645FFB",
                            backgroundColor: !open ? 'transparent' : "#FFFFFF",
                            border: !open ? '3.5px solid #FFFFFF' : "3.5px solid #645FFB"
                            }}></Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 25,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem
                    sx={{
                        fontSize: 20,
                        fontFamily: ['Rubik', 'sans-serif'],
                        justifyContent: 'space-between',
                        gap: 3,
                        color: '#6164F4'
                    }}

                >
                    <DriveFileRenameOutlineTwoToneIcon
                        sx={{ height: 28, width: 28 }}
                        onClick={() => setShowEditUser(true)}
                    />Perfil
                </MenuItem>
                <MenuItem
                    sx={{
                        fontSize: 20,
                        fontFamily: ['Rubik', 'sans-serif'],
                        justifyContent: 'space-between',
                        gap: 3,
                        color: '#6164F4'
                    }}
                    onClick={handleLogout}
                >
                    <ExitToAppTwoToneIcon
                        sx={{ height: 28, width: 28 }}
                    />Logout
                </MenuItem>
            </Menu>
        </React.Fragment >
    );
}

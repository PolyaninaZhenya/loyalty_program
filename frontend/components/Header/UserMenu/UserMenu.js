import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link'
import AddIcon from '@mui/icons-material/Add';

const UserMenu = (props) => {
    const {user, logout} = props
    console.log(
        user
    )
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ml: 2}}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    {user && <Avatar sx={{width: 32, height: 32}} src={user.photoURL}/>}
                </IconButton>
            </Tooltip>
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
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <MenuItem>
                    <Link href={'/account'}>
                        <a style={{display: 'inline-flex'}}>
                            <ListItemIcon>
                                <PersonIcon/>
                            </ListItemIcon>
                            Личный кабинет
                        </a>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href={'/newProgram'}>
                        <a style={{display: 'inline-flex'}}>
                            <ListItemIcon>
                                <AddIcon/>
                            </ListItemIcon>
                            Добавить программу
                        </a>
                    </Link>
                </MenuItem>
                <Divider/>
                <MenuItem>
                    <Link href={'/settings'}>
                        <a style={{display: 'inline-flex'}}>
                            <ListItemIcon>
                                <Settings fontSize="small"/>
                            </ListItemIcon>
                            Настройки
                        </a>
                    </Link>
                </MenuItem>
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Выйти
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
};

export default UserMenu;
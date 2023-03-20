
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, SearchIconWrapper, StyledInputBase } from '../constant/CustomUtils';
import { setProductSearch } from '../redux/eterationSlice';

export default function Header() {
    const dispatch = useDispatch()
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const totalPrice = useSelector(({ eteration }) => eteration.totalPrice)
    const cartItems = useSelector(({ eteration }) => eteration.cartItems)

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <Badge badgeContent={cartItems.length} color="error">
                    <ShoppingCartIcon />
                </Badge>
                <Typography sx={{ ml: 1 }}>{totalPrice + ' ₺'}</Typography>
            </MenuItem>
            <MenuItem>
                <AccountCircle />
                <Typography sx={{ ml: 1 }}>Kerem</Typography>
            </MenuItem>
        </Menu>
    );
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Box sx={{ width:{xs: 0,md:'5%'} }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
                        onClick={() => window.location = `/`}
                    >
                        Eteration
                    </Typography>
                    <Box sx={{  width:{xs: 40,md:'13%'}}} />
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            onChange={(event) => {
                                if (event.target?.value?.length > 2 || event.target?.value?.length === 0) {
                                    dispatch(setProductSearch(event.target.value))
                                }
                            }}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, cursor: 'pointer' }}>
                        <Badge badgeContent={cartItems.length} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                        <Typography sx={{ mr: 3 }}>{totalPrice + ' ₺'}</Typography>

                        <AccountCircle />
                        <Typography data-testid='user text' sx={{ mr: 3 }} >Kerem</Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </Box>
    );
}



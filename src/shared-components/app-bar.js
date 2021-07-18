import React, { useRef } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import FilterIcon from '@material-ui/icons/FilterListOutlined';
import SortIcon from '@material-ui/icons/SortOutlined';
import { Divider } from '@material-ui/core';
import auth from '../auth';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar({ cartCount, onOpenCartDialog, 
  searchProductName, filterProductByCategory, sortProduct, sortName, sortPrice }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [filterMoreAnchorEl, setFilterMoreAnchorEl] = React.useState(null);
  const [sortAnchorEl, setSortAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isFilterMenuOpen = Boolean(filterMoreAnchorEl);
  const isSortMenuOpen = Boolean(sortAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleFilterMenuOpen = (event) => {
    setFilterMoreAnchorEl(event.currentTarget);
  }

  const handleFilterMenuClose = () => {
    setFilterMoreAnchorEl(null);
  }

  const handleSortMenuOpen = (event) => {
    setSortAnchorEl(event.currentTarget);
  }

  const handleSortMenuClose = () => {
    setSortAnchorEl(null);
  }

  // const menuId = 'primary-search-account-menu';
  // const renderMenu = (
  //   !auth.isAuthenticated() ? <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>My account</MenuItem>
  //   </Menu> : null
  // );

  const filterMenuId = 'filter-menu';
  const renderFilterMenu = (
    !auth.isAuthenticated() ? <Menu
      anchorEl={filterMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={filterMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isFilterMenuOpen}
      onClose={handleFilterMenuClose}
    >
      <MenuItem onClick={() => filterProductByCategory(1)}>Regular</MenuItem>
      <MenuItem onClick={() => filterProductByCategory(2)}>Special</MenuItem>
    </Menu> : null
  );

  const sortMenuId = 'sort-menu';
  const renderSortMenu = (
    !auth.isAuthenticated() ? <Menu
      anchorEl={sortAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={sortMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isSortMenuOpen}
      onClose={handleSortMenuClose}
    >
      <MenuItem onClick={() => sortProduct(sortName, 'name')}>Name</MenuItem>
      <MenuItem onClick={() => sortProduct(sortPrice, 'price')}>Price</MenuItem>
    </Menu> : null
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    !auth.isAuthenticated() ? <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton onClick={onOpenCartDialog} color="inherit">
          <FilterIcon />
        </IconButton>
        <p>Filter</p>
      </MenuItem>
      <MenuItem>
        <IconButton onClick={onOpenCartDialog} color="inherit">
          <SortIcon />
        </IconButton>
        <p>Sort</p>
      </MenuItem>
      <MenuItem>
        <IconButton onClick={onOpenCartDialog} color="inherit">
          <Badge badgeContent={cartCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu> : null
  );




  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            {!auth.isAuthenticated() ? 'Art-eCommerce' : 'Hi Admin'}
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onKeyDown={(e) => searchProductName(e)}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          {
            !auth.isAuthenticated() ?
              <div className={classes.sectionDesktop}>
                <IconButton onClick={handleFilterMenuOpen} color="inherit">
                  <FilterIcon />
                </IconButton>
                <IconButton onClick={handleSortMenuOpen} color="inherit">
                  <SortIcon />
                </IconButton>
                <IconButton onClick={onOpenCartDialog} aria-label="show 17 new notifications" color="inherit">
                  <Badge badgeContent={cartCount} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </div> : null
          }
          {
            !auth.isAuthenticated() ? <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div> : null
          }
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {/* {renderMenu} */}
      {renderFilterMenu}
      {renderSortMenu}
    </div>
  );
}

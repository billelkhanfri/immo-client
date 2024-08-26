import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  Box,
  Container,
  SvgIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import NavIcon from "../assets/immo-logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/apiCalls/authApiCall";

const pages = [
  { label: "Créer une offre", to: "/creer-une-offre" },
  { label: "Mes offres", to: "/mes-offres" },
  { label: "Mon réseau", to: "/mon-reseau" },
  { label: "Referrals", to: "/referrals" }

];

function Navigation() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDisconnect = () => {
    handleCloseUserMenu();
    dispatch(logoutUser());
  };

  return (
    <>
      <AppBar position="sticky" color="" elevation={0}>
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link to={"/"}>
                <img src={NavIcon} alt="" />
              </Link>
            </Typography>
            {user ? (
              <>
                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon sx={{ fontSize: "36px" }} />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    {pages.map((page) => (
                      <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                        <Typography
                          textAlign="center"
                          to={page.to}
                          component={Link}
                        >
                          {page.label}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>

                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <Link to={"/"}>
                    <img src={NavIcon} alt="logo-icon" />
                  </Link>
                </Typography>

                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                    justifyContent: "flex-end",
                  }}
                >
                  {pages.map((page) => (
                    <Button
                      component={Link}
                      key={page.label}
                      onClick={handleCloseNavMenu}
                      sx={{
                        m: 2,
                        color: "",
                        display: "block",
                        minWidth: 100,
                        border: "1px solid",
                        borderColor: "primary.main",
                        "&:first-of-type": {
                          backgroundColor: "primary.main",
                          color: "white",
                        },
                      }}
                      to={page.to}
                    >
                      {page.label}
                    </Button>
                  ))}
                </Box>

                <Box sx={{ flexGrow: 0, marginLeft: "16px" }}>
                  <Tooltip title="Paramètres utilisateur" arrow>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={user?.firstName + "" + "profil picture"}
                        src={user?.profilePhoto}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      component={Link}
                      to={`/mon-profil/${user.id}`}
                    >
                      Mon Profil
                    </MenuItem>
                    <MenuItem onClick={handleDisconnect}>
                      Me déconnecter
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              // Not Connected
              <>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h5"
                    noWrap
                    sx={{
                      mr: 2,
                      display: { xs: "flex", md: "none" },
                      flexGrow: 1,
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    <Link to={"/"}>
                      <img src={NavIcon} alt="" />
                    </Link>
                  </Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" component={Link} to="/inscription">
                    S'inscrire
                  </Button>
                  <Button
                    component={Link}
                    to="/se-connecter"
                    variant="contained"
                  >
                    Se connecter
                  </Button>
                </Stack>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Navigation;

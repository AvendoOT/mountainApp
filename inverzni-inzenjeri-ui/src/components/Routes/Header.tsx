import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { LoginLogoutButton } from "../LoginLogoutButton/LoginLogoutButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { isMobile } from "react-device-detect";
import "./Header.css";
import { Badge } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";

export const Header = () => {
  const { isLoggedIn } = useSelector(
    (state: RootState) => state.authentication
  );
  const { notificationCounter } = useSelector(
    (state: RootState) => state.notification
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
    },
    typography: { fontSize: 16 },
  });
  const style = { background: "#2e82f4", boxShadow: "none" };
  const floatRight = { marginLeft: "auto" };

  if (isMobile) {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <AppBar className="appBar" style={style} position="static">
            <Toolbar>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="primary"
              >
                Izbornik
              </Button>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className="menu"
              >
                <a href="/">
                  {isLoggedIn ? <MenuItem>NASLOVNICA</MenuItem> : null}
                </a>
                <a href="/events/create">
                  {isLoggedIn ? <MenuItem>NOVI DOGAĐAJ</MenuItem> : null}
                </a>
                <a href="/trips">
                  <MenuItem>PLANINARSKI IZLETI</MenuItem>
                </a>
                <a href="/createTrip">
                  {isLoggedIn ? <MenuItem>KREIRAJ IZLET</MenuItem> : null}
                </a>
              </Menu>
              {isLoggedIn ? (
                <div style={floatRight}>
                  <Button href="/notification">
                    <Badge
                      badgeContent={notificationCounter}
                      max={99}
                      color="primary"
                    >
                      <MailIcon />
                    </Badge>
                  </Button>
                  <Button href="/myProfile" color="primary">
                    Profil
                  </Button>
                  <LoginLogoutButton />
                </div>
              ) : (
                <div style={floatRight}>
                  <LoginLogoutButton />
                </div>
              )}
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </div>
    );
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar style={style} position="static">
          <Toolbar className="appBar">
            {isLoggedIn ? (
              <Button href="/" color="primary">
                Naslovnica
              </Button>
            ) : null}
            {isLoggedIn ? (
              <Button href="/events/create" color="primary">
                Novi događaj
              </Button>
            ) : null}
            <Button href="/trips" color="primary">
              Planinarski izleti
            </Button>
            {isLoggedIn ? (
              <Button href="/createTrip" color="primary">
                Kreiraj izlet
              </Button>
            ) : null}
            {isLoggedIn ? (
              <div style={floatRight}>
                {/*<Button href="/notification">*/}
                {/*  <Badge*/}
                {/*    badgeContent={notificationCounter}*/}
                {/*    max={99}*/}
                {/*    color="primary"*/}
                {/*  >*/}
                {/*    <MailIcon />*/}
                {/*  </Badge>*/}
                {/*</Button>*/}
                <Button href="/myProfile" color="primary">
                  Profil
                </Button>
                <LoginLogoutButton />
              </div>
            ) : (
              <div style={floatRight}>
                <LoginLogoutButton />
              </div>
            )}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

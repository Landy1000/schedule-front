import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import { useSelector, useDispatch } from 'react-redux';
import { push } from "connected-react-router"
import { getIsSignedIn } from "../../reducks/users/selectors";
import { signOut } from '../../reducks/users/operations';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: "#4dd0e1"
  },
  toolBar: {
    margin: '0 auto',
    maxWidth: 1024,
    width: '100%'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state)
  const isSignedIn = getIsSignedIn(selector)

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={()=>dispatch(push('/'))}>
            <HomeIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <div onClick={()=>dispatch(push('/'))}>Share Schedule</div>
          </Typography>
          {isSignedIn && (
            <Button color="inherit" onClick={() => dispatch(signOut())}>Logout</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;




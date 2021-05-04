import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import CardActionArea from '@material-ui/core/CardActionArea';
import { useDispatch } from 'react-redux';
import {push} from 'connected-react-router'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { deleteRoom } from '../../reducks/rooms/operations';


//import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RoomCard(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar aria-label="room" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <>
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={()=>{
                    dispatch(push("/room/"+props.id))
                    handleClose()
                  }}
                >
                  編集する
                </MenuItem>
                <MenuItem
                  onClick={()=>{
                    dispatch(deleteRoom(props.id))
                    handleClose()
                  }}
                >
                  削除する
                </MenuItem>
              </Menu>
            </>
          }
          title={<div onClick={()=>dispatch(push("/room/"+props.id))} key={props.id}>{props.name}</div>}
          // subheader=roommates
        />
        </CardActionArea>
    </Card>
  );
}
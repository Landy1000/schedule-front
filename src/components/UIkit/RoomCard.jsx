import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import CardActionArea from '@material-ui/core/CardActionArea';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { useDispatch } from 'react-redux';
import {push} from 'connected-react-router'
import { deleteRoom } from '../../reducks/rooms/operations';

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
      
        <CardHeader
          avatar={
            <Avatar aria-label="room" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <>
              <IconButton aria-label="settings" onClick={handleClick}>
                <DeleteIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
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
          title={<CardActionArea><div className="room-card" onClick={()=>dispatch(push("/room/"+props.id))} key={props.id}>{props.name}</div></CardActionArea>}
          // subheader="roommates"
        />
    </Card>
  );
}
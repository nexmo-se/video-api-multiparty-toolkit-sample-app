import React, { useState, useRef } from 'react';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import styles from './styles';

export default function SingleParticipantView({ roomName }) {
  const urlRef = useRef();
  const classes = styles();
  const [copiedMeetingUrl, setCopiedMeetingUrl] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  //Maybe use a ref instead
  const copyUrl = () => {
    //https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(
      () => {
        setOpen(prev => !prev);

        console.log('Copy successfully');
      },
      () => {
        console.log('Copy failed');
      }
    );
  };
  return (
    <div className={classes.banner}>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <div className={classes.flexCentered}>
            <EmojiEmotionsIcon style={{ fontSize: 100 }}></EmojiEmotionsIcon>
          </div>
          <p>
            Waiting for other participants. You can invite them by<br></br>
            sharing this meeting link.
          </p>
          <TextField
            variant="outlined"
            value={window.location.href}
            InputProps={{
              readOnly: true,
              className: classes.textField
            }}
            InputLabelProps={{
              classes: classes.textField
            }}
            fullWidth={true}
          />
        </CardContent>
        <CardActions>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Button
              edge="end"
              color="primary"
              variant="contained"
              onClick={copyUrl}
            >
              Copy meeting URL
              {open ? (
                <div className={classes.acCopySuccess}>Copied</div>
              ) : null}
            </Button>
          </ClickAwayListener>
        </CardActions>
      </Card>
    </div>
  );
}

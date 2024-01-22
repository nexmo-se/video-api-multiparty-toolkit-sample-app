import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import useSignal from '../../hooks/useSignal';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import EmojiEmotions from '@mui/icons-material/EmojiEmotions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

export default function ReactionsButton({ classes, room }) {
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { sendSignal } = useSignal({ room });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Add reaction">
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          className={classes.toolbarButtons}
          onClick={handleClick}
          size="large">
          <EmojiEmotions />
        </IconButton>
      </Tooltip>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '10ch',
          },
        }}
      >
        <MenuItem
          // className={layOut === 'grid' ? localClasses.choosen : null}
          onClick={() => {
            sendSignal('thumbsup', 'emoji');
          }}
        >
          <Typography variant="inherit">
            <ThumbUpAltIcon />
          </Typography>
        </MenuItem>
        <MenuItem
          // className={layOut === 'active-speaker' ? localClasses.choosen : null}
          onClick={() => {
            sendSignal('thumbsdown', 'emoji');
          }}
        >
          <Typography variant="inherit">
            <ThumbDownAltIcon />
          </Typography>
        </MenuItem>
        <MenuItem
          // className={layOut === 'active-speaker' ? localClasses.choosen : null}
          onClick={() => {
            sendSignal('love', 'emoji');
          }}
        >
          <Typography variant="inherit">
            <FavoriteIcon />
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}

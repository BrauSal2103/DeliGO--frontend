import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Typography, Divider, Box, Avatar, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

// Define the type for a single notification object
interface NotificationItem {
  id: number;
  type: string;
  user: string;
  action: string;
  time: string;
  avatar: string;
  icon: string;
}

const Notificaciones: React.FC = () => {
  // Type for anchorEl: HTMLElement | null
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Dummy notification data with explicit type
  const notifications: NotificationItem[] = [
    {
      id: 1,
      type: 'update',
      user: 'Đinh Hồng Khuyên',
      action: 'posted an update.',
      time: '2w',
      avatar: 'https://via.placeholder.com/40/FF0000/FFFFFF?text=DK',
      icon: '💬',
    },
    {
      id: 2,
      type: 'video',
      user: 'Chiến Hữu',
      action: 'added a new video.',
      time: '4w',
      avatar: 'https://via.placeholder.com/40/0000FF/FFFFFF?text=CH',
      icon: '📹',
    },
    {
      id: 3,
      type: 'comment',
      user: 'Đinh Hồng Khuyên',
      action: 'commented on her post.',
      time: '1w',
      avatar: 'https://via.placeholder.com/40/FF0000/FFFFFF?text=DK',
      icon: '💬',
    },
    {
      id: 4,
      type: 'photo',
      user: 'Độ Trần',
      action: 'added a new photo: "Sạc Oppo SuperVOOC 67W sẵn hàng. Mời các bác lên..."',
      time: '2w',
      avatar: 'https://via.placeholder.com/40/008000/FFFFFF?text=DT',
      icon: '📸',
    },
    {
        id: 5,
        type: 'update',
        user: 'Đinh Hồng Khuyên',
        action: 'posted an update.',
        time: '2w',
        avatar: 'https://via.placeholder.com/40/FF0000/FFFFFF?text=DK',
        icon: '💬',
      },
      {
        id: 6,
        type: 'photo',
        user: 'Ngô Hậu',
        action: 'added a new photo: "Chuyển mục mỗi tối: Muốn khoè đẹp thì phải tập..."',
        time: '2w',
        avatar: 'https://via.placeholder.com/40/800080/FFFFFF?text=NH',
        icon: '📸',
      },
      {
        id: 7,
        type: 'shared',
        user: 'Long Thanh',
        action: "shared Carolina Dro's post.",
        time: '2w',
        avatar: 'https://via.placeholder.com/40/FFFF00/000000?text=LT',
        icon: '🔗',
      },
  ];

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="notificaciones"
        size="large"
        onClick={handleClick}
        sx={{ marginLeft: 'auto' }}
      >
        <NotificationsIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          className: "rounded-lg shadow-lg max-w-sm w-[350px] md:w-[400px] lg:w-[450px]",
          sx: {
            maxHeight: '80vh',
            overflowY: 'auto',
            marginTop: '8px',
            left: 'unset !important',
            right: '16px',
          }
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {/* Header */}
        <Box className="flex justify-between items-center p-4 sticky top-0 bg-white z-10 border-b border-gray-200">
          <Typography variant="h5" component="div" className="font-bold">
            Notificaciones
          </Typography>
        </Box>

        <Box className="px-4 py-2">
          <Typography variant="subtitle2" className="text-gray-500 font-semibold mb-2">
            New
          </Typography>
        </Box>

        {/* List of Notifications */}
        {notifications.map((notification) => (
          <MenuItem
            key={notification.id}
            onClick={handleClose}
            className="flex items-start py-3 px-4 hover:bg-gray-100 transition-colors duration-200"
            sx={{ whiteSpace: 'normal', alignItems: 'flex-start' }}
          >
            <Box className="relative mr-3 flex-shrink-0">
              <Avatar src={notification.avatar} alt={notification.user} />
              <Box className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-white">
                <Typography component="span" className="text-xs">
                  {notification.icon}
                </Typography>
              </Box>
            </Box>
            <Box className="flex-grow">
              <Typography variant="body2" className="text-black">
                <span className="font-semibold">{notification.user}</span> {notification.action}
              </Typography>
              <Typography variant="caption" className="text-gray-500 text-xs">
                {notification.time}
              </Typography>
            </Box>
            <IconButton size="small" className="ml-2 flex-shrink-0">
              <MoreHorizIcon fontSize="small" />
            </IconButton>
          </MenuItem>
        ))}

        <Divider className="my-2" />

        {/* "View All Notifications" or similar action */}
        <Box className="p-4">
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#007bff',
              '&:hover': {
                backgroundColor: '#0056b3',
              },
              textTransform: 'none',
              borderRadius: '8px'
            }}
          >
            View All Notifications
          </Button>
        </Box>
      </Menu>
    </div>
  );
};

export default Notificaciones;
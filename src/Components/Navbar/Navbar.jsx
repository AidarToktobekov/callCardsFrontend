import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, Typography} from "@mui/material";
import {useState} from "react";
import Grid from "@mui/material/Grid2";
import PersonIcon from '@mui/icons-material/Person';
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import {useAppSelector} from "../../app/hooks.js";
import {selectUser} from "../../features/user/userSlice.js";
import EditNoteIcon from '@mui/icons-material/EditNote';
import GroupIcon from '@mui/icons-material/Group';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HelpIcon from '@mui/icons-material/Help';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import RepeatIcon from '@mui/icons-material/Repeat';
import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff';
import {useNavigate} from "react-router-dom";

const listButtonStyle = {
  borderRadius: '5px',
}

const listItemStyle = {
  p: '8px 0',
}

const Navbar = ()=>{

  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return(
    <>
      <Grid sx={{
        height: '100vh',
        padding: '20px',
        // borderRight: '1px solid #fff',
        backdropFilter: "blur(2px)"
      }}>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
              </Popover>
        <List>
          <ListItem sx={listItemStyle}>
            <ListItemButton sx={{
              ...listButtonStyle,
              // backgroundColor: '#ff6a00'
              background: "linear-gradient(0.25turn, #ff0088, #ff6a00)",
            }} aria-describedby={id} variant="contained" onClick={handleClick} className={"user-button"}>
              <ListItemIcon>
                <PersonIcon sx={{
                  fontSize: '30px',
                }}/>
              </ListItemIcon>

              <ListItemText primary={user.name} />

            </ListItemButton>
          </ListItem>
          {user?.role === 'admin' &&
            <>
              <ListItem sx={listItemStyle}>
                <ListItemButton sx={listButtonStyle} onClick={()=>navigate("employees")}>
                  <ListItemIcon>
                    <GroupIcon/>
                  </ListItemIcon>

                  <ListItemText primary="Пользователи" />
                </ListItemButton>
              </ListItem>
              <ListItem sx={listItemStyle}>
                <ListItemButton sx={listButtonStyle} onClick={()=>navigate("solution-and-reason")}>
                  <ListItemIcon>
                    <EditNoteIcon/>
                  </ListItemIcon>

                  <ListItemText primary="Причины/Решения" />
                </ListItemButton>
              </ListItem>
            </>
          }
          <ListItem sx={listItemStyle}>
            <ListItemButton sx={listButtonStyle} onClick={()=>navigate("stats_by_cards")}>
              <ListItemIcon>
                <ContactPhoneIcon/>
              </ListItemIcon>

              <ListItemText primary="Карты звонков" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={listItemStyle}>
            <ListItemButton sx={listButtonStyle} onClick={()=>navigate("stats_by_employees")}>
              <ListItemIcon>
                <SupportAgentIcon/>
              </ListItemIcon>

              <ListItemText primary="Отчет по сотрудникам" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={listItemStyle}>
            <ListItemButton sx={listButtonStyle} onClick={()=>navigate("stats_by_reasons")}>
              <ListItemIcon>
                <HelpIcon/>
              </ListItemIcon>

              <ListItemText primary="Отчет по причинам" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={listItemStyle}>
            <ListItemButton sx={listButtonStyle} onClick={()=>navigate("stats_by_solutions")}>
              <ListItemIcon>
                <EmojiObjectsIcon/>
              </ListItemIcon>

              <ListItemText primary="Отчет по Причинам/Решениям" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={listItemStyle}>
            <ListItemButton sx={listButtonStyle} onClick={()=>navigate("stats_by_repeated_calls")}>
              <ListItemIcon>
                <RepeatIcon/>
              </ListItemIcon>

              <ListItemText primary="Повторные звонки" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={listItemStyle}>
            <ListItemButton sx={listButtonStyle} onClick={()=>navigate("stats_by_inactives_users")}>
              <ListItemIcon>
                <VoiceOverOffIcon/>
              </ListItemIcon>

              <ListItemText primary="Неактивные" />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
    </>
  );
};

export default Navbar;
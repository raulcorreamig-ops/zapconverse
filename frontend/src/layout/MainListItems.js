import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import { Badge, Collapse, List } from "@material-ui/core";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import ContactPhoneOutlinedIcon from "@material-ui/icons/ContactPhoneOutlined";
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import EventIcon from "@material-ui/icons/Event";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PeopleIcon from "@material-ui/icons/People";
import ListIcon from "@material-ui/icons/ListAlt";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import ForumIcon from "@material-ui/icons/Forum";
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import RotateRight from "@material-ui/icons/RotateRight";
import { i18n } from "../translate/i18n";
import { WhatsAppsContext } from "../context/WhatsApp/WhatsAppsContext";
import { AuthContext } from "../context/Auth/AuthContext";
import LoyaltyRoundedIcon from '@material-ui/icons/LoyaltyRounded';
import { Can } from "../components/Can";
import { SocketContext } from "../context/Socket/SocketContext";
import { isArray } from "lodash";
import TableChartIcon from '@material-ui/icons/TableChart';
import api from "../services/api";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ToDoList from "../pages/ToDoList/";
import toastError from "../errors/toastError";
import { makeStyles } from "@material-ui/core/styles";
import { AccountTree, AllInclusive, AttachFile, BlurCircular, Chat, DeviceHubOutlined, Schedule } from '@material-ui/icons';
import usePlans from "../hooks/usePlans";
import Typography from "@material-ui/core/Typography";
import { ShapeLine } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  ListSubheader: {
    height: 26,
    marginTop: "-15px",
    marginBottom: "-10px",
  },
  listItem: {
    margin: "4px 8px",
    borderRadius: "12px",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      backgroundColor: theme.palette.type === 'dark'
        ? "rgba(245, 184, 0, 0.08)"
        : "rgba(245, 184, 0, 0.08)",
      transform: "translateX(4px)",
    },
  },
  listItemActive: {
    backgroundColor: theme.palette.type === 'dark'
      ? "rgba(245, 184, 0, 0.15)"
      : "rgba(245, 184, 0, 0.12)",
    borderLeft: "3px solid #F5B800",
    "&:hover": {
      backgroundColor: theme.palette.type === 'dark'
        ? "rgba(245, 184, 0, 0.2)"
        : "rgba(245, 184, 0, 0.15)",
    },
  },
  listItemIcon: {
    minWidth: "60px",
    "& .MuiSvgIcon-root": {
      fontSize: "2.5rem",
      padding: "10px",
      borderRadius: "50%",
      backgroundColor: theme.palette.type === 'dark'
        ? "rgba(245, 184, 0, 0.12)"
        : "rgba(245, 184, 0, 0.1)",
      color: "#F5B800",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  listItemIconActive: {
    "& .MuiSvgIcon-root": {
      backgroundColor: theme.palette.type === 'dark'
        ? "rgba(245, 184, 0, 0.2)"
        : "rgba(245, 184, 0, 0.15)",
      color: "#F5B800",
      boxShadow: "0 0 12px rgba(245, 184, 0, 0.3)",
      transform: "scale(1.1)",
    },
  },
  listItemText: {
    "& .MuiListItemText-primary": {
      fontSize: "0.9rem",
      fontWeight: 500,
      color: theme.palette.type === 'dark' ? "#e0e0e0" : "#333",
    },
  },
  listItemTextActive: {
    "& .MuiListItemText-primary": {
      fontWeight: 600,
      color: "#F5B800",
    },
  },
  divider: {
    margin: "12px 0",
    backgroundColor: theme.palette.type === 'dark'
      ? "rgba(255, 255, 255, 0.08)"
      : "rgba(0, 0, 0, 0.08)",
  },
  subheader: {
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: theme.palette.type === 'dark'
      ? "rgba(255, 255, 255, 0.5)"
      : "rgba(0, 0, 0, 0.5)",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  subMenuItem: {
    margin: "2px 8px",
    marginLeft: "16px",
    borderRadius: "10px",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      backgroundColor: theme.palette.type === 'dark'
        ? "rgba(245, 184, 0, 0.06)"
        : "rgba(245, 184, 0, 0.06)",
      transform: "translateX(3px)",
    },
  },
}));


function ListItemLink(props) {
  const { icon, primary, to, className, onClick } = props;
  const history = useHistory();
  const classes = useStyles();

  const isActive = history.location.pathname === to;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem
        button
        dense
        component={renderLink}
        className={`${classes.listItem} ${isActive ? classes.listItemActive : ''} ${className || ''}`}
        onClick={onClick}
      >
        {icon ? (
          <ListItemIcon className={`${classes.listItemIcon} ${isActive ? classes.listItemIconActive : ''}`}>
            {icon}
          </ListItemIcon>
        ) : null}
        <ListItemText
          primary={primary}
          className={`${classes.listItemText} ${isActive ? classes.listItemTextActive : ''}`}
        />
      </ListItem>
    </li>
  );
}

const reducer = (state, action) => {
  if (action.type === "LOAD_CHATS") {
    const chats = action.payload;
    const newChats = [];

    if (isArray(chats)) {
      chats.forEach((chat) => {
        const chatIndex = state.findIndex((u) => u.id === chat.id);
        if (chatIndex !== -1) {
          state[chatIndex] = chat;
        } else {
          newChats.push(chat);
        }
      });
    }

    return [...state, ...newChats];
  }

  if (action.type === "UPDATE_CHATS") {
    const chat = action.payload;
    const chatIndex = state.findIndex((u) => u.id === chat.id);

    if (chatIndex !== -1) {
      state[chatIndex] = chat;
      return [...state];
    } else {
      return [chat, ...state];
    }
  }

  if (action.type === "DELETE_CHAT") {
    const chatId = action.payload;

    const chatIndex = state.findIndex((u) => u.id === chatId);
    if (chatIndex !== -1) {
      state.splice(chatIndex, 1);
    }
    return [...state];
  }

  if (action.type === "RESET") {
    return [];
  }

  if (action.type === "CHANGE_CHAT") {
    const changedChats = state.map((chat) => {
      if (chat.id === action.payload.chat.id) {
        return action.payload.chat;
      }
      return chat;
    });
    return changedChats;
  }
};

const MainListItems = (props) => {
  const classes = useStyles();
  const { drawerClose, collapsed } = props;
  const { whatsApps } = useContext(WhatsAppsContext);
  const { user, handleLogout } = useContext(AuthContext);
  const [connectionWarning, setConnectionWarning] = useState(false);
  const [openAdminSubmenu, setOpenAdminSubmenu] = useState(false);
  const [openCampaignSubmenu, setOpenCampaignSubmenu] = useState(false);
  const [showCampaigns, setShowCampaigns] = useState(false);
  const [showKanban, setShowKanban] = useState(false);
  const [showOpenAi, setShowOpenAi] = useState(false);
  const [showIntegrations, setShowIntegrations] = useState(false); const history = useHistory();
  const [showSchedules, setShowSchedules] = useState(false);
  const [showInternalChat, setShowInternalChat] = useState(false);
  const [showExternalApi, setShowExternalApi] = useState(false);


  const [invisible, setInvisible] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchParam] = useState("");
  const [chats, dispatch] = useReducer(reducer, []);
  const { getPlanCompany } = usePlans();

  const [openFlowsSubmenu, setOpenFlowsSubmenu] = useState(false);

  const socketManager = useContext(SocketContext);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 

  useEffect(() => {
    dispatch({ type: "RESET" });
    setPageNumber(1);
  }, [searchParam]);

  useEffect(() => {
    async function fetchData() {
      const companyId = user.companyId;
      const planConfigs = await getPlanCompany(undefined, companyId);

      setShowCampaigns(planConfigs.plan.useCampaigns);
      setShowKanban(planConfigs.plan.useKanban);
      setShowOpenAi(planConfigs.plan.useOpenAi);
      setShowIntegrations(planConfigs.plan.useIntegrations);
      setShowSchedules(planConfigs.plan.useSchedules);
      setShowInternalChat(planConfigs.plan.useInternalChat);
      setShowExternalApi(planConfigs.plan.useExternalApi);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchChats();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam, pageNumber]);

  useEffect(() => {
    const companyId = localStorage.getItem("companyId");
    const socket = socketManager.getSocket(companyId);

    socket.on(`company-${companyId}-chat`, (data) => {
      if (data.action === "new-message") {
        dispatch({ type: "CHANGE_CHAT", payload: data });
      }
      if (data.action === "update") {
        dispatch({ type: "CHANGE_CHAT", payload: data });
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [socketManager]);

  useEffect(() => {
    let unreadsCount = 0;
    if (chats.length > 0) {
      for (let chat of chats) {
        for (let chatUser of chat.users) {
          if (chatUser.userId === user.id) {
            unreadsCount += chatUser.unreads;
          }
        }
      }
    }
    if (unreadsCount > 0) {
      setInvisible(false);
    } else {
      setInvisible(true);
    }
  }, [chats, user.id]);

  useEffect(() => {
    if (localStorage.getItem("cshow")) {
      setShowCampaigns(true);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (whatsApps.length > 0) {
        const offlineWhats = whatsApps.filter((whats) => {
          return (
            whats.status === "qrcode" ||
            whats.status === "PAIRING" ||
            whats.status === "DISCONNECTED" ||
            whats.status === "TIMEOUT" ||
            whats.status === "OPENING"
          );
        });
        if (offlineWhats.length > 0) {
          setConnectionWarning(true);
        } else {
          setConnectionWarning(false);
        }
      }
    }, 2000);
    return () => clearTimeout(delayDebounceFn);
  }, [whatsApps]);

  const fetchChats = async () => {
    try {
      const { data } = await api.get("/chats/", {
        params: { searchParam, pageNumber },
      });
      dispatch({ type: "LOAD_CHATS", payload: data.records });
    } catch (err) {
      toastError(err);
    }
  };

  const handleClickLogout = () => {
    //handleCloseMenu();
    handleLogout();
  };

  return (
    <div>
      <Can
        role={user.profile}
        perform="dashboard:view"
        yes={() => (
          <ListItemLink
            to="/"
            primary="Dashboard"
            icon={<DashboardOutlinedIcon />}
            onClick={drawerClose}
          />
        )}
      />

      <ListItemLink
        to="/tickets"
        primary={i18n.t("mainDrawer.listItems.tickets")}
        icon={<WhatsAppIcon />}
        onClick={drawerClose}
      />

	{showKanban && (
	  <ListItemLink
        to="/kanban"
        primary={`Kanban`}
        icon={<TableChartIcon />}
        onClick={drawerClose}
      />
	  )}


      <ListItemLink
        to="/quick-messages"
        primary={i18n.t("mainDrawer.listItems.quickMessages")}
        icon={<FlashOnIcon />}
        onClick={drawerClose}
      />

	  <ListItemLink
        to="/todolist"
        primary={i18n.t("mainDrawer.listItems.tasks")}
        icon={<BorderColorIcon />}
        onClick={drawerClose}
      />

      <ListItemLink
        to="/contacts"
        primary={i18n.t("mainDrawer.listItems.contacts")}
        icon={<ContactPhoneOutlinedIcon />}
        onClick={drawerClose}
      />

      <ListItemLink
        to="/schedules"
        primary={i18n.t("mainDrawer.listItems.schedules")}
        icon={<EventIcon />}
        onClick={drawerClose}
      />

      <ListItemLink
        to="/tags"
        primary={i18n.t("mainDrawer.listItems.tags")}
        icon={<LocalOfferIcon />}
        onClick={drawerClose}
      />

      <ListItemLink
        to="/chats"
        primary={i18n.t("mainDrawer.listItems.chats")}
        icon={
          <Badge color="secondary" variant="dot" invisible={invisible}>
            <ForumIcon />
          </Badge>
        }
        onClick={drawerClose}
      />

      <ListItemLink
        to="/helps"
        primary={i18n.t("mainDrawer.listItems.helps")}
        icon={<HelpOutlineIcon />}
        onClick={drawerClose}
      />

      <Can
        role={user.profile}
        perform="drawer-admin-items:view"
        yes={() => (
          <>
            <Divider className={classes.divider} />

            {/* Menu Principal de Administração */}
            <ListItem
              button
              onClick={(e) => {
                e.stopPropagation();
                console.log('Menu Administração clicado!', openAdminSubmenu);
                setOpenAdminSubmenu((prev) => !prev);
              }}
              className={classes.listItem}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <SettingsOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary={i18n.t("mainDrawer.listItems.administration")}
                className={classes.listItemText}
              />
              {openAdminSubmenu ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </ListItem>

            {/* Collapse com todos os itens administrativos */}
            <Collapse
              in={openAdminSubmenu}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>

            {showCampaigns && (
              <>
                <ListItem
                  button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenCampaignSubmenu((prev) => !prev);
                  }}
                  className={classes.subMenuItem}
                >
                  <ListItemIcon className={classes.listItemIcon}>
                    <EventAvailableIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={i18n.t("mainDrawer.listItems.campaigns")}
                    className={classes.listItemText}
                  />
                  {openCampaignSubmenu ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </ListItem>
                <Collapse
                  style={{ paddingLeft: 15 }}
                  in={openCampaignSubmenu}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItem onClick={() => history.push("/campaigns")} button className={classes.subMenuItem}>
                      <ListItemIcon className={classes.listItemIcon}>
                        <ListIcon />
                      </ListItemIcon>
                      <ListItemText primary="Listagem" className={classes.listItemText} />
                    </ListItem>
                    <ListItem
                      onClick={() => history.push("/contact-lists")}
                      button
                      className={classes.subMenuItem}
                    >
                      <ListItemIcon className={classes.listItemIcon}>
                        <PeopleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Listas de Contatos" className={classes.listItemText} />
                    </ListItem>
                    <ListItem
                      onClick={() => history.push("/campaigns-config")}
                      button
                      className={classes.subMenuItem}
                    >
                      <ListItemIcon className={classes.listItemIcon}>
                        <SettingsOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Configurações" className={classes.listItemText} />
                    </ListItem>
                  </List>
                </Collapse>
                {/* Flow builder */}
                <ListItem
                    button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenFlowsSubmenu((prev) => !prev);
                    }}
                    className={classes.subMenuItem}
                >
                  <ListItemIcon className={classes.listItemIcon}>
                    <AccountTree />
                  </ListItemIcon>
                  <ListItemText
                      primary={i18n.t("mainDrawer.listItems.flows")}
                      className={classes.listItemText}
                  />
                  {openFlowsSubmenu ? (
                      <ExpandLessIcon />
                  ) : (
                      <ExpandMoreIcon />
                  )}
                </ListItem>

                <Collapse
                    style={{ paddingLeft: 15 }}
                    in={openFlowsSubmenu}
                    timeout="auto"
                    unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItem
                        onClick={() => history.push("/phrase-lists")}
                        button
                        className={classes.subMenuItem}
                    >
                      <ListItemIcon className={classes.listItemIcon}>
                        <EventAvailableIcon />
                      </ListItemIcon>
                      <ListItemText primary="Campanha" className={classes.listItemText} />
                    </ListItem>

                    <ListItem
                        onClick={() => history.push("/flowbuilders")}
                        button
                        className={classes.subMenuItem}
                    >
                      <ListItemIcon className={classes.listItemIcon}>
                        <ShapeLine />
                      </ListItemIcon>
                      <ListItemText primary="Conversa" className={classes.listItemText} />
                    </ListItem>
                  </List>
                </Collapse>
              </>
            )}

            {user.super && (
              <ListItem
                onClick={() => history.push("/announcements")}
                button
                className={classes.subMenuItem}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <AnnouncementIcon />
                </ListItemIcon>
                <ListItemText primary={i18n.t("mainDrawer.listItems.annoucements")} className={classes.listItemText} />
              </ListItem>
            )}
            {showOpenAi && (
              <ListItem
                onClick={() => history.push("/prompts")}
                button
                className={classes.subMenuItem}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <AllInclusive />
                </ListItemIcon>
                <ListItemText primary={i18n.t("mainDrawer.listItems.prompts")} className={classes.listItemText} />
              </ListItem>
            )}

            {showIntegrations && (
              <ListItem
                onClick={() => history.push("/queue-integration")}
                button
                className={classes.subMenuItem}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <DeviceHubOutlined />
                </ListItemIcon>
                <ListItemText primary={i18n.t("mainDrawer.listItems.queueIntegration")} className={classes.listItemText} />
              </ListItem>
            )}
            <ListItem
              onClick={() => history.push("/connections")}
              button
              className={classes.subMenuItem}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <Badge badgeContent={connectionWarning ? "!" : 0} color="error">
                  <SyncAltIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary={i18n.t("mainDrawer.listItems.connections")} className={classes.listItemText} />
            </ListItem>
            <ListItem
              onClick={() => history.push("/files")}
              button
              className={classes.subMenuItem}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <AttachFile />
              </ListItemIcon>
              <ListItemText primary={i18n.t("mainDrawer.listItems.files")} className={classes.listItemText} />
            </ListItem>
            <ListItem
              onClick={() => history.push("/queues")}
              button
              className={classes.subMenuItem}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <AccountTreeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={i18n.t("mainDrawer.listItems.queues")} className={classes.listItemText} />
            </ListItem>
            <ListItem
              onClick={() => history.push("/users")}
              button
              className={classes.subMenuItem}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <PeopleAltOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={i18n.t("mainDrawer.listItems.users")} className={classes.listItemText} />
            </ListItem>
            {showExternalApi && (
              <ListItem
                onClick={() => history.push("/messages-api")}
                button
                className={classes.subMenuItem}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <CodeRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={i18n.t("mainDrawer.listItems.messagesAPI")} className={classes.listItemText} />
              </ListItem>
            )}
            <ListItem
              onClick={() => history.push("/financeiro")}
              button
              className={classes.subMenuItem}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <LocalAtmIcon />
              </ListItemIcon>
              <ListItemText primary={i18n.t("mainDrawer.listItems.financeiro")} className={classes.listItemText} />
            </ListItem>

                <ListItem
                  onClick={() => history.push("/settings")}
                  button
                  className={classes.subMenuItem}
                >
                  <ListItemIcon className={classes.listItemIcon}>
                    <SettingsOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={i18n.t("mainDrawer.listItems.settings")} className={classes.listItemText} />
                </ListItem>

              </List>
            </Collapse>
            {/* Fim do Collapse de Administração */}

            {!collapsed && <React.Fragment>
              <Divider className={classes.divider} />
              {/*
              // IMAGEM NO MENU
              <Hidden only={['sm', 'xs']}>
                <img style={{ width: "100%", padding: "10px" }} src={logo} alt="image" />
              </Hidden>
              */}
              <Typography style={{ fontSize: "11px", padding: "10px", textAlign: "right", fontWeight: "600", opacity: 0.5 }}>
                v9.0.0
              </Typography>
            </React.Fragment>
            }
			
          </>
        )}
      />
    </div>
  );
};

export default MainListItems;

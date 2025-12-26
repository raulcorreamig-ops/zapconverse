import React, { useContext, useState, useEffect } from "react";

import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";

import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import TimerIcon from '@material-ui/icons/Timer';

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { grey, blue } from "@material-ui/core/colors";
import { toast } from "react-toastify";

import ButtonWithSpinner from "../../components/ButtonWithSpinner";

import AttendantsCards from "../../components/Dashboard/AttendantsCards";
import { isArray } from "lodash";

import useDashboard from "../../hooks/useDashboard";
import useContacts from "../../hooks/useContacts";
import { ChatsUser } from "./ChartsUser"

import { isEmpty } from "lodash";
import moment from "moment";
import { ChartsDate } from "./ChartsDate";
import { i18n } from "../../translate/i18n";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.padding,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
  },
  fixedHeightPaper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    height: 240,
    overflowY: "auto",
    ...theme.scrollbarStyles,
  },
  cardAvatar: {
    fontSize: "55px",
    color: grey[500],
    backgroundColor: "#ffffff",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  cardTitle: {
    fontSize: "18px",
    color: blue[700],
  },
  cardSubtitle: {
    color: grey[600],
    fontSize: "14px",
  },
  alignRight: {
    textAlign: "right",
  },
  fullWidth: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      background: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
    },
  },
  selectContainer: {
    width: "100%",
    textAlign: "left",
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      background: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
    },
  },
  iframeDashboard: {
    width: "100%",
    height: "calc(100vh - 64px)",
    border: "none",
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
    background: theme.palette.type === 'dark' ? '#0a0a0a' : '#f5f7fa',
    minHeight: '100vh',
  },
  fixedHeightPaper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 240,
  },
  customFixedHeightPaper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 120,
  },
  customFixedHeightPaperLg: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "100%",
  },
  card1: {
    padding: theme.spacing(2.5),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    minHeight: "120px",
    background: theme.palette.type === 'dark'
      ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    borderRadius: "16px",
    boxShadow: theme.palette.type === 'dark'
      ? '0 4px 12px rgba(0, 0, 0, 0.3)'
      : '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: theme.palette.type === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.06)',
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: theme.palette.type === 'dark'
        ? '0 8px 24px rgba(0, 0, 0, 0.4)'
        : '0 8px 24px rgba(0, 0, 0, 0.12)',
    },
  },
  cardTitle: {
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    opacity: 0.8,
    marginBottom: theme.spacing(1.5),
    paddingBottom: theme.spacing(1),
    color: theme.palette.type === 'dark' ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "40px",
      height: "3px",
      borderRadius: "2px",
    },
  },
  cardTitleBlue: {
    color: "#3b82f6 !important",
    "&::after": {
      background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
      boxShadow: "0 0 10px rgba(59, 130, 246, 0.4)",
    },
  },
  cardTitleOrange: {
    color: "#f59e0b !important",
    "&::after": {
      background: "linear-gradient(90deg, #f59e0b, #fbbf24)",
      boxShadow: "0 0 10px rgba(245, 158, 11, 0.4)",
    },
  },
  cardTitleGreen: {
    color: "#10b981 !important",
    "&::after": {
      background: "linear-gradient(90deg, #10b981, #34d399)",
      boxShadow: "0 0 10px rgba(16, 185, 129, 0.4)",
    },
  },
  cardTitlePurple: {
    color: "#8b5cf6 !important",
    "&::after": {
      background: "linear-gradient(90deg, #8b5cf6, #a78bfa)",
      boxShadow: "0 0 10px rgba(139, 92, 246, 0.4)",
    },
  },
  cardTitlePink: {
    color: "#ec4899 !important",
    "&::after": {
      background: "linear-gradient(90deg, #ec4899, #f472b6)",
      boxShadow: "0 0 10px rgba(236, 72, 153, 0.4)",
    },
  },
  cardTitleCyan: {
    color: "#06b6d4 !important",
    "&::after": {
      background: "linear-gradient(90deg, #06b6d4, #22d3ee)",
      boxShadow: "0 0 10px rgba(6, 182, 212, 0.4)",
    },
  },
  cardNumber: {
    fontSize: "2.2rem",
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: "-1px",
    color: theme.palette.type === 'dark' ? "#ffffff" : "#1a1a1a",
  },
  cardIcon: {
    fontSize: 40,
    padding: theme.spacing(1.5),
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardIconBlue: {
    backgroundColor: "rgba(59, 130, 246, 0.15)",
    color: "#3b82f6",
  },
  cardIconOrange: {
    backgroundColor: "rgba(245, 158, 11, 0.15)",
    color: "#f59e0b",
  },
  cardIconGreen: {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    color: "#10b981",
  },
  cardIconPurple: {
    backgroundColor: "rgba(139, 92, 246, 0.15)",
    color: "#8b5cf6",
  },
  cardIconPink: {
    backgroundColor: "rgba(236, 72, 153, 0.15)",
    color: "#ec4899",
  },
  cardIconCyan: {
    backgroundColor: "rgba(6, 182, 212, 0.15)",
    color: "#06b6d4",
  },
  card2: {
    padding: theme.spacing(2.5),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    minHeight: "120px",
    background: theme.palette.type === 'dark'
      ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    borderRadius: "16px",
    boxShadow: theme.palette.type === 'dark'
      ? '0 4px 12px rgba(0, 0, 0, 0.3)'
      : '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: theme.palette.type === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.06)',
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: theme.palette.type === 'dark'
        ? '0 8px 24px rgba(0, 0, 0, 0.4)'
        : '0 8px 24px rgba(0, 0, 0, 0.12)',
    },
  },
  card3: {
    padding: theme.spacing(2.5),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    minHeight: "120px",
    background: theme.palette.type === 'dark'
      ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    borderRadius: "16px",
    boxShadow: theme.palette.type === 'dark'
      ? '0 4px 12px rgba(0, 0, 0, 0.3)'
      : '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: theme.palette.type === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.06)',
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: theme.palette.type === 'dark'
        ? '0 8px 24px rgba(0, 0, 0, 0.4)'
        : '0 8px 24px rgba(0, 0, 0, 0.12)',
    },
  },
  card4: {
    padding: theme.spacing(2.5),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    minHeight: "120px",
    background: theme.palette.type === 'dark'
      ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    borderRadius: "16px",
    boxShadow: theme.palette.type === 'dark'
      ? '0 4px 12px rgba(0, 0, 0, 0.3)'
      : '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: theme.palette.type === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.06)',
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: theme.palette.type === 'dark'
        ? '0 8px 24px rgba(0, 0, 0, 0.4)'
        : '0 8px 24px rgba(0, 0, 0, 0.12)',
    },
  },
  card5: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "100%",
    background: theme.palette.type === 'dark'
      ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    color: theme.palette.type === 'dark' ? "#e0e0e0" : "#2c3e50",
    borderRadius: "12px",
    boxShadow: theme.palette.type === 'dark'
      ? "0 2px 8px 0 rgba(0, 0, 0, 0.3)"
      : "0 2px 8px 0 rgba(0, 0, 0, 0.08)",
    border: theme.palette.type === 'dark'
      ? "1px solid rgba(255, 255, 255, 0.1)"
      : "1px solid rgba(0, 0, 0, 0.06)",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.palette.type === 'dark'
        ? "0 4px 16px 0 rgba(0, 0, 0, 0.4)"
        : "0 4px 16px 0 rgba(0, 0, 0, 0.12)",
    },
  },
  card6: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "100%",
    background: theme.palette.type === 'dark'
      ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    color: theme.palette.type === 'dark' ? "#e0e0e0" : "#2c3e50",
    borderRadius: "12px",
    boxShadow: theme.palette.type === 'dark'
      ? "0 2px 8px 0 rgba(0, 0, 0, 0.3)"
      : "0 2px 8px 0 rgba(0, 0, 0, 0.08)",
    border: theme.palette.type === 'dark'
      ? "1px solid rgba(255, 255, 255, 0.1)"
      : "1px solid rgba(0, 0, 0, 0.06)",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.palette.type === 'dark'
        ? "0 4px 16px 0 rgba(0, 0, 0, 0.4)"
        : "0 4px 16px 0 rgba(0, 0, 0, 0.12)",
    },
  },
  card7: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "100%",
    background: theme.palette.type === 'dark'
      ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    color: theme.palette.type === 'dark' ? "#e0e0e0" : "#2c3e50",
    borderRadius: "12px",
    boxShadow: theme.palette.type === 'dark'
      ? "0 2px 8px 0 rgba(0, 0, 0, 0.3)"
      : "0 2px 8px 0 rgba(0, 0, 0, 0.08)",
    border: theme.palette.type === 'dark'
      ? "1px solid rgba(255, 255, 255, 0.1)"
      : "1px solid rgba(0, 0, 0, 0.06)",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.palette.type === 'dark'
        ? "0 4px 16px 0 rgba(0, 0, 0, 0.4)"
        : "0 4px 16px 0 rgba(0, 0, 0, 0.12)",
    },
  },
  card8: {
    padding: theme.spacing(2.5),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    minHeight: "120px",
    background: theme.palette.type === 'dark'
      ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    borderRadius: "16px",
    boxShadow: theme.palette.type === 'dark'
      ? '0 4px 12px rgba(0, 0, 0, 0.3)'
      : '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: theme.palette.type === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.06)',
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: theme.palette.type === 'dark'
        ? '0 8px 24px rgba(0, 0, 0, 0.4)'
        : '0 8px 24px rgba(0, 0, 0, 0.12)',
    },
  },
  card9: {
    padding: theme.spacing(2.5),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    minHeight: "120px",
    background: theme.palette.type === 'dark'
      ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    borderRadius: "16px",
    boxShadow: theme.palette.type === 'dark'
      ? '0 4px 12px rgba(0, 0, 0, 0.3)'
      : '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: theme.palette.type === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.06)',
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: theme.palette.type === 'dark'
        ? '0 8px 24px rgba(0, 0, 0, 0.4)'
        : '0 8px 24px rgba(0, 0, 0, 0.12)',
    },
  },
  fixedHeightPaper2: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    background: theme.palette.type === 'dark'
      ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    borderRadius: "12px",
    boxShadow: theme.palette.type === 'dark'
      ? "0 2px 8px 0 rgba(0, 0, 0, 0.3)"
      : "0 2px 8px 0 rgba(0, 0, 0, 0.08)",
    border: theme.palette.type === 'dark'
      ? "1px solid rgba(255, 255, 255, 0.1)"
      : "1px solid rgba(0, 0, 0, 0.06)",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [counters, setCounters] = useState({});
  const [attendants, setAttendants] = useState([]);
  const [period, setPeriod] = useState(0);
  const [filterType, setFilterType] = useState(1);
  const [dateFrom, setDateFrom] = useState(moment("1", "D").format("YYYY-MM-DD"));
  const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DD"));
  const [loading, setLoading] = useState(false);
  const { find } = useDashboard();

  useEffect(() => {
    async function firstLoad() {
      await fetchData();
    }
    setTimeout(() => {
      firstLoad();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
    async function handleChangePeriod(value) {
    setPeriod(value);
  }

  async function handleChangeFilterType(value) {
    setFilterType(value);
    if (value === 1) {
      setPeriod(0);
    } else {
      setDateFrom("");
      setDateTo("");
    }
  }

  async function fetchData() {
    setLoading(true);

    let params = {};

    if (period > 0) {
      params = {
        days: period,
      };
    }

    if (!isEmpty(dateFrom) && moment(dateFrom).isValid()) {
      params = {
        ...params,
        date_from: moment(dateFrom).format("YYYY-MM-DD"),
      };
    }

    if (!isEmpty(dateTo) && moment(dateTo).isValid()) {
      params = {
        ...params,
        date_to: moment(dateTo).format("YYYY-MM-DD"),
      };
    }

    if (Object.keys(params).length === 0) {
      toast.error(i18n.t("dashboard.toasts.selectFilterError"));
      setLoading(false);
      return;
    }

    const data = await find(params);

    setCounters(data.counters);
    if (isArray(data.attendants)) {
      setAttendants(data.attendants);
    } else {
      setAttendants([]);
    }

    setLoading(false);
  }

  function formatTime(minutes) {
    return moment()
      .startOf("day")
      .add(minutes, "minutes")
      .format("HH[h] mm[m]");
  }

    const GetContacts = (all) => {
    let props = {};
    if (all) {
      props = {};
    }
    const { count } = useContacts(props);
    return count;
  };
  
    function renderFilters() {
    if (filterType === 1) {
      return (
        <>
          <Grid item>
            <TextField
              label={i18n.t("dashboard.filters.initialDate")}
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              size="small"
              style={{ width: '160px' }}
            />
          </Grid>
          <Grid item>
            <TextField
              label={i18n.t("dashboard.filters.finalDate")}
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              size="small"
              style={{ width: '160px' }}
            />
          </Grid>
        </>
      );
    } else {
      return (
        <Grid item>
          <FormControl variant="outlined" size="small" style={{ minWidth: '180px' }}>
            <InputLabel id="period-selector-label">
              {i18n.t("dashboard.periodSelect.title")}
            </InputLabel>
            <Select
              labelId="period-selector-label"
              id="period-selector"
              value={period}
              onChange={(e) => handleChangePeriod(e.target.value)}
              label={i18n.t("dashboard.periodSelect.title")}
            >
              <MenuItem value={0}>{i18n.t("dashboard.periodSelect.options.none")}</MenuItem>
              <MenuItem value={3}>{i18n.t("dashboard.periodSelect.options.last3")}</MenuItem>
              <MenuItem value={7}>{i18n.t("dashboard.periodSelect.options.last7")}</MenuItem>
              <MenuItem value={15}>{i18n.t("dashboard.periodSelect.options.last15")}</MenuItem>
              <MenuItem value={30}>{i18n.t("dashboard.periodSelect.options.last30")}</MenuItem>
              <MenuItem value={60}>{i18n.t("dashboard.periodSelect.options.last60")}</MenuItem>
              <MenuItem value={90}>{i18n.t("dashboard.periodSelect.options.last90")}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      );
    }
  }

  return (
    <div style={{ background: 'inherit' }}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3} justifyContent="flex-end" style={{ paddingTop: 16 }}>
		

          {/* EM ATENDIMENTO */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              className={classes.card1}
              style={{ overflow: "hidden" }}
              elevation={0}
            >
              <Grid container spacing={0} style={{ height: '100%', alignItems: 'center' }}>
                <Grid item xs={8}>
                  <Typography className={`${classes.cardTitle} ${classes.cardTitleBlue}`}>
                    {i18n.t("dashboard.counters.inTalk")}
                  </Typography>
                  <Typography className={classes.cardNumber}>
                    {counters.supportHappening}
                  </Typography>
                </Grid>
                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <WhatsAppIcon className={`${classes.cardIcon} ${classes.cardIconBlue}`} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* AGUARDANDO */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              className={classes.card2}
              style={{ overflow: "hidden" }}
              elevation={0}
            >
              <Grid container spacing={0} style={{ height: '100%', alignItems: 'center' }}>
                <Grid item xs={8}>
                  <Typography className={`${classes.cardTitle} ${classes.cardTitleOrange}`}>
                    {i18n.t("dashboard.counters.waiting")}
                  </Typography>
                  <Typography className={classes.cardNumber}>
                    {counters.supportPending}
                  </Typography>
                </Grid>
                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <HourglassEmptyIcon className={`${classes.cardIcon} ${classes.cardIconOrange}`} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* ATENDENTES ATIVOS */}
			  {/*<Grid item xs={12} sm={6} md={4}>
            <Paper
              className={classes.card6}
              style={{ overflow: "hidden" }}
              elevation={6}
            >
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <Typography
                    component="h3"
                    variant="h6"
                    paragraph
                  >
                    Conversas Ativas
                  </Typography>
                  <Grid item>
                    <Typography
                      component="h1"
                      variant="h4"
                    >
                      {GetUsers()}
                      <span
                        style={{ color: "#805753" }}
                      >
                        /{attendants.length}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <RecordVoiceOverIcon
                    style={{
                      fontSize: 100,
                      color: "#805753",
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
</Grid>*/}

          {/* FINALIZADOS */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              className={classes.card3}
              style={{ overflow: "hidden" }}
              elevation={0}
            >
              <Grid container spacing={0} style={{ height: '100%', alignItems: 'center' }}>
                <Grid item xs={8}>
                  <Typography className={`${classes.cardTitle} ${classes.cardTitleGreen}`}>
                    {i18n.t("dashboard.counters.finished")}
                  </Typography>
                  <Typography className={classes.cardNumber}>
                    {counters.supportFinished}
                  </Typography>
                </Grid>
                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <CheckCircleIcon className={`${classes.cardIcon} ${classes.cardIconGreen}`} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* NOVOS CONTATOS */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              className={classes.card4}
              style={{ overflow: "hidden" }}
              elevation={0}
            >
              <Grid container spacing={0} style={{ height: '100%', alignItems: 'center' }}>
                <Grid item xs={8}>
                  <Typography className={`${classes.cardTitle} ${classes.cardTitlePurple}`}>
                    {i18n.t("dashboard.counters.newContacts")}
                  </Typography>
                  <Typography className={classes.cardNumber}>
                    {GetContacts(true)}
                  </Typography>
                </Grid>
                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <GroupAddIcon className={`${classes.cardIcon} ${classes.cardIconPurple}`} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          
          {/* T.M. DE ATENDIMENTO */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              className={classes.card8}
              style={{ overflow: "hidden" }}
              elevation={0}
            >
              <Grid container spacing={0} style={{ height: '100%', alignItems: 'center' }}>
                <Grid item xs={8}>
                  <Typography className={`${classes.cardTitle} ${classes.cardTitlePink}`}>
                    {i18n.t("dashboard.counters.averageTalkTime")}
                  </Typography>
                  <Typography className={classes.cardNumber}>
                    {formatTime(counters.avgSupportTime)}
                  </Typography>
                </Grid>
                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <AccessAlarmIcon className={`${classes.cardIcon} ${classes.cardIconPink}`} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* T.M. DE ESPERA */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              className={classes.card9}
              style={{ overflow: "hidden" }}
              elevation={0}
            >
              <Grid container spacing={0} style={{ height: '100%', alignItems: 'center' }}>
                <Grid item xs={8}>
                  <Typography className={`${classes.cardTitle} ${classes.cardTitleCyan}`}>
                    {i18n.t("dashboard.counters.averageWaitTime")}
                  </Typography>
                  <Typography className={classes.cardNumber}>
                    {formatTime(counters.avgWaitTime)}
                  </Typography>
                </Grid>
                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <TimerIcon className={`${classes.cardIcon} ${classes.cardIconCyan}`} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
		  
		  {/* FILTROS COMPACTOS */}
          <Grid item xs={12}>
            <Paper
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                background: theme.palette.type === 'dark' ? '#1e1e1e' : '#ffffff',
                boxShadow: theme.palette.type === 'dark'
                  ? '0 2px 8px rgba(0,0,0,0.3)'
                  : '0 2px 8px rgba(0,0,0,0.08)',
                display: 'inline-block',
                maxWidth: 'fit-content',
              }}
              elevation={0}
            >
              <Grid container spacing={1.5} alignItems="center" wrap="nowrap">
                <Grid item>
                  <FormControl size="small" variant="outlined" style={{ minWidth: '160px' }}>
                    <InputLabel id="filter-type-label">{i18n.t("dashboard.filters.filterType.title")}</InputLabel>
                    <Select
                      labelId="filter-type-label"
                      value={filterType}
                      onChange={(e) => handleChangeFilterType(e.target.value)}
                      label={i18n.t("dashboard.filters.filterType.title")}
                    >
                      <MenuItem value={1}>{i18n.t("dashboard.filters.filterType.options.perDate")}</MenuItem>
                      <MenuItem value={2}>{i18n.t("dashboard.filters.filterType.options.perPeriod")}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {renderFilters()}

                <Grid item>
                  <ButtonWithSpinner
                    loading={loading}
                    onClick={() => fetchData()}
                    variant="contained"
                    color="primary"
                    style={{
                      minWidth: '100px',
                      height: '40px',
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    {i18n.t("dashboard.buttons.filter")}
                  </ButtonWithSpinner>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* USUARIOS ONLINE */}
          <Grid item xs={12}>
            <AttendantsCards
              attendants={attendants}
              loading={loading}
            />
          </Grid>

          {/* TOTAL DE ATENDIMENTOS POR USUARIO */}
          <Grid item xs={12}>
            <Paper className={classes.fixedHeightPaper2}>
              <ChatsUser />
            </Paper>
          </Grid>

          {/* TOTAL DE ATENDIMENTOS */}
          <Grid item xs={12}>
            <Paper className={classes.fixedHeightPaper2}>
              <ChartsDate />
            </Paper>
          </Grid>

        </Grid>
      </Container >
    </div >
  );
};

export default Dashboard;

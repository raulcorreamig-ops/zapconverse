import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  CircularProgress,
  Chip,
  Fade,
  Grow
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { green, red, amber, blue } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import PersonIcon from '@material-ui/icons/Person';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import StarIcon from '@material-ui/icons/Star';
import moment from 'moment';
import { i18n } from "../../translate/i18n";

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.type === 'dark'
      ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    borderRadius: '16px',
    boxShadow: theme.palette.type === 'dark'
      ? '0 4px 12px rgba(0, 0, 0, 0.3)'
      : '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: theme.palette.type === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.06)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.palette.type === 'dark'
        ? '0 8px 24px rgba(0, 0, 0, 0.4)'
        : '0 8px 24px rgba(0, 0, 0, 0.12)',
    },
  },
  cardContent: {
    padding: theme.spacing(3),
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  avatar: {
    width: 56,
    height: 56,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 600,
    fontSize: '1.1rem',
    color: theme.palette.type === 'dark' ? '#e0e0e0' : '#2c3e50',
    marginBottom: theme.spacing(0.5),
  },
  statusChip: {
    fontWeight: 500,
    fontSize: '0.75rem',
  },
  statusOnline: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: '#fff',
    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
  },
  statusOffline: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: '#fff',
    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2.5),
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  circularProgressContainer: {
    position: 'relative',
    display: 'inline-flex',
  },
  circularProgressBox: {
    position: 'relative',
    display: 'inline-flex',
    width: 70,
    height: 70,
  },
  circularProgressLabel: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'column',
  },
  statLabel: {
    fontSize: '0.75rem',
    fontWeight: 500,
    color: theme.palette.type === 'dark' ? '#9ca3af' : '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
  },
  statValue: {
    fontSize: '1rem',
    fontWeight: 600,
    color: theme.palette.type === 'dark' ? '#e0e0e0' : '#1f2937',
  },
  ratingValue: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#fbbf24',
  },
  divider: {
    height: '1px',
    background: theme.palette.type === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.08)',
    margin: theme.spacing(2, 0),
  },
  icon: {
    fontSize: '1rem',
  },
}));

function CircularProgressWithLabel({ value, color }) {
  const classes = useStyles();
  const normalizedValue = Math.min(100, Math.max(0, (value / 3) * 100));

  return (
    <Box className={classes.circularProgressBox}>
      <CircularProgress
        variant="determinate"
        value={100}
        size={70}
        thickness={4}
        style={{
          color: 'rgba(0, 0, 0, 0.1)',
          position: 'absolute',
        }}
      />
      <CircularProgress
        variant="determinate"
        value={normalizedValue}
        size={70}
        thickness={4}
        style={{
          color: color,
          transition: 'all 0.3s ease-in-out',
        }}
      />
      <Box className={classes.circularProgressLabel}>
        <StarIcon style={{ color: color, fontSize: '1.2rem' }} />
        <Typography variant="caption" style={{ color: color, fontWeight: 700 }}>
          {value.toFixed(1)}
        </Typography>
      </Box>
    </Box>
  );
}

export default function AttendantsCards({ attendants, loading }) {
  const classes = useStyles();

  function formatTime(minutes) {
    return moment().startOf('day').add(minutes, 'minutes').format('HH[h] mm[m]');
  }

  function getRatingColor(rating) {
    if (rating >= 2.5) return '#10b981'; // Verde
    if (rating >= 1.5) return '#fbbf24'; // Amarelo
    return '#ef4444'; // Vermelho
  }

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Box style={{ textAlign: 'center', padding: '20px' }}>
                  <CircularProgress size={40} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      {attendants.map((attendant, index) => (
        <Grow
          in={true}
          timeout={300 + index * 100}
          key={index}
        >
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                {/* Header */}
                <Box className={classes.header}>
                  <Avatar className={classes.avatar}>
                    <PersonIcon style={{ fontSize: '2rem' }} />
                  </Avatar>
                  <Box className={classes.nameContainer}>
                    <Typography className={classes.name}>
                      {attendant.name}
                    </Typography>
                    <Chip
                      size="small"
                      icon={attendant.online ? <CheckCircleIcon /> : <ErrorIcon />}
                      label={attendant.online ? 'Online' : 'Offline'}
                      className={`${classes.statusChip} ${
                        attendant.online ? classes.statusOnline : classes.statusOffline
                      }`}
                    />
                  </Box>
                </Box>

                <Box className={classes.divider} />

                {/* Stats */}
                <Box className={classes.statsContainer}>
                  {/* Rating */}
                  <Box className={classes.statItem}>
                    <CircularProgressWithLabel
                      value={attendant.rating || 0}
                      color={getRatingColor(attendant.rating || 0)}
                    />
                    <Box>
                      <Typography className={classes.statLabel}>
                        <StarIcon className={classes.icon} />
                        Avaliação
                      </Typography>
                      <Typography className={classes.statValue}>
                        {attendant.rating ? `${attendant.rating.toFixed(1)} / 3.0` : 'Sem avaliação'}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Tempo médio */}
                  <Box className={classes.statItem}>
                    <Box style={{ width: 70, textAlign: 'center' }}>
                      <AccessTimeIcon style={{ fontSize: '2.5rem', color: '#3b82f6' }} />
                    </Box>
                    <Box>
                      <Typography className={classes.statLabel}>
                        <AccessTimeIcon className={classes.icon} />
                        T.M. Atendimento
                      </Typography>
                      <Typography className={classes.statValue}>
                        {formatTime(attendant.avgSupportTime)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grow>
      ))}
    </Grid>
  );
}

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import { toast } from "react-toastify";
import api from "../../services/api";
import toastError from "../../errors/toastError";
import { i18n } from "../../translate/i18n";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
    marginTop: theme.spacing(2),
    "& .MuiOutlinedInput-root": {
      borderRadius: 12,
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
      },
    },
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },
}));

const SendFlowModal = ({ open, onClose, ticketId }) => {
  const classes = useStyles();
  const [flows, setFlows] = useState([]);
  const [selectedFlow, setSelectedFlow] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingFlows, setLoadingFlows] = useState(false);

  useEffect(() => {
    if (open) {
      fetchFlows();
    }
  }, [open]);

  const fetchFlows = async () => {
    setLoadingFlows(true);
    try {
      const { data } = await api.get("/flowbuilder");
      setFlows(data.flows || data);
    } catch (err) {
      toastError(err);
    } finally {
      setLoadingFlows(false);
    }
  };

  const handleSendFlow = async () => {
    if (!selectedFlow) {
      toast.error("Selecione um funil para enviar");
      return;
    }

    setLoading(true);
    try {
      await api.post("/flowbuilder/send-manually", {
        ticketId: ticketId,
        flowId: selectedFlow,
      });

      toast.success("Funil enviado com sucesso!");
      handleClose();
    } catch (err) {
      toastError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedFlow("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Enviar Funil Manualmente</DialogTitle>
      <DialogContent>
        {loadingFlows ? (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        ) : (
          <FormControl className={classes.formControl}>
            <InputLabel>Selecione o Funil</InputLabel>
            <Select
              value={selectedFlow}
              onChange={(e) => setSelectedFlow(e.target.value)}
              disabled={loading}
            >
              {flows.map((flow) => (
                <MenuItem key={flow.id} value={flow.id}>
                  {flow.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSendFlow}
          color="primary"
          variant="contained"
          disabled={loading || loadingFlows || !selectedFlow}
        >
          {loading ? <CircularProgress size={24} /> : "Enviar Funil"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SendFlowModal;

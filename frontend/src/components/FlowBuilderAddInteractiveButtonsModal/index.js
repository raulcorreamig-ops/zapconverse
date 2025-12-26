import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import {
  IconButton,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Paper
} from "@material-ui/core";
import { Add as AddIcon, Delete as DeleteIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginRight: theme.spacing(1),
    flex: 1,
  },
  buttonItem: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  btnWrapper: {
    position: "relative",
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const FlowBuilderAddInteractiveButtonsModal = ({
  open,
  onSave,
  onUpdate,
  data,
  close,
}) => {
  const classes = useStyles();
  const isMounted = useRef(true);

  const initialState = {
    title: "",
    message: "",
    footer: "",
    buttons: [
      {
        type: "quick_reply",
        displayText: "",
        id: "btn_1"
      }
    ]
  };

  const [interactiveData, setInteractiveData] = useState(initialState);
  const [activeModal, setActiveModal] = useState(false);
  const [labels, setLabels] = useState({
    title: "Adicionar Botões Interativos",
    btn: "Adicionar",
  });

  useEffect(() => {
    if (open === "edit") {
      setLabels({
        title: "Editar Botões Interativos",
        btn: "Salvar",
      });
      setInteractiveData(data.data || initialState);
      setActiveModal(true);
    } else if (open === "create") {
      setLabels({
        title: "Criar Botões Interativos",
        btn: "Salvar",
      });
      setInteractiveData(initialState);
      setActiveModal(true);
    }

    return () => {
      isMounted.current = false;
    };
  }, [open]);

  const handleClose = () => {
    close(null);
    setActiveModal(false);
  };

  const handleSaveInteractiveButtons = () => {
    if (open === "edit") {
      onUpdate(interactiveData);
    } else if (open === "create") {
      onSave(interactiveData);
    }
    handleClose();
  };

  const addButton = () => {
    setInteractiveData({
      ...interactiveData,
      buttons: [
        ...interactiveData.buttons,
        {
          type: "quick_reply",
          displayText: "",
          id: `btn_${interactiveData.buttons.length + 1}`
        }
      ]
    });
  };

  const removeButton = (index) => {
    const newButtons = interactiveData.buttons.filter((_, i) => i !== index);
    setInteractiveData({
      ...interactiveData,
      buttons: newButtons
    });
  };

  const updateButton = (index, field, value) => {
    const newButtons = [...interactiveData.buttons];
    newButtons[index] = {
      ...newButtons[index],
      [field]: value
    };
    setInteractiveData({
      ...interactiveData,
      buttons: newButtons
    });
  };

  const updateButtonType = (index, newType) => {
    const newButtons = [...interactiveData.buttons];
    const baseButton = {
      type: newType,
      displayText: newButtons[index].displayText || ""
    };

    switch (newType) {
      case "quick_reply":
        newButtons[index] = { ...baseButton, id: `btn_${index + 1}` };
        break;
      case "cta_url":
        newButtons[index] = { ...baseButton, url: "" };
        break;
      case "cta_call":
        newButtons[index] = { ...baseButton, phoneNumber: "" };
        break;
      case "cta_copy":
        newButtons[index] = { ...baseButton, copyCode: "" };
        break;
      default:
        newButtons[index] = baseButton;
    }

    setInteractiveData({
      ...interactiveData,
      buttons: newButtons
    });
  };

  const renderButtonFields = (button, index) => {
    return (
      <Paper key={index} className={classes.buttonItem} elevation={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Tipo de Botão</InputLabel>
              <Select
                value={button.type}
                onChange={(e) => updateButtonType(index, e.target.value)}
                label="Tipo de Botão"
              >
                <MenuItem value="quick_reply">Resposta Rápida</MenuItem>
                <MenuItem value="cta_url">Link/URL</MenuItem>
                <MenuItem value="cta_call">Chamada</MenuItem>
                <MenuItem value="cta_copy">Copiar Texto</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={7}>
            <TextField
              fullWidth
              label="Texto do Botão"
              value={button.displayText}
              onChange={(e) => updateButton(index, "displayText", e.target.value)}
              size="small"
              variant="outlined"
            />

            {button.type === "quick_reply" && (
              <TextField
                fullWidth
                label="ID do Botão"
                value={button.id || ""}
                onChange={(e) => updateButton(index, "id", e.target.value)}
                size="small"
                variant="outlined"
                style={{ marginTop: 8 }}
                helperText="ID único para identificar a resposta"
              />
            )}

            {button.type === "cta_url" && (
              <TextField
                fullWidth
                label="URL"
                value={button.url || ""}
                onChange={(e) => updateButton(index, "url", e.target.value)}
                size="small"
                variant="outlined"
                style={{ marginTop: 8 }}
                helperText="https://exemplo.com"
              />
            )}

            {button.type === "cta_call" && (
              <TextField
                fullWidth
                label="Número de Telefone"
                value={button.phoneNumber || ""}
                onChange={(e) => updateButton(index, "phoneNumber", e.target.value)}
                size="small"
                variant="outlined"
                style={{ marginTop: 8 }}
                helperText="Ex: 5511999999999"
              />
            )}

            {button.type === "cta_copy" && (
              <TextField
                fullWidth
                label="Texto para Copiar"
                value={button.copyCode || ""}
                onChange={(e) => updateButton(index, "copyCode", e.target.value)}
                size="small"
                variant="outlined"
                style={{ marginTop: 8 }}
                helperText="Texto que será copiado"
              />
            )}
          </Grid>

          <Grid item xs={12} sm={1}>
            <IconButton
              onClick={() => removeButton(index)}
              color="secondary"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  return (
    <div className={classes.root}>
      <Dialog
        open={activeModal}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        <DialogTitle>{labels.title}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Título (opcional)"
                fullWidth
                value={interactiveData.title}
                onChange={(e) => setInteractiveData({ ...interactiveData, title: e.target.value })}
                variant="outlined"
                size="small"
                helperText="Título em negrito"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Rodapé (opcional)"
                fullWidth
                value={interactiveData.footer}
                onChange={(e) => setInteractiveData({ ...interactiveData, footer: e.target.value })}
                variant="outlined"
                size="small"
                helperText="Texto no rodapé"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Mensagem *"
                fullWidth
                multiline
                rows={3}
                value={interactiveData.message}
                onChange={(e) => setInteractiveData({ ...interactiveData, message: e.target.value })}
                variant="outlined"
                helperText="Texto principal da mensagem"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom style={{ marginTop: 16 }}>
                Botões
              </Typography>
              {interactiveData.buttons.map((button, index) => renderButtonFields(button, index))}

              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={addButton}
                fullWidth
                style={{ marginTop: 16 }}
              >
                Adicionar Botão
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancelar
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.btnWrapper}
            onClick={handleSaveInteractiveButtons}
          >
            {labels.btn}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FlowBuilderAddInteractiveButtonsModal;

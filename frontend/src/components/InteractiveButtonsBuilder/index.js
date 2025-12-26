import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Typography,
  Grid,
  Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  buttonItem: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  addButton: {
    marginTop: theme.spacing(2),
  },
}));

const InteractiveButtonsBuilder = ({ value, onChange }) => {
  const classes = useStyles();
  const [buttons, setButtons] = useState(() => {
    try {
      return value ? JSON.parse(value) : [];
    } catch {
      return [];
    }
  });

  const handleAddButton = () => {
    const newButton = {
      name: "quick_reply",
      buttonParamsJson: JSON.stringify({
        display_text: "",
        id: `btn_${Date.now()}`
      })
    };
    const newButtons = [...buttons, newButton];
    setButtons(newButtons);
    onChange(JSON.stringify(newButtons));
  };

  const handleRemoveButton = (index) => {
    const newButtons = buttons.filter((_, i) => i !== index);
    setButtons(newButtons);
    onChange(JSON.stringify(newButtons));
  };

  const handleButtonTypeChange = (index, newType) => {
    const newButtons = [...buttons];
    let params = {};

    switch (newType) {
      case "quick_reply":
        params = { display_text: "", id: `btn_${Date.now()}` };
        break;
      case "cta_url":
        params = { display_text: "", url: "", merchant_url: "" };
        break;
      case "cta_call":
        params = { display_text: "", phone_number: "" };
        break;
      case "cta_copy":
        params = { display_text: "", copy_code: "" };
        break;
      default:
        params = { display_text: "" };
    }

    newButtons[index] = {
      name: newType,
      buttonParamsJson: JSON.stringify(params)
    };

    setButtons(newButtons);
    onChange(JSON.stringify(newButtons));
  };

  const handleButtonParamChange = (index, paramName, paramValue) => {
    const newButtons = [...buttons];
    const params = JSON.parse(newButtons[index].buttonParamsJson);
    params[paramName] = paramValue;

    // Para cta_url, sincronizar merchant_url com url
    if (paramName === 'url' && newButtons[index].name === 'cta_url') {
      params.merchant_url = paramValue;
    }

    newButtons[index].buttonParamsJson = JSON.stringify(params);
    setButtons(newButtons);
    onChange(JSON.stringify(newButtons));
  };

  const renderButtonFields = (button, index) => {
    let params = {};
    try {
      params = JSON.parse(button.buttonParamsJson);
    } catch {
      params = {};
    }

    return (
      <Box>
        <TextField
          fullWidth
          label="Texto do Botão"
          value={params.display_text || ""}
          onChange={(e) => handleButtonParamChange(index, "display_text", e.target.value)}
          margin="dense"
          variant="outlined"
        />

        {button.name === "quick_reply" && (
          <TextField
            fullWidth
            label="ID do Botão"
            value={params.id || ""}
            onChange={(e) => handleButtonParamChange(index, "id", e.target.value)}
            margin="dense"
            variant="outlined"
            helperText="ID único para identificar a resposta do botão"
          />
        )}

        {button.name === "cta_url" && (
          <TextField
            fullWidth
            label="URL"
            value={params.url || ""}
            onChange={(e) => handleButtonParamChange(index, "url", e.target.value)}
            margin="dense"
            variant="outlined"
            helperText="URL que será aberta ao clicar no botão"
          />
        )}

        {button.name === "cta_call" && (
          <TextField
            fullWidth
            label="Número de Telefone"
            value={params.phone_number || ""}
            onChange={(e) => handleButtonParamChange(index, "phone_number", e.target.value)}
            margin="dense"
            variant="outlined"
            helperText="Ex: 5511999999999"
          />
        )}

        {button.name === "cta_copy" && (
          <TextField
            fullWidth
            label="Texto para Copiar"
            value={params.copy_code || ""}
            onChange={(e) => handleButtonParamChange(index, "copy_code", e.target.value)}
            margin="dense"
            variant="outlined"
            helperText="Texto que será copiado ao clicar"
          />
        )}
      </Box>
    );
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Botões Interativos
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        Adicione botões interativos à sua mensagem. Os botões tornam mais fácil para os
        destinatários responderem com ações pré-definidas.
      </Typography>

      {buttons.map((button, index) => (
        <Paper key={index} className={classes.buttonItem} elevation={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth variant="outlined" margin="dense">
                <InputLabel>Tipo de Botão</InputLabel>
                <Select
                  value={button.name}
                  onChange={(e) => handleButtonTypeChange(index, e.target.value)}
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
              {renderButtonFields(button, index)}
            </Grid>

            <Grid item xs={12} sm={1}>
              <IconButton
                onClick={() => handleRemoveButton(index)}
                color="secondary"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddButton}
        className={classes.addButton}
        fullWidth
      >
        Adicionar Botão
      </Button>

      {buttons.length > 0 && (
        <Box mt={2}>
          <Typography variant="caption" color="textSecondary">
            Total de botões: {buttons.length} | Máximo recomendado: 3
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default InteractiveButtonsBuilder;

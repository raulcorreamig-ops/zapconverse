import { WASocket } from "@itsukichan/baileys";

export interface InteractiveButton {
  name: string;
  buttonParamsJson: string;
}

export interface SendButtonMessageOptions {
  text: string;
  title?: string;
  subtitle?: string;
  footer?: string;
  interactiveButtons: InteractiveButton[];
}

export const sendInteractiveMessage = async (
  wbot: WASocket,
  jid: string,
  options: SendButtonMessageOptions
): Promise<any> => {
  try {
    const message = await wbot.sendMessage(jid, {
      text: options.text,
      title: options.title,
      subtitle: options.subtitle,
      footer: options.footer,
      interactiveButtons: options.interactiveButtons
    });

    return message;
  } catch (error) {
    console.error('Erro ao enviar mensagem com botões:', error);
    throw error;
  }
};

// Função helper para criar botão quick_reply
export const createQuickReplyButton = (displayText: string, id: string): InteractiveButton => {
  return {
    name: 'quick_reply',
    buttonParamsJson: JSON.stringify({
      display_text: displayText,
      id: id
    })
  };
};

// Função helper para criar botão URL
export const createUrlButton = (displayText: string, url: string): InteractiveButton => {
  return {
    name: 'cta_url',
    buttonParamsJson: JSON.stringify({
      display_text: displayText,
      url: url,
      merchant_url: url
    })
  };
};

// Função helper para criar botão de chamada
export const createCallButton = (displayText: string, phoneNumber: string): InteractiveButton => {
  return {
    name: 'cta_call',
    buttonParamsJson: JSON.stringify({
      display_text: displayText,
      phone_number: phoneNumber
    })
  };
};

// Função helper para criar botão de cópia
export const createCopyButton = (displayText: string, copyCode: string): InteractiveButton => {
  return {
    name: 'cta_copy',
    buttonParamsJson: JSON.stringify({
      display_text: displayText,
      copy_code: copyCode
    })
  };
};

// Função helper para criar lista de seleção única
export const createSingleSelectButton = (
  title: string,
  sections: Array<{
    title: string;
    highlight_label?: string;
    rows: Array<{
      header?: string;
      title: string;
      description?: string;
      id: string;
    }>;
  }>
): InteractiveButton => {
  return {
    name: 'single_select',
    buttonParamsJson: JSON.stringify({
      title: title,
      sections: sections
    })
  };
};

export default sendInteractiveMessage;

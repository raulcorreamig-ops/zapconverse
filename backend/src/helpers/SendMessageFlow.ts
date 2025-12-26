import Whatsapp from "../models/Whatsapp";
import GetWhatsappWbot from "./GetWhatsappWbot";
import fs from "fs";

import { getMessageOptions } from "../services/WbotServices/SendWhatsAppMedia";
import { sendInteractiveMessage, InteractiveButton } from "./SendMessageWithButtons";

export type MessageData = {
  number: number | string;
  body: string;
  mediaPath?: string;
  buttons?: InteractiveButton[];
  title?: string;
  subtitle?: string;
  footer?: string;
};

export const SendMessageFlow = async (
  whatsapp: Whatsapp,
  messageData: MessageData,
  isFlow: boolean = false,
  isRecord: boolean = false
): Promise<any> => {
  try {
    const wbot = await GetWhatsappWbot(whatsapp);
    const chatId = `${messageData.number}@s.whatsapp.net`;

    let message;

    const body = `\u200e${messageData.body}`;

    // Se tiver botões, usa a nova função de mensagens interativas
    if (messageData.buttons && messageData.buttons.length > 0) {
      message = await sendInteractiveMessage(wbot, chatId, {
        text: body,
        title: messageData.title,
        subtitle: messageData.subtitle,
        footer: messageData.footer,
        interactiveButtons: messageData.buttons
      });
    } else {
      // Mensagem simples sem botões
      message = await wbot.sendMessage(chatId, { text: body });
    }

    return message;
  } catch (err: any) {
    throw new Error(err);
  }
};

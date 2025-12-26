import { proto as baileysproto, WASocket } from "@itsukichan/baileys";

declare global {
  namespace proto {
    export import IMessage = baileysproto.IMessage;
    export import IWebMessageInfo = baileysproto.IWebMessageInfo;
    export import WebMessageInfo = baileysproto.WebMessageInfo;
    export import IMessageKey = baileysproto.IMessageKey;
    export import Message = baileysproto.Message;
  }
}

declare module "@itsukichan/baileys" {
  interface WASocket {
    onWhatsApp(...jids: string[]): Promise<{
      jid: string;
      exists: boolean;
      lid: string;
    }[] | undefined>;
  }
}

import AppError from "../../errors/AppError";
import Ticket from "../../models/Ticket";
import { FlowBuilderModel } from "../../models/FlowBuilder";
import Whatsapp from "../../models/Whatsapp";
import { IConnections, INodes } from "../WebhookService/DispatchWebHookService";
import { ActionsWebhookService } from "../WebhookService/ActionsWebhookService";
import { WebhookModel } from "../../models/Webhook";
import { randomString } from "../../utils/randomCode";

interface Request {
  ticketId: number;
  flowId: number;
  companyId: number;
}

const SendFlowManuallyService = async ({
  ticketId,
  flowId,
  companyId
}: Request): Promise<void> => {
  // Buscar o ticket
  const ticket = await Ticket.findOne({
    where: {
      id: ticketId,
      companyId
    },
    include: ["contact", "whatsapp"]
  });

  if (!ticket) {
    throw new AppError("ERR_NO_TICKET_FOUND", 404);
  }

  // Buscar o flow
  const flow = await FlowBuilderModel.findOne({
    where: {
      id: flowId,
      company_id: companyId
    }
  });

  if (!flow) {
    throw new AppError("ERR_NO_FLOW_FOUND", 404);
  }

  if (!flow.flow || !flow.flow["nodes"] || !flow.flow["connections"]) {
    throw new AppError("ERR_INVALID_FLOW_DATA", 400);
  }

  const nodes: INodes[] = flow.flow["nodes"];
  const connections: IConnections[] = flow.flow["connections"];

  // Criar um webhook temporário para o flow
  const hashWebhookId = randomString(30);

  const webhook = await WebhookModel.create({
    hash_id: hashWebhookId,
    company_id: companyId,
    user_id: ticket.userId || 1,
    name: `Flow Manual - ${flow.name}`,
    config: {
      details: {
        idFlow: flow.id,
        nameFlow: flow.name,
        flowId: flow.id
      },
      itensWeb: []
    }
  });

  // Atualizar o ticket com o hashFlowId
  await ticket.update({
    hashFlowId: hashWebhookId,
    flowStopped: flow.id,
    lastFlowId: nodes[0].id,  // Começar do primeiro nó
    status: "pending"
  });

  // Disparar o flow
  await ActionsWebhookService(
    ticket.whatsappId,
    flow.id,
    companyId,
    nodes,
    connections,
    nodes[0].id, // Começar do primeiro node
    {},
    {
      inputs: [
        { keyValue: "nome", data: ticket.contact.name },
        { keyValue: "celular", data: ticket.contact.number },
        { keyValue: "email", data: ticket.contact.email || "" }
      ],
      keysFull: []
    },
    hashWebhookId,
    undefined,
    ticket.id,
    {
      number: ticket.contact.number,
      name: ticket.contact.name,
      email: ticket.contact.email || ""
    }
  );
};

export default SendFlowManuallyService;

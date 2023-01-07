import { Message } from '@/dto/platform-core/messaging/core';
import {
  CreateInboxArgs,
  CreateInboxReqResponse,
} from '@/dto/platform-core/messaging/create-inbox';
import {
  DecryptMessageArgs,
  DecryptMessageReqResponse,
} from '@/dto/platform-core/messaging/decrypt-message';
import { DeleteInboxArgs } from '@/dto/platform-core/messaging/delete-inbox';
import { DeleteMessageArgs } from '@/dto/platform-core/messaging/delete-message';
import { EncryptMessageArgs } from '@/dto/platform-core/messaging/encrypt-message';
import {
  ListInboxDidsArgs,
  ListInboxDidsReqResponse,
} from '@/dto/platform-core/messaging/list-inbox-dids';
import {
  ListInboxMessagesArgs,
  ListInboxMessagesReqResponse,
} from '@/dto/platform-core/messaging/list-inbox-messages';
import {
  ListInboxesArgs,
  ListInboxesReqResponse,
} from '@/dto/platform-core/messaging/list-inboxes';
import {
  RegisterInboxWithDidArgs,
  RegisterDidWithInboxReqResponse,
} from '@/dto/platform-core/messaging/register-did-with-inbox';
import {
  RetrieveInboxNameArgs,
  RetrieveInboxNameReqResponse,
} from '@/dto/platform-core/messaging/retrieve-inbox-name';
import { RetrieveMessageArgs } from '@/dto/platform-core/messaging/retrieve-message';
import { SendMessageArgs } from '@/dto/platform-core/messaging/send-message';
import { SignMessageArgs } from '@/dto/platform-core/messaging/sign-message';
import { UnregisterDidWithinInboxArgs } from '@/dto/platform-core/messaging/unregister-did-within-inbox';
import {
  UpdateInboxArgs,
  UpdateInboxReqResponse,
} from '@/dto/platform-core/messaging/update-inbox';
import {
  VerifyMessageArgs,
  VerifyMessageReqResponse,
} from '@/dto/platform-core/messaging/verify-message';

const createInbox = async (
  args: CreateInboxArgs,
): Promise<CreateInboxReqResponse> => {
  const resp = await fetch(
    `https://${args.auth.tenantUrl}.vii.mattr.global/core/v1/messaging/inboxes`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${args.auth.authToken}`,
      },
      body: JSON.stringify(args.body),
    },
  );
  return await resp.json();
};

const listInboxs = async (
  args: ListInboxesArgs,
): Promise<ListInboxesReqResponse> => {
  let url: string;
  switch (args.query) {
    case undefined:
      url = `https://${args.auth.tenantUrl}.vii.mattr.global/core/v1/messaging/inboxes`;

    default:
      const query = new URLSearchParams({
        limit: args.query.limit.toString(),
        cursor: args.query.cursor,
      }).toString();
      url = `https://${args.auth.tenantUrl}.vii.mattr.global/core/v1/messaging/inboxes?${query}`;
  }
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${args.auth.authToken}`,
    },
  });
  return await resp.json();
};

const retrieveInboxName = async (
  args: RetrieveInboxNameArgs,
): Promise<RetrieveInboxNameReqResponse> => {
  const resp = await fetch(
    `https://${args.auth.tenantUrl}.vii.mattr.global/core/v1/messaging/inboxes/${args.id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${args.auth.authToken}`,
      },
    },
  );
  return await resp.json();
};
const updateInbox = async (
  args: UpdateInboxArgs,
): Promise<UpdateInboxReqResponse> => {
  const resp = await fetch(
    `https://${args.auth.tenantUrl}.vii.mattr.global/core/v1/messaging/inboxes/${args.args.id}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${args.auth.authToken}`,
      },
      body: JSON.stringify(args.args.body),
    },
  );
  return await resp.json();
};
const deleteInbox = async (args: DeleteInboxArgs): Promise<void> => {
  const resp = await fetch(
    `https://${args.auth.tenantUrl}.vii.mattr.global/core/v1/messaging/inboxes/${args.id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${args.auth.authToken}`,
      },
    },
  );
  return await resp.json();
};

const registerDidwithInbox = async (
  args: RegisterInboxWithDidArgs,
): Promise<RegisterDidWithInboxReqResponse> => {
  const resp = await fetch(
    `https://${args.auth.tenantUrl}.vii.mattr.global/core/v1/messaging/inboxes/${args.body.did}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${args.auth.authToken}`,
      },
      body: JSON.stringify(args.body),
    },
  );
  return await resp.json();
};
const listInboxDids = async (
  args: ListInboxDidsArgs,
): Promise<ListInboxDidsReqResponse> => {
  let url: string;
  switch (args.query) {
    case undefined:
      url = `https://${args.auth.tenantUrl}.vii.mattr.global/core/v1/messaging/inboxes/${args.inboxId}/dids`;
    default:
      const query = new URLSearchParams({
        limit: args.query.limit.toString(),
        cursor: args.query.cursor,
      }).toString();
      url = `https://${args.auth.tenantUrl}.vii.mattr.global/core/v1/messaging/inboxes/${args.inboxId}/dids?${query}`;
  }
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${args.auth.authToken}`,
    },
  });
  return await resp.json();
};

// maybe typo on doc - should be 'within an inbox'
const unregisterDidWithinInbox = async (
  args: UnregisterDidWithinInboxArgs,
): Promise<void> => {
  const resp = await fetch(
    `https://${args.auth.tenantUrl}.vii.mattr.global/core/v1/messaging/inboxes/${args.query.inboxId}/dids`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${args.auth.authToken}`,
      },
      body: JSON.stringify(args.body),
    },
  );
  return await resp.json();
};

const listInboxMessages = async (
  args: ListInboxMessagesArgs,
): Promise<ListInboxMessagesReqResponse> => {
  let url: string;
  switch (args.query) {
    case undefined:
      url = `https://${args.auth.tenantUrl}.vii.mattr.global/core/v1/messaging/inboxes/${args.inboxId}/messages`;
    default:
      const query = new URLSearchParams({
        limit: args.query.limit.toString(),
        cursor: args.query.cursor,
      }).toString();
      url = `https://${args.auth.tenantUrl}.vii.mattr.global/core/v1/messaging/inboxes/${args.inboxId}/messages?${query}`;
  }
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${args.auth.authToken}`,
    },
  });
  return await resp.json();
};

const retrieveMessage = async (args: RetrieveMessageArgs): Promise<Message> => {
  const resp = await fetch(
    `https://${args.auth.tenantUrl}.vii.mattr.global/core/v1/messaging/inboxes/${args.query.inboxId}/messages/${args.query.messageId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${args.auth.authToken}`,
      },
    },
  );
  return await resp.json();
};

const deleteMessage = async (args: DeleteMessageArgs): Promise<void> => {
  const resp = await fetch(
    `https://${args.auth.tenantUrl}.vii.mattr.global/core/v1/messaging/inboxes/${args.query.inboxId}/messages/${args.query.messageId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${args.auth.authToken}`,
      },
    },
  );
  return await resp.json();
};

const signMessage = async (args: SignMessageArgs): Promise<string> => {
  const resp = await fetch(
    `https://${args.auth.tenantUrl}.vii.mattr.global/core/v1/messaging/sign`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${args.auth.authToken}`,
      },
      body: JSON.stringify(args.body),
    },
  );
  return await resp.json();
};

const verifyMessage = async (
  args: VerifyMessageArgs,
): Promise<VerifyMessageReqResponse> => {
  const resp = await fetch(
    `https://${args.auth.tenantUrl}.vii.mattr.global/core/v1/messaging/verify`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${args.auth.authToken}`,
      },
      body: JSON.stringify(args.body),
    },
  );
  return await resp.json();
};

const encryptMessage = async (args: EncryptMessageArgs): Promise<any> => {
  const resp = await fetch(
    `https://${args.auth.tenantUrl}.vii.mattr.global/core/v1/messaging/encrypt`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${args.auth.authToken}`,
      },
      body: JSON.stringify(args.body),
    },
  );
  return await resp.json();
};

const decryptMessage = async (
  args: DecryptMessageArgs,
): Promise<DecryptMessageReqResponse> => {
  const resp = await fetch(
    `https://${args.auth.tenantUrl}.vii.mattr.global/core/v1/messaging/decrypt`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${args.auth.authToken}`,
      },
      body: JSON.stringify(args.body),
    },
  );
  return await resp.json();
};

const sendMessage = async (args: SendMessageArgs): Promise<void> => {
  const resp = await fetch(
    `https://${args.auth.tenantUrl}.vii.mattr.global/core/v1/messaging/send`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${args.auth.authToken}`,
      },
      body: JSON.stringify(args.body),
    },
  );
  return await resp.json();
};

export {
  createInbox,
  listInboxs,
  retrieveInboxName,
  updateInbox,
  deleteInbox,
  registerDidwithInbox,
  listInboxDids,
  unregisterDidWithinInbox,
  listInboxMessages,
  retrieveMessage,
  deleteMessage,
  signMessage,
  verifyMessage,
  encryptMessage,
  decryptMessage,
  sendMessage,
};

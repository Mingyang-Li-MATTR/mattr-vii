import { MattrViiClient } from '@/client';
import { ConfigService } from '@nestjs/config';
import * as ApiTypes from '@/dto';

const config = new ConfigService();
const client = new MattrViiClient({
  tenantUrl: config.get('MATTR_TENANT_URL'),
  authToken: config.get('MATTR_AUTH_TOKEN'),
});

const auth = client.auth;

export const createDid_key = async () => {
  const body: ApiTypes.PlatformCore.DIDs.CreateDidReqBody = {
    method: 'key',
    options: {
      keyType: 'ed25519',
    },
  };
  const did = await client.PlatformCore.DIDs.createDid({ auth, body });
  console.log(did);
};

export const createDid_ion = async () => {
  const body: ApiTypes.PlatformCore.DIDs.CreateDidReqBody = {
    method: 'ion',
    options: {
      keyType: 'bls12381g2',
    },
  };
  const did = await client.PlatformCore.DIDs.createDid({ auth, body });
  console.log(JSON.stringify(did));
};

export const createDid_web = async () => {
  const body: ApiTypes.PlatformCore.DIDs.CreateDidReqBody = {
    method: 'web',
    options: {
      url: 'example.com',
    },
  };
  const did = await client.PlatformCore.DIDs.createDid({ auth, body });
  console.log(JSON.stringify(did));
};

export const resolveDid = async () => {
  const did = await client.PlatformCore.DIDs.resolveDid({
    auth,
    id: 'did:key:z6MkmWBp7BHangrddxzTtEk7ypqJgnDC892iabgijN2GCnGR',
  });
  console.log(JSON.stringify(did));
};

export const retrieveDids = async () => {
  const dids = await client.PlatformCore.DIDs.retrieveDids({ auth });
  console.log(JSON.stringify(dids));
};

export const createInbox = async () => {
  const date = new Date();
  const body: ApiTypes.PlatformCore.Messaging.CreateInbox.CreateInboxReqBody = {
    id: 'placeholder',
    inboxId: 'placeholder',
    payload: 'placeholder',
    createdAt: date.toString(),
  };
  const inbox = await client.PlatformCore.Messaging.createInbox({
    auth: client.auth,
    body,
  });
  console.log(inbox);
};

export const listInboxes = async () => {
  const inboxes = await client.PlatformCore.Messaging.listInboxs({ auth });
  console.log(inboxes);
};

export const retrieveInboxName = async () => {
  const inboxId = '4c8b950f-fc52-49d6-9644-fc82edeae5f2';
  const inboxName = await client.PlatformCore.Messaging.retrieveInboxName({
    auth,
    query: {
      inboxId,
    },
  });
  console.log(inboxName);
};

export const updateInbox = async () => {
  const inboxId = '4c8b950f-fc52-49d6-9644-fc82edeae5f2';
  const updatedInbox = await client.PlatformCore.Messaging.updateInbox({
    auth,
    query: { inboxId },
    body: { name: 'Inbox-1' },
  });
  console.log(updatedInbox);
};

export const deleteInbox = async () => {
  const deletedInbox = await client.PlatformCore.Messaging.deleteInbox({
    auth,
    id: 'your_inbox_id',
  });
  console.log(deletedInbox);
};

export const createWebhook = async () => {
  const body: ApiTypes.PlatformCore.Webhooks.CreateWebhook.CreateWebhookBody = {
    events: ['OidcIssuerCredentialIssued'],
    url: 'https://example.com',
  };
  const webhook = await client.PlatformCore.Webhooks.createWebhook({
    auth,
    body,
  });
  console.log(webhook);
};

export const getWebhooks = async () => {
  const webhooks = await client.PlatformCore.Webhooks.getWebhooks({ auth });
  console.log(webhooks);
};

export const main = async () => {
  // await getWebhooks();
};

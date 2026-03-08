import type { ConversionFormType, ConversionVertical, ConversionPayload } from './types';

const DEFAULT_TIMEOUT_MS = 8000;

function env(key: string) {
  return (process.env[key as keyof NodeJS.ProcessEnv] || '').trim();
}

function toEnvKey(vertical: ConversionVertical, formType: ConversionFormType) {
  return `N8N_WEBHOOK_${vertical.toUpperCase()}_${formType.toUpperCase().replace(/-/g, '_')}_URL`;
}

// Back-compat for existing env vars already used in the project
const LEGACY_ENV_MAP: Partial<Record<string, string>> = {
  'beauty:lead-magnet': 'N8N_LEAD_MAGNET_WEBHOOK_URL',
  'beauty:audit-request': 'N8N_AUDIT_REQUEST_WEBHOOK_URL',
  'general:contact': 'N8N_CONTACT_WEBHOOK_URL',
  'general:booking': 'N8N_BOOKING_WEBHOOK_URL',
  'general:chat-lead': 'N8N_CHAT_LEAD_WEBHOOK_URL',
};

export function resolveWebhookUrl(input: { vertical: ConversionVertical; formType: ConversionFormType }) {
  const primaryKey = toEnvKey(input.vertical, input.formType);
  const primary = env(primaryKey);
  if (primary) return primary;

  const legacyKey = LEGACY_ENV_MAP[`${input.vertical}:${input.formType}`];
  if (legacyKey) {
    const legacy = env(legacyKey);
    if (legacy) return legacy;
  }

  // Also allow "generic" fallbacks for early stages
  const genericKey = LEGACY_ENV_MAP[`general:${input.formType}`];
  if (genericKey) {
    const generic = env(genericKey);
    if (generic) return generic;
  }

  return '';
}

export async function postToWebhook(input: {
  webhookUrl: string;
  payload: ConversionPayload;
  timeoutMs?: number;
}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), input.timeoutMs ?? DEFAULT_TIMEOUT_MS);
  try {
    const res = await fetch(input.webhookUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(input.payload),
      signal: controller.signal,
      cache: 'no-store',
    });
    return res;
  } finally {
    clearTimeout(timeout);
  }
}


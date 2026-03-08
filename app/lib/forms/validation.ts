import type { ConversionFormType } from './types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SALON_SIZES = new Set(['1-2', '3-7', '8-15', '15+']);

export function isValidEmail(email: string) {
  return EMAIL_RE.test(email);
}

export function normalizePhone(raw: string) {
  return raw.replace(/[^\d+]/g, '').slice(0, 20);
}

function asString(v: unknown) {
  if (typeof v === 'string') return v.trim();
  return '';
}

function asNumber(v: unknown) {
  const n = typeof v === 'number' ? v : Number(String(v || '').trim());
  return Number.isFinite(n) ? n : NaN;
}

export type ValidationResult = { ok: true } | { ok: false; message: string; fields: Record<string, string> };

export function validateForm(formType: ConversionFormType, lead: Record<string, unknown>): ValidationResult {
  const fields: Record<string, string> = {};

  const name = asString(lead.name);
  const email = asString(lead.email);
  const message = asString(lead.message);
  const salonSize = asString(lead.salonSize);
  const phone = normalizePhone(asString(lead.phone));

  if (formType === 'lead-magnet') {
    if (!name || name.length < 2) fields.name = 'name';
    if (!isValidEmail(email)) fields.email = 'email';
    if (!SALON_SIZES.has(salonSize)) fields.salonSize = 'salonSize';
  }

  if (formType === 'audit-request') {
    const monthlyBookings = asNumber(lead.monthlyBookings);
    if (!name || name.length < 2) fields.name = 'name';
    if (!phone || phone.length < 8) fields.phone = 'phone';
    if (!SALON_SIZES.has(salonSize)) fields.salonSize = 'salonSize';
    if (!Number.isFinite(monthlyBookings) || monthlyBookings < 1) fields.monthlyBookings = 'monthlyBookings';
  }

  if (formType === 'contact') {
    if (!name || name.length < 2) fields.name = 'name';
    if (!isValidEmail(email)) fields.email = 'email';
    if (!message || message.length < 10) fields.message = 'message';
  }

  if (formType === 'booking') {
    const date = asString(lead.date);
    const time = asString(lead.time);
    if (!name || name.length < 2) fields.name = 'name';
    if (!isValidEmail(email)) fields.email = 'email';
    if (!date) fields.date = 'date';
    if (!time) fields.time = 'time';
  }

  if (formType === 'chat-lead') {
    const contact = asString(lead.contact);
    if (!contact || contact.length < 5) fields.contact = 'contact';
  }

  if (Object.keys(fields).length > 0) {
    return {
      ok: false,
      message: 'Please check required fields.',
      fields,
    };
  }

  // Mutations we want to enforce on server side can be done by the caller
  return { ok: true };
}


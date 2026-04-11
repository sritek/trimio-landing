/**
 * Enterprise-grade locale-based currency detection.
 * 
 * Detection priority:
 * 1. Timezone (most reliable — reflects physical location)
 * 2. Browser locale region code (fallback)
 * 3. Default to INR (primary market)
 * 
 * Base prices are always stored in INR.
 */

export interface CurrencyConfig {
  code: string;
  symbol: string;
  rate: number;
}

const CURRENCIES: Record<string, CurrencyConfig> = {
  INR: { code: "INR", symbol: "₹", rate: 1 },
  USD: { code: "USD", symbol: "$", rate: 0.012 },
  EUR: { code: "EUR", symbol: "€", rate: 0.011 },
  GBP: { code: "GBP", symbol: "£", rate: 0.0095 },
  CAD: { code: "CAD", symbol: "CA$", rate: 0.016 },
  AUD: { code: "AUD", symbol: "A$", rate: 0.018 },
  AED: { code: "AED", symbol: "AED ", rate: 0.044 },
  SGD: { code: "SGD", symbol: "S$", rate: 0.016 },
  JPY: { code: "JPY", symbol: "¥", rate: 1.78 },
};

const DEFAULT_CURRENCY = CURRENCIES.INR;

/**
 * Maps IANA timezone substrings to currency codes.
 * Checked via tz.includes(key) — order matters for overlapping matches.
 */
const TZ_TO_CURRENCY: [string, string][] = [
  // India — check first since this is the primary market
  ["Calcutta", "INR"],
  ["Kolkata", "INR"],
  ["Chennai", "INR"],
  ["Mumbai", "INR"],
  // Middle East
  ["Dubai", "AED"],
  ["Riyadh", "AED"],
  ["Qatar", "AED"],
  ["Bahrain", "AED"],
  ["Muscat", "AED"],
  ["Kuwait", "AED"],
  // Asia Pacific
  ["Singapore", "SGD"],
  ["Tokyo", "JPY"],
  ["Osaka", "JPY"],
  // UK specifically (before broader Europe check)
  ["London", "GBP"],
  // Canada specifically (before broader America check)
  ["Toronto", "CAD"],
  ["Vancouver", "CAD"],
  ["Montreal", "CAD"],
  ["Edmonton", "CAD"],
  ["Winnipeg", "CAD"],
];

/**
 * Broader timezone prefix checks (checked after specific city matches)
 */
const TZ_PREFIX_TO_CURRENCY: [string, string][] = [
  ["Asia/Kolkata", "INR"],
  ["Asia/Calcutta", "INR"],
  ["Australia/", "AUD"],
  ["Europe/", "EUR"],
  ["America/", "USD"],
];

/**
 * Maps ISO region codes to currency codes.
 * Used as fallback when timezone detection fails.
 */
const REGION_TO_CURRENCY: Record<string, string> = {
  IN: "INR",
  US: "USD",
  GB: "GBP",
  CA: "CAD",
  AU: "AUD",
  AE: "AED",
  SG: "SGD",
  JP: "JPY",
  DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", NL: "EUR",
  BE: "EUR", AT: "EUR", PT: "EUR", IE: "EUR", FI: "EUR", GR: "EUR",
  SA: "AED", QA: "AED", KW: "AED", BH: "AED", OM: "AED",
};

function detectFromTimezone(): string | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!tz) return null;

    // Check specific city names first
    for (const [city, code] of TZ_TO_CURRENCY) {
      if (tz.includes(city)) return code;
    }

    // Check broader prefixes
    for (const [prefix, code] of TZ_PREFIX_TO_CURRENCY) {
      if (tz.startsWith(prefix)) return code;
    }
  } catch {}
  return null;
}

function detectFromLocale(): string | null {
  try {
    const locale = navigator.language;
    if (!locale) return null;

    // "en-IN" → "IN", "en-US" → "US"
    const parts = locale.split("-");
    if (parts.length >= 2) {
      const region = parts[parts.length - 1].toUpperCase();
      if (REGION_TO_CURRENCY[region]) return REGION_TO_CURRENCY[region];
    }
  } catch {}
  return null;
}

export function detectCurrency(): CurrencyConfig {
  if (typeof window === "undefined") return DEFAULT_CURRENCY;

  // 1. Timezone first — most reliable for physical location
  const fromTz = detectFromTimezone();
  if (fromTz && CURRENCIES[fromTz]) return CURRENCIES[fromTz];

  // 2. Browser locale region as fallback
  const fromLocale = detectFromLocale();
  if (fromLocale && CURRENCIES[fromLocale]) return CURRENCIES[fromLocale];

  // 3. Default
  return DEFAULT_CURRENCY;
}

export function convertPrice(inrPrice: number, currency: CurrencyConfig): number {
  if (currency.code === "INR") return inrPrice;
  return Math.round(inrPrice * currency.rate);
}

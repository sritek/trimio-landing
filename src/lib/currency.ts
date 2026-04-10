/**
 * Locale-based currency detection and conversion.
 * Base prices are in INR. Converted at approximate fixed rates.
 */

interface CurrencyConfig {
  code: string;
  symbol: string;
  rate: number; // 1 INR = rate in target currency
}

const currencyMap: Record<string, CurrencyConfig> = {
  USD: { code: "USD", symbol: "$", rate: 0.012 },
  EUR: { code: "EUR", symbol: "€", rate: 0.011 },
  GBP: { code: "GBP", symbol: "£", rate: 0.0095 },
  CAD: { code: "CAD", symbol: "CA$", rate: 0.016 },
  AUD: { code: "AUD", symbol: "A$", rate: 0.018 },
  AED: { code: "AED", symbol: "AED", rate: 0.044 },
  SGD: { code: "SGD", symbol: "S$", rate: 0.016 },
  JPY: { code: "JPY", symbol: "¥", rate: 1.78 },
  INR: { code: "INR", symbol: "₹", rate: 1 },
};

// Map locale/region to currency
const regionToCurrency: Record<string, string> = {
  US: "USD", GB: "GBP", CA: "CAD", AU: "AUD",
  DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", NL: "EUR", BE: "EUR", AT: "EUR", PT: "EUR", IE: "EUR", FI: "EUR", GR: "EUR",
  AE: "AED", SA: "AED", QA: "AED", KW: "AED", BH: "AED", OM: "AED",
  SG: "SGD", JP: "JPY", IN: "INR",
};

export function detectCurrency(): CurrencyConfig {
  if (typeof navigator === "undefined") return currencyMap.INR;

  const locale = navigator.language || "en-IN";
  // Extract region: "en-US" → "US", "en" → try timezone
  let region = locale.split("-")[1]?.toUpperCase();

  if (!region) {
    // Fallback: guess from timezone
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz.startsWith("America/")) region = "US";
      else if (tz.startsWith("Europe/London")) region = "GB";
      else if (tz.startsWith("Europe/")) region = "DE"; // EUR
      else if (tz.startsWith("Asia/Kolkata") || tz.startsWith("Asia/Calcutta")) region = "IN";
      else if (tz.startsWith("Asia/Dubai")) region = "AE";
      else if (tz.startsWith("Asia/Singapore")) region = "SG";
      else if (tz.startsWith("Asia/Tokyo")) region = "JP";
      else if (tz.startsWith("Australia/")) region = "AU";
    } catch {}
  }

  const currencyCode = regionToCurrency[region || "IN"] || "USD";
  return currencyMap[currencyCode] || currencyMap.INR;
}

export function convertPrice(inrPrice: number, currency: CurrencyConfig): number {
  if (currency.code === "INR") return inrPrice;
  return Math.round(inrPrice * currency.rate);
}

export function formatPrice(inrPrice: number, currency: CurrencyConfig): string {
  const converted = convertPrice(inrPrice, currency);
  return `${currency.symbol}${converted.toLocaleString()}`;
}

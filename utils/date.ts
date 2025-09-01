import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

// Strict date checker
export function isDateString(value: string): boolean {
  if (!value || typeof value !== "string") return false;

  const formats = [
    "YYYY-MM-DD",
    "DD/MM/YYYY",
    "MM/DD/YYYY",
    "DD MMM YYYY",
    "MMM DD, YYYY",
    "D MMM YYYY",
    "MMMM DD, YYYY",
  ];

  value = value.trim();

  return formats.some((fmt) => dayjs(value, fmt, true).isValid());
}

// Optional: convert date string to relative time
export function fromNow(date: string | Date): string {
  return dayjs(date).fromNow();
}

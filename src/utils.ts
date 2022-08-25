import { secondsToTime } from "./dates/secondsToTime";

const capitaliseOne = (word: string) => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

export const capitalise = (value: string) => {
  if (typeof value !== "string") return value;

  const _value = value;
  if (!_value.trim()) return value;

  let _capitalised = "";

  value.split(" ").forEach((word, index) => {
    if (index !== 0) _capitalised += " ";
    _capitalised += capitaliseOne(word);
  });

  return _capitalised;
};

export function isEqual(a: any, b: any) {
  const typeOf_a = typeof a;
  const typeOf_b = typeof b;

  if (typeOf_a !== typeOf_b) return false;

  if (typeOf_a === "undefined") return true;

  let ref_a = a;
  let ref_b = b;

  if (!["bigint", "boolean", "number", "string", "symbol"].includes(typeOf_a)) {
    ref_a = JSON.stringify(ref_a);
    ref_b = JSON.stringify(ref_b);
  }

  return ref_a == ref_b;
}

export function setPadStart(str: string | number = "", num = 2, symbol = "0") {
  return String(str).padStart(num, symbol);
}

export function prettyTime(ms: number) {
  const { days, hours, minutes } = secondsToTime(ms);

  let result = "";

  if (days) result = `${setPadStart(days)}j`;
  if (hours) result = `${result} ${setPadStart(hours)}h`;
  if (minutes) result = `${result} ${setPadStart(minutes)}m`;

  return result.trim() || "00m";
}

export const useIf = (
  alternate: any,
  v: any,
  determinant?: (v: any) => boolean
) => {
  if (!determinant) return v ? v : alternate;

  return determinant(v) ? alternate : v;
};

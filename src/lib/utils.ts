export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(value: number) {
  return Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(value);
}

export function formatKcal(value: number) {
  return `${Math.round(value)} kcal`;
}

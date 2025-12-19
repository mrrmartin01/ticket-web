export const getSymbol = (code: string) =>
  new Intl.NumberFormat("en", { style: "currency", currency: code })
    .formatToParts(1)
    .find((part) => part.type === "currency")?.value ?? code;

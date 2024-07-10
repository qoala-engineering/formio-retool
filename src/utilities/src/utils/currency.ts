export const currencyFormatter = <T extends number | string>(
  amount: T,
  currency = "INR",
  fallback = "",
  minimumFractionDigits = 0
) => {
  if ((amount !== 0 && !amount) || isNaN(parseFloat(String(amount)))) {
    return fallback;
  }

  if (Intl) {
    return new Intl.NumberFormat("en-IN", {
      currency,
      maximumFractionDigits: 2,
      minimumFractionDigits,
      style: "currency",
    })
      .format(typeof amount === "number" ? amount : parseInt(amount))
      .replace(/\s/g, "");
  } else {
    return amount;
  }
};

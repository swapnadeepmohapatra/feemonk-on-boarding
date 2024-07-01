export function formatToIndianRupees(number: number): string {
  let numStr = number.toString();
  let [intPart, decimalPart] = numStr.split(".");

  intPart = intPart.split("").reverse().join("");

  let formattedIntPart = "";
  for (let i = 0; i < intPart.length; i++) {
    if (i > 2 && (i - 2) % 2 === 0) {
      formattedIntPart += ",";
    }
    formattedIntPart += intPart[i];
  }

  formattedIntPart = formattedIntPart.split("").reverse().join("");

  return decimalPart ? `${formattedIntPart}.${decimalPart}` : formattedIntPart;
}

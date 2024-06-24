export function getNextFifthDate() {
  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();

  if (day >= 5) {
    month += 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
  }

  let fifthDate = new Date(year, month, 5);

  day = fifthDate.getDate();
  month = fifthDate.getMonth() + 1;
  year = fifthDate.getFullYear();

  let dayStr = day < 10 ? "0" + day : day.toString();
  let monthStr = month < 10 ? "0" + month : month.toString();

  return `${dayStr}/${monthStr}/${year}`;
}

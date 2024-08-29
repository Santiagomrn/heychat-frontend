export default function formatUTCTo12Hour(utcString) {
  const date = new Date(utcString);

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const isPM = hours >= 12;
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutesFormatted} ${isPM ? "PM" : "AM"}`;
}

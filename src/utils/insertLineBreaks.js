export default function insertLineBreaks(str, interval) {
  return str.replace(new RegExp(`(.{${interval}})`, "g"), "$1\n");
}

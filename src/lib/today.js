const date = new Date();
const year = date.getFullYear();
let month = date.getMonth();
let day = date.getDay();
if (day < 10) {
  day = `0` + day;
}
if (month < 10) {
  month = `0` + month;
}
export const today = `${year}-${month}-${day}`;

export default function getHoursMinutes(duration: number) {
  let minutes: number;
  let hours: number;
  minutes = duration % 60;
  hours = Math.floor(duration / 60);

  if (hours === 0) {
    return minutes + "min";
  } else if (minutes === 0) {
    return hours + "h";
  }
  return hours + "h " + minutes + "min";
}

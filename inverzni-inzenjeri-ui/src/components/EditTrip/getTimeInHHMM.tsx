export default function getTimeInHHMM(duration: number) {
  let minutes: number;
  let hours: number;
  minutes = duration % 60;
  hours = Math.floor(duration / 60);

  return hours + ":" + minutes;
}

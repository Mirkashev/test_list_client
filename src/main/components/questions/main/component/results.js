export default function Results({ score, isActive }) {
  return isActive ? <div>${score}</div> : <></>;
}

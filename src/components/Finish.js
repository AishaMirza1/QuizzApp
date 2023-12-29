export default function Finish({ points, maxPossiblePoints }) {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <p className="result">
      You scored <strong>{points}</strong> marks ({Math.ceil(percentage)}%)
    </p>
  );
}

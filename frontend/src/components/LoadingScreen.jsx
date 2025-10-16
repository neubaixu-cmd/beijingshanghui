export default function LoadingScreen({ message }) {
  return (
    <div className="loading-screen">
      <div className="spinner" aria-hidden="true"></div>
      <p>{message}</p>
    </div>
  );
}

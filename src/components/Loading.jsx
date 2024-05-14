const Loading = () => {
  return (
    <div className="loading absolute inset-0 z-20 bg-black bg-opacity-90" aria-live="assertive">
      <div className="sr-only">Loading</div>
    </div>
  );
};

export default Loading;

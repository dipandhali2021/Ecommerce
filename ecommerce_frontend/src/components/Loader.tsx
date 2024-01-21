const Loader = () => {
  return (
    <div className="container not-found">
      <img src="../src/assets/Rolling-1s-200px.svg" />
      <h1>Loading...</h1>
    </div>
  );
};

export default Loader;

interface SkeletonProps {
  width?: string;
  length?: number;
}

export const Skeleton = ({ width = "unset", length = 3 }: SkeletonProps) => {
  const skeleton = Array.from({ length }, (_, idx) => (
    <div key={idx} className="skeleton-shape"></div>
  ));
  return (
    <div className="skeleton-loader" style={{ width }}>
      {skeleton}
    </div>
  );
};

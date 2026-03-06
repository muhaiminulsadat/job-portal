const ShimmerBox = ({className = ""}) => (
  <div
    className={`relative overflow-hidden rounded-lg bg-white/[0.04] before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/[0.06] before:to-transparent ${className}`}
  />
);

const Loading = () => {
  return (
    <div className="min-h-screen px-4 py-16">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* ── Header shimmer ── */}
        <div className="flex flex-col items-center gap-3">
          <ShimmerBox className="h-6 w-36 rounded-full" />
          <ShimmerBox className="h-12 w-72 sm:w-96" />
          <ShimmerBox className="h-4 w-48 sm:w-64" />
        </div>

        {/* ── Search bar shimmer ── */}
        <div className="flex gap-2">
          <ShimmerBox className="h-10 flex-1" />
          <ShimmerBox className="h-10 w-24" />
        </div>

        {/* ── Filter selects shimmer ── */}
        <div className="flex gap-3">
          <ShimmerBox className="h-10 w-48" />
          <ShimmerBox className="h-10 w-48" />
        </div>

        {/* ── Job cards grid shimmer ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({length: 6}).map((_, i) => (
            <div
              key={i}
              className="border border-white/8 rounded-xl p-5 flex flex-col gap-4"
            >
              {/* company row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShimmerBox className="w-8 h-8 rounded-lg" />
                  <ShimmerBox className="h-3 w-20" />
                </div>
                <ShimmerBox className="w-6 h-6 rounded-md" />
              </div>

              {/* title */}
              <ShimmerBox className="h-5 w-3/4" />

              {/* location + badge */}
              <div className="flex gap-2">
                <ShimmerBox className="h-3 w-24" />
                <ShimmerBox className="h-5 w-14 rounded-md" />
              </div>

              {/* description */}
              <div className="flex flex-col gap-2">
                <ShimmerBox className="h-3 w-full" />
                <ShimmerBox className="h-3 w-5/6" />
              </div>

              {/* divider */}
              <div className="h-px bg-white/6" />

              {/* button */}
              <ShimmerBox className="h-8 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;

function CommentsLoading() {
  return (
    <section
      className="flex-center"
      role="alert"
      aria-label="loading"
      aria-busy={true}
    >
      <div className="p-4 sm:px-0 max-w-[420px] w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PostsLoading() {
  return (
    <section
      className="flex-center"
      role="alert"
      aria-label="loading"
      aria-busy={true}
    >
      <div className="p-4 sm:px-0 max-w-[420px] w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          {/* <div className="rounded-full bg-slate-200 h-10 w-10"></div> */}
          <div className="flex flex-col w-full">
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const PulseLoading = {
  Comments: CommentsLoading,
  Posts: PostsLoading,
};

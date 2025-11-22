type BookingSkeletonProps = {
  variant: 'manage' | 'my'
}

function BookingSkeleton({ variant }: BookingSkeletonProps) {
  const isManageVariant = variant === 'manage'

  return (
    <div className="flex flex-col justify-center text-gray-100 lg:grid lg:grid-cols-2 lg:px-28">
      <div className="flex justify-center">
        <div className="h-40 w-60 animate-pulse rounded-2xl bg-primary-light-formButtons/60 md:h-48 md:w-72 lg:h-52 lg:w-80"></div>
      </div>
      <div className="max-w-md max-lg:mt-4">
        <div className="px-6">
          <div className="mb-2 h-6 w-3/4 animate-pulse rounded-2xl bg-primary-light-formButtons/70"></div>
          <div className="h-4 w-1/2 animate-pulse rounded-2xl bg-primary-light-formButtons/70"></div>
        </div>
        <div className="flex justify-between px-6 py-5">
          <div>
            <div className="mb-2 h-3 w-8 animate-pulse rounded-2xl bg-primary-light-formButtons/70"></div>
            <div className="mb-1 h-4 w-20 animate-pulse rounded-2xl bg-primary-light-formButtons/70"></div>
            <div className="h-4 w-16 animate-pulse rounded-2xl bg-primary-light-formButtons/70"></div>
          </div>
          <div>
            <div className="mb-2 h-3 w-6 animate-pulse rounded-2xl bg-primary-light-formButtons/70"></div>
            <div className="mb-1 h-4 w-20 animate-pulse rounded-2xl bg-primary-light-formButtons/70"></div>
            <div className="h-4 w-16 animate-pulse rounded-2xl bg-primary-light-formButtons/70"></div>
          </div>
        </div>
        <div className="px-6">
          {isManageVariant ? (
            <div className="flex flex-col items-center gap-2 py-5">
              <div className="h-10 w-full animate-pulse rounded-2xl bg-primary-light-formButtons/70"></div>
              <div className="h-10 w-full animate-pulse rounded-2xl bg-primary-light-formButtons/70"></div>
            </div>
          ) : (
            <div className="h-10 w-full animate-pulse rounded-2xl bg-primary-light-formButtons/70"></div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingSkeleton

import React from 'react'

interface CarSkeletonProps {
  variant?: 'home' | 'default'
  count?: number
}

const CarSkeleton: React.FC<CarSkeletonProps> = ({ variant = 'default', count = 3 }) => {
  if (variant === 'home') {
    return (
      <div className="flex gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="w-80 shrink-0 animate-pulse rounded-2xl bg-primary-dark p-6">
            <div className="mb-4 flex items-center justify-center">
              <div className="h-32 w-48 rounded-3xl bg-primary-light-hover"></div>
            </div>
            <div className="mb-4 h-8 rounded-3xl bg-primary-light-hover"></div>
            <div className="h-4 w-24 rounded-3xl bg-primary-light-hover"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="min-h-60 shadow-card flex w-full animate-pulse flex-col self-center rounded-2xl bg-primary-light px-8 py-4"
        >
          <div className="grid grid-cols-2 gap-20">
            <div className="my-1 flex w-52 items-center justify-center pr-4">
              <div className="h-32 w-48 rounded bg-primary-light-hover"></div>
            </div>
            <div className="min-h-52 flex flex-col justify-around gap-4">
              <div className="flex flex-col gap-4">
                <div className="h-6 w-3/4 rounded bg-primary-light-hover"></div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="size-7 rounded bg-primary-light-hover"></div>
                    <div className="h-4 w-24 rounded bg-primary-light-hover"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="size-7 rounded bg-primary-light-hover"></div>
                    <div className="h-4 w-32 rounded bg-primary-light-hover"></div>
                  </div>
                </div>
              </div>
              <div className="h-4 w-20 rounded bg-primary-light-hover"></div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="mx-auto h-10 w-56 rounded-full bg-primary-light-hover"></div>
          </div>
        </div>
      ))}
    </>
  )
}

export default CarSkeleton

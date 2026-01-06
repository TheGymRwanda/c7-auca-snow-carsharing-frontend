import { useParams, useNavigate } from 'react-router-dom'
import { useCars, useCarTypes, useUser } from '../../hooks/index'
import Details from '../../components/cars/Details'
import PageTitle from '../../components/PageTitle'
import Patterns from '../../components/ui/Patterns'

const CarDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [{ data: cars, loading: carsLoading, error: carsError }] = useCars()
  const [{ data: carTypes, loading: typesLoading }] = useCarTypes()

  const car = cars?.find(c => c.id === Number(id))
  const carType = carTypes?.find(type => type.id === car?.carTypeId)

  const [{ data: owner, loading: ownerLoading }] = useUser(car?.ownerId || 0)

  if (carsLoading || typesLoading) {
    return (
      <div className="mt-10 flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 size-12 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
          <p className="text-lg text-white">Loading ...</p>
        </div>
      </div>
    )
  }

  if (carsError || !car) {
    return (
      <div className="mt-10 flex min-h-screen items-center justify-center">
        <div className="text-center text-red-400">
          <h3 className="mb-2 text-xl font-semibold">Car not found</h3>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 rounded-lg bg-white px-6 py-2 text-[#2C5F77] transition hover:bg-gray-100"
          >
            Back to Cars List
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className=" relative min-h-screen space-y-4 overflow-hidden text-[#F9FAFB]  max-lg:mx-auto max-lg:max-w-md ">
      <Patterns />
      <PageTitle title="Details" />
      <Details car={car} carType={carType} owner={owner} ownerLoading={ownerLoading} />
    </div>
  )
}

export default CarDetails

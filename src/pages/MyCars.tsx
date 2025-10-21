import { useAuth } from '../util/AuthContext'
import useCars from '../hooks/useCars'
import MyCarCard from '../components/ui/MyCarCard'
import ButtonComponent from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { ChevronBackIcon } from '../assets'
import { useCarTypes } from '../hooks'

function MyCars() {
  const { user } = useAuth()
  const [{ data: cars, loading, error }] = useCars()
  const [{ data: carTypes }] = useCarTypes()
  const getCarType = (carTypeId: number) => carTypes?.find(type => type.id === carTypeId)
  const navigate = useNavigate()
  console.log('Cars:', cars)
  console.log('user:', user)

  if (error) {
    return (
      <div className="mt-10 flex min-h-screen items-center justify-center">
        <div className="text-center text-red-400">
          <h3 className="mb-2 text-xl font-semibold">Car not found</h3>
          <ButtonComponent text="Back to Home" isPrimary={true} onClick={() => navigate('/home')} />
        </div>
      </div>
    )
  }

  //const myCars = cars?.filter(car => car.ownerId === user?.id) || []

  const handleDeleteCar = (carId: number) => {
    alert(`Deleting car Comming soon: ${cars?.find(car => car.id === carId)?.name} (${carId})}`)
  }

  return (
    <>
      <div className="min-h-screen relative bg-primary pt-24">
        {loading ? (
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
              <p className="text-lg text-white">Loading ...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="container mx-auto px-4">
              <div className="mx-2 flex content-center text-center">
                <button
                  onClick={() => navigate('/')}
                  className="cursor-pointer transition hover:opacity-80"
                >
                  <ChevronBackIcon className="text-accent w-5 h-5" />
                </button>
                <div className="w-full text-center">
                  <h1 className="font-lora text-3xl uppercase text-gray-200">My Cars</h1>
                </div>
              </div>
              <div className="space-y-6 mb-6">
                {cars.length === 0 && (
                  <p className="text-gray-200 mt-9 text-center">{"You don't have any cars yet."}</p>
                )}
                {cars?.map(car => {
                  const carType = getCarType(car.carTypeId)
                  return (
                    <MyCarCard
                      key={car.id}
                      index={car.id}
                      title={car.name}
                      image={carType?.imageUrl || ''}
                      owner={user?.name || ''}
                      location={carType?.name || 'No plate'}
                      onDelete={() => handleDeleteCar(car.id)}
                    />
                  )
                })}
              </div>
            </div>
            <div className="sticky bottom-0 bg-primary p-4 pb-6 ">
              <ButtonComponent text="Add new Car" loadingText="Adding ..." isPrimary={true} />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default MyCars

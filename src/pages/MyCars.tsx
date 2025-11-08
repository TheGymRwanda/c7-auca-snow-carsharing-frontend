import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import useCars from '../hooks/useCars'
import ButtonComponent from '../components/ui/Button'
import ConfirmModal from '../components/ui/ConfirmModal'
import { Link } from 'react-router-dom'
import { useCarTypes } from '../hooks'
import LoaderComponent from '../components/ui/Loader'
import ErrorComponent from '../components/ui/ErrorComponent'
import CarCard from '../components/cars/CarCard'
import { useCarDelete } from '../hooks/useCarDelete'
import PageTitle from '../components/PageTitle'

function MyCars() {
  const { user } = useAuth()
  const [{ data: cars, loading, error }, refetch] = useCars()
  const [{ data: carTypes }] = useCarTypes()
  const navigate = useNavigate()
  const {
    deletingCar,
    showDeleteModal,
    carToDelete,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
  } = useCarDelete(async () => {
    await refetch()
  })

  const getCarType = (carTypeId: number) => carTypes?.find(type => type.id === carTypeId)
  const myCars = cars?.filter(car => car.ownerId === user?.id) || []

  useEffect(() => {
    refetch()
  }, [])

  if (error) {
    return <ErrorComponent message="Car not found" />
  }

  return (
    <>
      <div className="relative min-h-screen bg-primary pt-24">
        {loading ? (
          <LoaderComponent />
        ) : (
          <>
            <div className="container mx-auto px-4">
              <PageTitle title="My cars" />
              <div className="mb-6 space-y-6">
                {myCars?.length === 0 && (
                  <p className="mt-9 text-center text-gray-200">{"You don't have any cars yet."}</p>
                )}
                {myCars?.map(car => (
                  <CarCard
                    key={car.id}
                    car={car}
                    carType={getCarType(car.carTypeId)}
                    buttonText="Delete Car"
                    primaryButton={false}
                    buttonVariant="delete"
                    onButtonClick={() => handleDeleteClick(car.id)}
                  />
                ))}
              </div>
            </div>
            <div className="sticky bottom-0 bg-primary p-4 pb-6 ">
              <Link to="/add-new-car">
                <ButtonComponent text="Add new Car" loadingText="Adding ..." isPrimary={true} />
              </Link>
            </div>
          </>
        )}
        <ConfirmModal
          isOpen={showDeleteModal}
          title="Delete Car"
          message="Are you sure you want to delete this car? This action cannot be undone."
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          loading={deletingCar === carToDelete}
        />
      </div>
    </>
  )
}

export default MyCars

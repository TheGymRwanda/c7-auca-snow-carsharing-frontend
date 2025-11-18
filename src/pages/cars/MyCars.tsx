import { useAuth } from '../../context/AuthContext'
import { useEffect } from 'react'
import useCars from '../../hooks/useCars'
import Button from '../../components/ui/Button'
import ConfirmModal from '../../components/ui/ConfirmModal'
import { useNavigate } from 'react-router-dom'

import { useCarTypes } from '../../hooks'
import ErrorComponent from '../../components/ui/Error'
import CarCard from '../../components/cars/CarCard'
import { useCarDelete } from '../../hooks/useCarDelete'
import PageTitle from '../../components/PageTitle'
import CarSkeleton from '../../components/ui/CarSkeleton'

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
    <div className="relative min-h-screen bg-primary-dark pt-12 lg:pt-0">
      {loading ? (
        <>
          <PageTitle title="My Cars" />
          <div className="mb-6 grid px-4 pt-4 max-md:space-y-6 lg:grid-cols-2 lg:gap-8 lg:px-16 xl:grid-cols-3 xl:gap-6 3xl:grid-cols-4">
            <CarSkeleton count={6} />
          </div>
        </>
      ) : (
        <div className="relative">
          <PageTitle title="My cars" />
          <div className="absolute right-8 top-14 z-50 hidden w-36 lg:block">
            <Button
              text="+ New Car"
              isPrimary
              className="py-3 text-base transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
              onClick={() => navigate('/add-new-car')}
            />
          </div>
          <div className="mx-auto px-4 max-md:mb-24">
            {myCars?.length === 0 && (
              <p className="mt-9 text-center text-gray-200">{"You don't have any cars yet."}</p>
            )}
            <div className="mb-6 grid max-md:space-y-6 lg:grid-cols-2 lg:gap-8 lg:px-16 xl:grid-cols-3 xl:gap-6 3xl:grid-cols-4">
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
          <div className="fixed inset-x-0 bottom-0 z-50 mx-auto bg-primary-dark p-4 pb-6 max-lg:max-w-md lg:hidden">
            <Button
              text="Add New Car"
              loadingText="Adding ..."
              isPrimary
              className="py-3"
              onClick={() => navigate('/add-new-car')}
            />
          </div>
        </div>
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
  )
}

export default MyCars

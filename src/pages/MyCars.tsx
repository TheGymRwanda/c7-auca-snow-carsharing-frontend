import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { apiUrl } from '../util/apiUrl'
import useCars from '../hooks/useCars'
import ButtonComponent from '../components/ui/Button'
import ConfirmModal from '../components/ui/ConfirmModal'
import { useNavigate, Link } from 'react-router-dom'
import { ChevronBackIcon } from '../assets'
import { useCarTypes } from '../hooks'
import { getAuthToken } from '../util/auth'
import LoaderComponent from '../components/ui/Loader'
import ErrorComponent from '../components/ui/ErrorComponent'
import CarCard from '../components/cars/CarCard'

// eslint-disable-next-line max-lines-per-function
function MyCars() {
  const { user } = useAuth()
  const [deletingCar, setDeletingCar] = useState<number | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [carToDelete, setCarToDelete] = useState<number | null>(null)
  const [{ data: cars, loading, error }, refetch] = useCars()
  const [{ data: carTypes }] = useCarTypes()
  const getCarType = (carTypeId: number) => carTypes?.find(type => type.id === carTypeId)
  const navigate = useNavigate()

  if (error) {
    return <ErrorComponent message="Car not found" />
  }

  useEffect(() => {
    const fetchData = async () => {
      await refetch()
    }
    fetchData()
  }, [])
  const myCars = cars?.filter(car => car.ownerId === user?.id) || []
  const handleDeleteClick = (carId: number) => {
    setCarToDelete(carId)
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = async () => {
    if (!carToDelete) return
    setDeletingCar(carToDelete)
    try {
      const res = await axios.delete(`${apiUrl}/cars/${carToDelete}`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      })
      if (res.status !== 200) {
        return new Error('Failed to delete the car')
      }
    } catch (error) {
      console.error('Error from deleting: ', error)
    } finally {
      await refetch()
      setDeletingCar(null)
      setShowDeleteModal(false)
      setCarToDelete(null)
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false)
    setCarToDelete(null)
  }

  return (
    <>
      <div className="relative min-h-screen bg-primary pt-24">
        {loading ? (
          <LoaderComponent />
        ) : (
          <>
            <div className="container mx-auto px-4">
              <div className="mx-2 flex content-center text-center">
                <button
                  onClick={() => navigate(-1)}
                  className="cursor-pointer transition hover:opacity-80"
                >
                  <ChevronBackIcon className="h-5 w-5 text-accent" />
                </button>
                <div className="w-full text-center">
                  <h1 className="font-lora text-3xl uppercase text-gray-200">My Cars</h1>
                </div>
              </div>
              <div className="mb-6 space-y-6">
                {myCars?.length === 0 && (
                  <p className="mt-9 text-center text-gray-200">{"You don't have any cars yet."}</p>
                )}
                {myCars?.map(car => {
                  const carType = getCarType(car.carTypeId)
                  return (
                    <CarCard
                      key={car.id}
                      car={car}
                      carType={carType}
                      buttonText="Delete Car"
                      primaryButton={false}
                      buttonVariant="delete"
                      onButtonClick={() => handleDeleteClick(car.id)}
                    />
                  )
                })}
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

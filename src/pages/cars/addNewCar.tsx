import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { apiUrl } from '../../util/apiUrl'
import { getAuthToken } from '../../util/auth'
import { useCarTypes } from '../../hooks'
import AddNewCarForm from '../../components/forms/AddNewCar'
import Patterns from '../../components/ui/Patterns'
import { toast, ToastContainer } from 'react-toastify'

const AddNewCar = () => {
  const [carTypeId, setCarTypeId] = useState(0)
  const [name, setName] = useState('')
  const [fuelType, setFuelType] = useState('')
  const [horsepower, setHorsePower] = useState(0)
  const [licensePlate, setLicensePlate] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const [{ data: carTypes }] = useCarTypes()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(
        `${apiUrl}/cars`,
        {
          carTypeId,
          name,
          fuelType,
          horsepower,
          licensePlate,
          info,
        },
        {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        },
      )
      navigate('/my-cars')
    } catch (err) {
      console.error('Error creating car:', err)
      toast.error('Failed to add the Car')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="relative flex flex-col items-center justify-center max-lg:mt-24 lg:h-screen lg:overflow-hidden">
      <Patterns />
      <div className="px-6 text-white">
        <h1 className="text-center font-lora text-3xl">NEW CAR</h1>
        <AddNewCarForm
          handleSubmit={handleSubmit}
          setCarTypeId={setCarTypeId}
          setName={setName}
          carTypes={carTypes}
          setLicensePlate={setLicensePlate}
          setFuelType={setFuelType}
          setHorsePower={setHorsePower}
          setInfo={setInfo}
          loading={loading}
        />
      </div>
      <ToastContainer />
    </div>
  )
}

export default AddNewCar

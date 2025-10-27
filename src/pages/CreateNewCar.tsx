import { useNavigate } from 'react-router-dom'
import ButtonComponent from '../components/ui/Button'
import { useState } from 'react'
import axios from 'axios'
import { apiUrl } from '../util/apiUrl'
import { getAuthToken } from '../util/auth'
import { useCarTypes } from '../hooks'

const CreateNewCar = () => {
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
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm font-lora text-white">
        <h1 className="text-center text-3xl mt-20">NEW CAR</h1>
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="e.g. My Nice Moni Car"
              className="rounded-full py-3 px-4 bg-primary-light-formButtons text-white placeholder-white/70 outline-none border-none"
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="type" className="text-sm mb-1">
              Type
            </label>
            <select
              id="type"
              className="rounded-full py-3 px-4 bg-primary-light-formButtons text-white outline-none border-none appearance-none"
              onChange={e => setCarTypeId(parseInt(e.target.value))}
            >
              <option value={'none'}>Moni Copper</option>
              {carTypes?.map(typ => (
                <option value={typ.id} key={typ.id}>
                  {typ.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col w-1/2">
              <label htmlFor="license-plate" className="text-sm mb-1">
                License Plate
              </label>
              <input
                type="text"
                id="license-plate"
                placeholder="e.g. M-XY 123"
                className="w-full bg-primary-light-formButtons text-white placeholder-white/70 rounded-full py-3 px-4 outline-none border-none"
                onChange={e => setLicensePlate(e.target.value)}
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label htmlFor="horse-power" className="text-sm mb-1">
                Horse Power
              </label>
              <input
                type="text"
                id="horse-power"
                placeholder="110"
                className="w-full bg-primary-light-formButtons text-white placeholder-white/70 rounded-full py-3 px-4 outline-none border-none"
                onChange={e => setHorsePower(parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="fuel-type" className="text-sm mb-1">
              Fuel type
            </label>
            <select
              id="fuel-type"
              className="rounded-full py-3 px-4 bg-primary-light-formButtons text-white outline-none border-none appearance-none"
              onChange={e => setFuelType(e.target.value)}
            >
              <option value={'none'}>e.g. 150</option>
              <option value={'petrol'}>Petrol</option>
              <option value={'diesel'}>Diesel</option>
              <option value={'electric'}>Electric</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="add-info" className="text-sm mb-1">
              Additional Information
            </label>
            <input
              type="text"
              id="add-info"
              placeholder="e.g. No smoking"
              className="rounded-full py-3 px-4 bg-primary-light-formButtons text-white placeholder-white/70 outline-none border-none"
              onChange={e => setInfo(e.target.value)}
            />
          </div>
          <div className="flex justify-between space-x-1 mt-4">
            <ButtonComponent
              text="Cancel"
              isPrimary={false}
              disabled={loading}
              onClick={() => navigate('/my-cars')}
            />
            <ButtonComponent
              text="Add Car"
              loadingText="Adding Car ..."
              loading={loading}
              isPrimary
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateNewCar

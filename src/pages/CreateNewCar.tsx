import { useNavigate } from 'react-router-dom'
import ButtonComponent from '../components/ui/Button'
import { useState } from 'react'
import axios from 'axios'
import { apiUrl } from '../util/apiUrl'
import { getAuthToken } from '../util/auth'
import { useAuth } from '../util/AuthContext'

const CreateNewCar = () => {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [horsePower, setHorsePower] = useState('')
  const [fuelType, setFuelType] = useState('')
  const [info, setInfo] = useState('')

  const navigate = useNavigate()
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('✅ Form submitted')

    try {
      const response = await axios.post(
        `${apiUrl}/add-new-car`,
        {
          name,
          carTypeId: parseInt(type),
          licensePlate,
          horsePower,
          fuelType,
          info,
          ownerId: user?.id,
        },
        {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        },
      )
      if (response.status === 201) {
        navigate('/my-cars')
      }
    } catch (err) {
      console.error('Error creating car:', err)
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
              onChange={e => setType(e.target.value)}
            >
              <option value="1">Moni Cooper</option>
              <option value="2">Toyota</option>
              <option value="3">Honda</option>
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
                onChange={e => setHorsePower(e.target.value)}
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
              <option>e.g. 150</option>
              <option>Petrol</option>
              <option>Diesel</option>
              <option>Electric</option>
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
            <ButtonComponent text="Cancel" isPrimary={false} onClick={() => navigate('/my-cars')} />
            <ButtonComponent text="Add Car" isPrimary type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateNewCar

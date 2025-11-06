/* eslint-disable max-lines-per-function */
import { SetStateAction } from 'react'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'
import { CarTypeDto } from '../../util/api'

interface AddNewCarPropType {
  handleSubmit: (e: React.FormEvent) => void
  setName: React.Dispatch<SetStateAction<string>>
  setCarTypeId: React.Dispatch<SetStateAction<number>>
  carTypes: CarTypeDto[] | undefined
  setLicensePlate: React.Dispatch<SetStateAction<string>>
  setFuelType: React.Dispatch<SetStateAction<string>>
  setHorsePower: React.Dispatch<SetStateAction<number>>
  setInfo: React.Dispatch<SetStateAction<string>>
  loading: boolean
}

function AddNewCarForm({
  handleSubmit,
  setName,
  setCarTypeId,
  carTypes,
  setLicensePlate,
  setFuelType,
  setHorsePower,
  setInfo,
  loading,
}: AddNewCarPropType) {
  const navigate = useNavigate()
  return (
    <form className="mt-2 flex flex-col space-y-14" onSubmit={handleSubmit}>
      <div className="space-y-3">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-sm">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="e.g. My Nice Moni Car"
            className="rounded-full border-none bg-primary-light-formButtons p-4 text-white outline-none placeholder:text-white/70"
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="type" className="mb-1 text-sm">
            Type
          </label>
          <select
            id="type"
            className="appearance-none rounded-full border-none bg-primary-light-formButtons p-4 text-white outline-none"
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
          <div className="flex w-1/2 flex-col">
            <label htmlFor="license-plate" className="mb-1 text-sm">
              License Plate
            </label>
            <input
              type="text"
              id="license-plate"
              placeholder="e.g. M-XY 123"
              className="w-full rounded-full border-none bg-primary-light-formButtons p-4 text-white outline-none placeholder:text-white/70"
              onChange={e => setLicensePlate(e.target.value)}
            />
          </div>

          <div className="flex w-1/2 flex-col">
            <label htmlFor="horse-power" className="mb-1 text-sm">
              Horse Power
            </label>
            <input
              type="text"
              id="horse-power"
              placeholder="110"
              className="w-full rounded-full border-none bg-primary-light-formButtons p-4 text-white outline-none placeholder:text-white/70"
              onChange={e => setHorsePower(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="fuel-type" className="mb-1 text-sm">
            Fuel type
          </label>
          <select
            id="fuel-type"
            className="appearance-none rounded-full border-none bg-primary-light-formButtons p-4 text-white outline-none"
            onChange={e => setFuelType(e.target.value)}
          >
            <option value={'none'}>e.g. 150</option>
            <option value={'petrol'}>Petrol</option>
            <option value={'diesel'}>Diesel</option>
            <option value={'electric'}>Electric</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="add-info" className="mb-1 text-sm">
            Additional Information
          </label>
          <input
            type="text"
            id="add-info"
            placeholder="e.g. No smoking"
            className="rounded-full border-none bg-primary-light-formButtons p-4 text-white outline-none placeholder:text-white/70"
            onChange={e => setInfo(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between space-x-1">
        <Button
          text="Cancel"
          isPrimary={false}
          disabled={loading}
          onClick={() => navigate('/my-cars')}
        />
        <Button
          text="Add Car"
          loadingText="Adding Car ..."
          loading={loading}
          isPrimary
          type="submit"
        />
      </div>
    </form>
  )
}

export default AddNewCarForm

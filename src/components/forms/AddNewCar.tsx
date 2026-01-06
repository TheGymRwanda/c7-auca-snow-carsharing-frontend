import { SetStateAction } from 'react'
import { Button, FormInput, FormSelect } from '../ui'
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
    <form className="mt-2 flex flex-col space-y-12" onSubmit={handleSubmit}>
      <div className="space-y-3">
        <FormInput label="Name" id="name" placeholder="e.g. My Nice Moni Car" onChange={setName} />

        <FormSelect
          label="Type"
          id="type"
          defaultOption="Moni Copper"
          options={carTypes?.map(typ => ({ value: typ.id, label: typ.name })) || []}
          onChange={value => setCarTypeId(parseInt(value))}
        />

        <div className="flex gap-6">
          <FormInput
            label="License Plate"
            id="license-plate"
            placeholder="e.g. M-XY 123"
            className="w-1/2"
            onChange={setLicensePlate}
          />
          <FormInput
            label="Horse Power"
            id="horse-power"
            placeholder="110"
            className="w-1/2"
            onChange={value => setHorsePower(parseInt(value))}
          />
        </div>

        <FormSelect
          label="Fuel type"
          id="fuel-type"
          defaultOption="e.g. 150"
          options={[
            { value: 'petrol', label: 'Petrol' },
            { value: 'diesel', label: 'Diesel' },
            { value: 'electric', label: 'Electric' },
          ]}
          onChange={setFuelType}
        />

        <FormInput
          label="Additional Information"
          id="add-info"
          placeholder="e.g. No smoking"
          onChange={setInfo}
        />
      </div>
      <div className="flex justify-between space-x-1">
        <Button
          text="Cancel"
          isPrimary={false}
          disabled={loading}
          className="py-3"
          onClick={() => navigate('/my-cars', { replace: true })}
        />
        <Button
          text="Add Car"
          loadingText="Adding Car ..."
          loading={loading}
          isPrimary
          className="py-3"
          type="submit"
        />
      </div>
    </form>
  )
}

export default AddNewCarForm

import { useState } from 'react'
import axios from 'axios'
import { apiUrl } from '../util/apiUrl'
import { getAuthToken } from '../util/auth'

export function useCarDelete(refetch: () => Promise<void>) {
  const [deletingCar, setDeletingCar] = useState<number | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [carToDelete, setCarToDelete] = useState<number | null>(null)

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

  return {
    deletingCar,
    showDeleteModal,
    carToDelete,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
  }
}

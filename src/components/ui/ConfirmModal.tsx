import ButtonComponent from './Button'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
}

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, loading }: ConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-primary-light rounded-lg p-6 max-w-sm mx-4">
        <h3 className="text-lg text-white font-semibold mb-2">{title}</h3>
        <p className="text-gray-200 mb-6">{message}</p>
        <div className="flex gap-3">
          <ButtonComponent
            text="Cancel"
            isPrimary={false}
            onClick={onCancel}
            disabled={loading}
            className="bg-primary-light"
          />
          <ButtonComponent
            text="Delete"
            isPrimary={true}
            loadingText="Deleting ..."
            loading={loading}
            variant="delete"
            onClick={onConfirm}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal

import Button from './Button'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  onClick: () => void
  loading?: boolean
}

function MessageModal({ isOpen, title, message, onClick, loading }: ConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 max-w-sm rounded-lg bg-primary-light p-6">
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className="mb-6 text-gray-200">{message}</p>
        <div className="flex gap-3">
          <Button
            text="OK"
            isPrimary={false}
            onClick={onClick}
            disabled={loading}
            className="bg-primary-light"
          />
        </div>
      </div>
    </div>
  )
}

export default MessageModal

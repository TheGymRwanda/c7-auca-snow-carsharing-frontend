import Button from './Button'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  onConfirm?: () => void
  onCancel?: () => void
  onClick?: () => void
  loading?: boolean
  text?: string
  variant?: 'default' | 'delete' | 'message'
}

function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  onClick,
  loading,
  text,
  variant = 'default',
}: ConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 max-w-sm rounded-lg bg-primary-light p-6">
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className="mb-6 text-gray-200">{message}</p>
        <div className="flex gap-3">
          {variant === 'message' ? (
            <Button
              text="OK"
              isPrimary={false}
              onClick={onClick}
              disabled={loading}
              className="bg-primary-light py-3"
            />
          ) : (
            <>
              <Button
                text="Cancel"
                isPrimary={false}
                onClick={onCancel}
                disabled={loading}
                className="bg-primary-light"
              />
              {variant === 'delete' && (
                <Button
                  text="Delete"
                  isPrimary={true}
                  loadingText="Deleting ..."
                  loading={loading}
                  variant="delete"
                  className="py-3"
                  onClick={onConfirm}
                  disabled={loading}
                />
              )}
              {variant === 'default' && (
                <Button
                  text={text}
                  isPrimary
                  loadingText={`${text}ing ...`}
                  loading={loading}
                  onClick={onConfirm}
                  className="py-3"
                  disabled={loading}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal

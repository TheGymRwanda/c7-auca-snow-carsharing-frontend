import { KeyIcon, ProfileIcon } from '../../assets'
import Button from '../ui/Button'

interface LoginFormProps {
  error: string
  loading: boolean
  handleSubmit: (e: React.FormEvent) => void
}

function LoginForm({ error, loading, handleSubmit }: LoginFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-14 xl:mx-10">
      <div className="space-y-3">
        <div className="relative">
          <ProfileIcon className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-white" />
          <input
            type="text"
            placeholder="Username / e-mail"
            name="username"
            className="w-full rounded-full border-none bg-white/20 py-3 pl-12 pr-4 text-white outline-none placeholder:text-white/70 lg:text-base"
            required
          />
        </div>

        <div className="relative">
          <KeyIcon className="absolute left-3 top-1/2 size-5 -translate-y-1/2 stroke-white" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="w-full rounded-full border-none bg-white/20 py-3 pl-12 pr-4 text-white outline-none placeholder:text-white/70 lg:text-base"
            required
          />
        </div>
      </div>

      {error && <p className="text-center text-sm text-red-200">{error}</p>}

      <Button
        text="Login"
        className="py-3 lg:text-base"
        isPrimary={true}
        loadingText="Logging In ..."
        loading={loading}
      />
    </form>
  )
}

export default LoginForm

function ButtonComponent({
  text,
  className,
  isPrimary,
}: {
  text: string
  className: string
  isPrimary: boolean
}) {
  return (
    <button
      className={`w-full rounded-full font-semibold ${className} 
      ${isPrimary ? 'bg-gray-100 text-[#265E78]' : 'border-2 bg-[#265E78] text-white '} py-3`}
    >
      {text}
    </button>
  )
}

export default ButtonComponent

import React, { createContext, useState } from 'react'

type SidebarContextType = {
  open: boolean
  setOpen: (v: boolean) => void
}

export const SidebarContext = createContext<SidebarContextType>({
  open: false,
  setOpen: () => {},
})

export const SidebarProvider: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
  const [open, setOpen] = useState(false)

  return <SidebarContext.Provider value={{ open, setOpen }}>{children}</SidebarContext.Provider>
}

export default SidebarProvider

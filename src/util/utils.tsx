function getOwnerName(owner: unknown, loading: boolean, error: unknown, ownerId: number): string {
  return loading
    ? 'Loading...'
    : error
      ? 'Unknown Owner'
      : (owner as { name?: string })?.name || `Owner ${ownerId}`
}

export default getOwnerName

export const buildQueryString = (params: Record<string, any>) => {
  const query = new URLSearchParams()
  for (const key in params) {
    // if (params[key] !== undefined && params[key] !== null) {
    if (params[key] !== undefined && params[key] !== null) {
      query.append(key, params[key].toString())
    }
  }
  return query.toString()
}
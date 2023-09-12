function trunc(value: number) {
  return value < 0 ? Math.ceil(value) : Math.floor(value)
}

export const rounding = {
  trunc,
}

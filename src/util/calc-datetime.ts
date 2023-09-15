const timeInSeconds = {
  day: 1 * 60 * 60 * 24, // 86400 seconds
  hour: 1 * 60 * 60, // 3600 seconds
  minute: 1 * 60, // 60 seconds
} as const

export function calcDateTime(totalSeconds: number) {
  let remainingSeconds = totalSeconds

  const daysAmount = remainingSeconds >= timeInSeconds['day'] ? Math.floor(remainingSeconds / timeInSeconds['day']) : 0
  const daysInSeconds = daysAmount * timeInSeconds['day']
  remainingSeconds -= daysInSeconds

  const hoursAmount =
    remainingSeconds >= timeInSeconds['hour'] ? Math.floor(remainingSeconds / timeInSeconds['hour']) : 0
  const hoursInSeconds = hoursAmount * timeInSeconds['hour']
  remainingSeconds -= hoursInSeconds

  const minutesAmount =
    remainingSeconds >= timeInSeconds['minute'] ? Math.floor(remainingSeconds / timeInSeconds['minute']) : 0
  const minutesInSeconds = minutesAmount * timeInSeconds['minute']
  remainingSeconds -= minutesInSeconds

  const secondsAmount = remainingSeconds

  const days = String(daysAmount).padStart(2, '0').concat('d')
  const hours = String(hoursAmount).padStart(2, '0').concat('h')
  const minutes = String(minutesAmount).padStart(2, '0').concat('m')
  const seconds = String(secondsAmount).padStart(2, '0').concat('s')

  return {
    days,
    hours,
    minutes,
    seconds,
  }
}

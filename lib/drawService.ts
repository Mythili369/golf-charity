export const generateDrawNumbers = () => {
  const numbers = new Set<number>()

  while (numbers.size < 5) {
    numbers.add(Math.floor(Math.random() * 45) + 1)
  }

  return Array.from(numbers)
}
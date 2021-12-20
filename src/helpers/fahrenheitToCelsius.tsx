const fahrenheitToCelsius = (temp: number) => {
  return Math.round((temp - 32) * 5 / 9);
}

export default fahrenheitToCelsius;
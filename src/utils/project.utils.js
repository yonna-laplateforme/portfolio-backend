export function sanitizeFeaturedValue(value) {
  return (value == 1 || value === 'true' || value === true) ? 1 : 0;
}
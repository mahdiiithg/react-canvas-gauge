/**
 * Returns a color based on speed position within a range
 * @param {number} speed - Current speed value
 * @param {number} minSpeed - Minimum speed value
 * @param {number} maxSpeed - Maximum speed value
 * @returns {string} Hex color code - green for low, yellow for mid, red for high
 */
export const getSpeedColor = (speed, minSpeed, maxSpeed) => {
  if (typeof speed !== 'number' || typeof minSpeed !== 'number' || typeof maxSpeed !== 'number') {
    return '#3C8CA3'; // Default color for invalid input
  }

  const third = (maxSpeed - minSpeed) / 3;
  
  if (speed < minSpeed + third) {
    return '#6ABE39'; // Green - low range
  }
  if (speed < minSpeed + 2 * third) {
    return '#E8D639'; // Yellow - mid range
  }
  return '#E84749'; // Red - high range
};

export default getSpeedColor;

import { SHOWROOM_LOCATIONS } from '@diamantaire/shared/constants';
import Cookies from 'js-cookie';

// Returns the distance between two lat/lng coordinates in miles
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // Radius of the Earth in miles
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in miles

  return distance;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export function calculateProximityToShowrooms(lat, lng) {
  return SHOWROOM_LOCATIONS.map((location) => {
    const distance = calculateDistance(lat, lng, location.coords[0], location.coords[1]);

    if (distance <= 70) {
      return {
        location,
      };
    }

    return null;
  });
}

export function isUserCloseToShowroom() {
  const geo = Cookies.get('geo') || {};

  const { latitude, longitude } = geo;

  console.log('geoxxx', geo);

  return calculateProximityToShowrooms(latitude, longitude);
}

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

    // Confirm that the user is within 70 miles of a showroom
    if (distance <= 70) {
      return {
        location,
      };
    }
  });
}

// This will return a showroom if the user is within 70 miles of one
export function isUserCloseToShowroom() {
  const geo = Cookies.get('geo') || {};

  let { latitude, longitude } = geo;

  // Dev fallback
  if (!latitude || !longitude) {
    // Brooklyn
    // latitude = 40.6505;
    // longitude = -73.94958;

    // Madrid
    latitude = 40.4607623;
    longitude = -3.6966508;
  }

  const results = calculateProximityToShowrooms(latitude, longitude);

  return results.filter((result) => result !== undefined)?.[0]?.location;
}

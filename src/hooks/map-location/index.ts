export function mapLocations(locations: any[]) {
  return locations.map((location) => ({
    ...location,
    location: {
      ...location.location,
      lat: location?.location?.latitude,
      lng: location?.location?.longitude,
    },
  }));
}

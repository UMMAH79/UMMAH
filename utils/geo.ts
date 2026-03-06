
export const calculateQiblaDirection = (lat: number, lon: number): number => {
  // Kaaba coordinates (WGS84)
  const KAABA_LAT = 21.422487;
  const KAABA_LON = 39.826206;

  // Convert to radians
  const φ1 = (lat * Math.PI) / 180;
  const φ2 = (KAABA_LAT * Math.PI) / 180;
  const λ1 = (lon * Math.PI) / 180;
  const λ2 = (KAABA_LON * Math.PI) / 180;

  const Δλ = λ2 - λ1;

  // Bearing formula (Spherical Law of Sines/Cosines)
  const y = Math.sin(Δλ);
  const x = Math.cos(φ1) * Math.tan(φ2) - Math.sin(φ1) * Math.cos(Δλ);
  
  let qibla = Math.atan2(y, x);
  
  // Convert back to degrees
  qibla = (qibla * 180) / Math.PI;

  // Normalize to 0-360
  return (qibla + 360) % 360;
};

export const calculateDistance = (lat1: number, lon1: number): number => {
  const KAABA_LAT = 21.422487;
  const KAABA_LON = 39.826206;
  const R = 6371; // Earth's mean radius in km

  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (KAABA_LAT * Math.PI) / 180;
  const Δφ = ((KAABA_LAT - lat1) * Math.PI) / 180;
  const Δλ = ((KAABA_LON - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
};

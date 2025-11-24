/**
 * IP Enrichment Service
 * Collects comprehensive data about visitors from their IP address
 * Uses free IP geolocation APIs (ip-api.com)
 */

interface IPInfo {
  // Network data
  query: string; // IP address
  isp: string;
  org: string;
  as: string; // ASN
  
  // Geolocation
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  
  // Additional
  currency: string;
  mobile: boolean;
  proxy: boolean;
  hosting: boolean; // datacenter IP
}

interface EnrichedIPData {
  // Network & Connection
  ipAddress: string;
  ipVersion: string;
  isp: string;
  organization: string;
  asn: string;
  isVpn: boolean;
  isProxy: boolean;
  isTor: boolean;
  isDatacenter: boolean;
  mobileCarrier: string | null;
  
  // Geolocation
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  city: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  timezone: string;
  utcOffset: string;
  continent: string;
  continentCode: string;
  currency: string;
  callingCode: string;
  capitalCity: string;
  distanceFromServer: number | null;
  localTime: string;
}

/**
 * Enriches IP address with geolocation and network data
 */
export async function enrichIPAddress(ipAddress: string): Promise<EnrichedIPData | null> {
  try {
    // Use ip-api.com (free, 45 requests/minute)
    const response = await fetch(
      `http://ip-api.com/json/${ipAddress}?fields=66846719`,
      {
        headers: {
          'User-Agent': 'TDSART-Fantasy-Analytics/1.0'
        }
      }
    );
    
    if (!response.ok) {
      console.error('[IP Enrichment] API request failed:', response.statusText);
      return null;
    }
    
    const data: IPInfo = await response.json();
    
    if (data.query === undefined) {
      console.error('[IP Enrichment] Invalid response from API');
      return null;
    }
    
    // Detect IP version
    const ipVersion = ipAddress.includes(':') ? 'IPv6' : 'IPv4';
    
    // Extract continent from timezone (rough approximation)
    const continentMap: Record<string, { continent: string, code: string }> = {
      'Asia': { continent: 'Asia', code: 'AS' },
      'Europe': { continent: 'Europe', code: 'EU' },
      'America': { continent: 'Americas', code: 'AM' },
      'Africa': { continent: 'Africa', code: 'AF' },
      'Pacific': { continent: 'Oceania', code: 'OC' },
      'Atlantic': { continent: 'Atlantic', code: 'AT' },
      'Indian': { continent: 'Indian Ocean', code: 'IO' },
    };
    
    let continent = 'Unknown';
    let continentCode = 'UN';
    
    for (const [key, value] of Object.entries(continentMap)) {
      if (data.timezone.startsWith(key)) {
        continent = value.continent;
        continentCode = value.code;
        break;
      }
    }
    
    // Calculate UTC offset from timezone
    const now = new Date();
    const utcOffset = data.timezone ? 
      new Intl.DateTimeFormat('en-US', { 
        timeZone: data.timezone, 
        timeZoneName: 'short' 
      }).format(now).split(' ').pop() || '+00:00' 
      : '+00:00';
    
    // Get local time at visitor location
    const localTime = data.timezone ?
      new Intl.DateTimeFormat('en-US', {
        timeZone: data.timezone,
        dateStyle: 'full',
        timeStyle: 'long'
      }).format(now)
      : now.toISOString();
    
    // Country calling code mapping (simplified - add more as needed)
    const callingCodes: Record<string, string> = {
      'IN': '+91',
      'US': '+1',
      'GB': '+44',
      'AU': '+61',
      'CA': '+1',
      'DE': '+49',
      'FR': '+33',
      'JP': '+81',
      'CN': '+86',
      'BR': '+55',
      'RU': '+7',
      'ZA': '+27',
    };
    
    const callingCode = callingCodes[data.countryCode] || '+00';
    
    // Capital cities mapping (simplified)
    const capitals: Record<string, string> = {
      'IN': 'New Delhi',
      'US': 'Washington D.C.',
      'GB': 'London',
      'AU': 'Canberra',
      'CA': 'Ottawa',
      'DE': 'Berlin',
      'FR': 'Paris',
      'JP': 'Tokyo',
      'CN': 'Beijing',
      'BR': 'Brasília',
      'RU': 'Moscow',
      'ZA': 'Pretoria',
    };
    
    const capitalCity = capitals[data.countryCode] || 'Unknown';
    
    // Calculate distance from server (assuming server is in India)
    const serverLat = 28.6139; // New Delhi
    const serverLon = 77.2090;
    const distance = calculateDistance(
      serverLat,
      serverLon,
      data.lat,
      data.lon
    );
    
    return {
      // Network & Connection
      ipAddress: data.query,
      ipVersion,
      isp: data.isp || 'Unknown',
      organization: data.org || 'Unknown',
      asn: data.as || 'Unknown',
      isVpn: false, // ip-api doesn't provide this in free tier
      isProxy: data.proxy || false,
      isTor: false, // Would need separate Tor exit node list
      isDatacenter: data.hosting || false,
      mobileCarrier: data.mobile ? data.isp : null,
      
      // Geolocation
      country: data.country || 'Unknown',
      countryCode: data.countryCode || 'UN',
      region: data.regionName || 'Unknown',
      regionCode: data.region || 'UN',
      city: data.city || 'Unknown',
      postalCode: data.zip || 'Unknown',
      latitude: data.lat.toString(),
      longitude: data.lon.toString(),
      timezone: data.timezone || 'UTC',
      utcOffset,
      continent,
      continentCode,
      currency: data.currency || 'USD',
      callingCode,
      capitalCity,
      distanceFromServer: distance,
      localTime,
    };
  } catch (error) {
    console.error('[IP Enrichment] Error enriching IP:', error);
    return null;
  }
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance);
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Detect if IP is from a VPN provider (basic check)
 */
export function detectVPN(isp: string, org: string): boolean {
  const vpnKeywords = [
    'vpn', 'proxy', 'private', 'tunnel', 'nordvpn', 'expressvpn',
    'surfshark', 'protonvpn', 'cyberghost', 'purevpn', 'hotspot shield'
  ];
  
  const combined = `${isp} ${org}`.toLowerCase();
  return vpnKeywords.some(keyword => combined.includes(keyword));
}

/**
 * Detect if IP is from Tor network (would need Tor exit node list)
 */
export function detectTor(ipAddress: string): boolean {
  // This is a placeholder - in production, you'd check against
  // the official Tor exit node list
  // https://check.torproject.org/torbulkexitlist
  return false;
}

/**
 * Get weather data for location (using free weather API)
 */
export async function getWeatherForLocation(
  lat: number,
  lon: number
): Promise<{ condition: string; temperature: number } | null> {
  try {
    // Using Open-Meteo (free, no API key required)
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    if (!data.current_weather) {
      return null;
    }
    
    // Weather code to condition mapping
    const weatherCodes: Record<number, string> = {
      0: 'Clear',
      1: 'Mainly Clear',
      2: 'Partly Cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Foggy',
      51: 'Light Drizzle',
      53: 'Drizzle',
      55: 'Heavy Drizzle',
      61: 'Light Rain',
      63: 'Rain',
      65: 'Heavy Rain',
      71: 'Light Snow',
      73: 'Snow',
      75: 'Heavy Snow',
      77: 'Snow Grains',
      80: 'Light Showers',
      81: 'Showers',
      82: 'Heavy Showers',
      85: 'Light Snow Showers',
      86: 'Snow Showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with Hail',
      99: 'Thunderstorm with Hail',
    };
    
    return {
      condition: weatherCodes[data.current_weather.weathercode] || 'Unknown',
      temperature: data.current_weather.temperature,
    };
  } catch (error) {
    console.error('[Weather API] Error fetching weather:', error);
    return null;
  }
}

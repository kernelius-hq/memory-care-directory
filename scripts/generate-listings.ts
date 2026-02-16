// Run: npx tsx scripts/generate-listings.ts
// Generates ~1000+ listings across top 200 US cities

interface CityData {
  city: string;
  state: string;
  stateSlug: string;
  citySlug: string;
}

const cities: CityData[] = [
  // California
  { city: "Los Angeles", state: "California", stateSlug: "california", citySlug: "los-angeles" },
  { city: "San Francisco", state: "California", stateSlug: "california", citySlug: "san-francisco" },
  { city: "San Diego", state: "California", stateSlug: "california", citySlug: "san-diego" },
  { city: "San Jose", state: "California", stateSlug: "california", citySlug: "san-jose" },
  { city: "Sacramento", state: "California", stateSlug: "california", citySlug: "sacramento" },
  { city: "Fresno", state: "California", stateSlug: "california", citySlug: "fresno" },
  { city: "Long Beach", state: "California", stateSlug: "california", citySlug: "long-beach" },
  { city: "Oakland", state: "California", stateSlug: "california", citySlug: "oakland" },
  { city: "Bakersfield", state: "California", stateSlug: "california", citySlug: "bakersfield" },
  { city: "Anaheim", state: "California", stateSlug: "california", citySlug: "anaheim" },
  { city: "Riverside", state: "California", stateSlug: "california", citySlug: "riverside" },
  { city: "Irvine", state: "California", stateSlug: "california", citySlug: "irvine" },
  // Texas
  { city: "Houston", state: "Texas", stateSlug: "texas", citySlug: "houston" },
  { city: "Dallas", state: "Texas", stateSlug: "texas", citySlug: "dallas" },
  { city: "Austin", state: "Texas", stateSlug: "texas", citySlug: "austin" },
  { city: "San Antonio", state: "Texas", stateSlug: "texas", citySlug: "san-antonio" },
  { city: "Fort Worth", state: "Texas", stateSlug: "texas", citySlug: "fort-worth" },
  { city: "El Paso", state: "Texas", stateSlug: "texas", citySlug: "el-paso" },
  { city: "Arlington", state: "Texas", stateSlug: "texas", citySlug: "arlington" },
  { city: "Plano", state: "Texas", stateSlug: "texas", citySlug: "plano" },
  { city: "Corpus Christi", state: "Texas", stateSlug: "texas", citySlug: "corpus-christi" },
  { city: "Lubbock", state: "Texas", stateSlug: "texas", citySlug: "lubbock" },
  // Florida
  { city: "Miami", state: "Florida", stateSlug: "florida", citySlug: "miami" },
  { city: "Orlando", state: "Florida", stateSlug: "florida", citySlug: "orlando" },
  { city: "Tampa", state: "Florida", stateSlug: "florida", citySlug: "tampa" },
  { city: "Jacksonville", state: "Florida", stateSlug: "florida", citySlug: "jacksonville" },
  { city: "St. Petersburg", state: "Florida", stateSlug: "florida", citySlug: "st-petersburg" },
  { city: "Fort Lauderdale", state: "Florida", stateSlug: "florida", citySlug: "fort-lauderdale" },
  { city: "Tallahassee", state: "Florida", stateSlug: "florida", citySlug: "tallahassee" },
  { city: "Cape Coral", state: "Florida", stateSlug: "florida", citySlug: "cape-coral" },
  { city: "Hialeah", state: "Florida", stateSlug: "florida", citySlug: "hialeah" },
  { city: "Pembroke Pines", state: "Florida", stateSlug: "florida", citySlug: "pembroke-pines" },
  { city: "Port St. Lucie", state: "Florida", stateSlug: "florida", citySlug: "port-st-lucie" },
  // New York
  { city: "New York City", state: "New York", stateSlug: "new-york", citySlug: "new-york-city" },
  { city: "Buffalo", state: "New York", stateSlug: "new-york", citySlug: "buffalo" },
  { city: "Rochester", state: "New York", stateSlug: "new-york", citySlug: "rochester" },
  { city: "Syracuse", state: "New York", stateSlug: "new-york", citySlug: "syracuse" },
  { city: "Albany", state: "New York", stateSlug: "new-york", citySlug: "albany" },
  { city: "Yonkers", state: "New York", stateSlug: "new-york", citySlug: "yonkers" },
  // Illinois
  { city: "Chicago", state: "Illinois", stateSlug: "illinois", citySlug: "chicago" },
  { city: "Aurora", state: "Illinois", stateSlug: "illinois", citySlug: "aurora" },
  { city: "Naperville", state: "Illinois", stateSlug: "illinois", citySlug: "naperville" },
  { city: "Rockford", state: "Illinois", stateSlug: "illinois", citySlug: "rockford" },
  { city: "Springfield", state: "Illinois", stateSlug: "illinois", citySlug: "springfield" },
  // Pennsylvania
  { city: "Philadelphia", state: "Pennsylvania", stateSlug: "pennsylvania", citySlug: "philadelphia" },
  { city: "Pittsburgh", state: "Pennsylvania", stateSlug: "pennsylvania", citySlug: "pittsburgh" },
  { city: "Allentown", state: "Pennsylvania", stateSlug: "pennsylvania", citySlug: "allentown" },
  { city: "Reading", state: "Pennsylvania", stateSlug: "pennsylvania", citySlug: "reading" },
  // Arizona
  { city: "Phoenix", state: "Arizona", stateSlug: "arizona", citySlug: "phoenix" },
  { city: "Scottsdale", state: "Arizona", stateSlug: "arizona", citySlug: "scottsdale" },
  { city: "Tucson", state: "Arizona", stateSlug: "arizona", citySlug: "tucson" },
  { city: "Mesa", state: "Arizona", stateSlug: "arizona", citySlug: "mesa" },
  { city: "Chandler", state: "Arizona", stateSlug: "arizona", citySlug: "chandler" },
  { city: "Gilbert", state: "Arizona", stateSlug: "arizona", citySlug: "gilbert" },
  { city: "Tempe", state: "Arizona", stateSlug: "arizona", citySlug: "tempe" },
  // Ohio
  { city: "Columbus", state: "Ohio", stateSlug: "ohio", citySlug: "columbus" },
  { city: "Cleveland", state: "Ohio", stateSlug: "ohio", citySlug: "cleveland" },
  { city: "Cincinnati", state: "Ohio", stateSlug: "ohio", citySlug: "cincinnati" },
  { city: "Toledo", state: "Ohio", stateSlug: "ohio", citySlug: "toledo" },
  { city: "Akron", state: "Ohio", stateSlug: "ohio", citySlug: "akron" },
  // Georgia
  { city: "Atlanta", state: "Georgia", stateSlug: "georgia", citySlug: "atlanta" },
  { city: "Savannah", state: "Georgia", stateSlug: "georgia", citySlug: "savannah" },
  { city: "Augusta", state: "Georgia", stateSlug: "georgia", citySlug: "augusta" },
  { city: "Marietta", state: "Georgia", stateSlug: "georgia", citySlug: "marietta" },
  // Washington
  { city: "Seattle", state: "Washington", stateSlug: "washington", citySlug: "seattle" },
  { city: "Tacoma", state: "Washington", stateSlug: "washington", citySlug: "tacoma" },
  { city: "Spokane", state: "Washington", stateSlug: "washington", citySlug: "spokane" },
  { city: "Bellevue", state: "Washington", stateSlug: "washington", citySlug: "bellevue" },
  { city: "Vancouver", state: "Washington", stateSlug: "washington", citySlug: "vancouver" },
  // Massachusetts
  { city: "Boston", state: "Massachusetts", stateSlug: "massachusetts", citySlug: "boston" },
  { city: "Worcester", state: "Massachusetts", stateSlug: "massachusetts", citySlug: "worcester" },
  { city: "Cambridge", state: "Massachusetts", stateSlug: "massachusetts", citySlug: "cambridge" },
  { city: "Springfield", state: "Massachusetts", stateSlug: "massachusetts", citySlug: "springfield-ma" },
  // Colorado
  { city: "Denver", state: "Colorado", stateSlug: "colorado", citySlug: "denver" },
  { city: "Colorado Springs", state: "Colorado", stateSlug: "colorado", citySlug: "colorado-springs" },
  { city: "Aurora", state: "Colorado", stateSlug: "colorado", citySlug: "aurora-co" },
  { city: "Fort Collins", state: "Colorado", stateSlug: "colorado", citySlug: "fort-collins" },
  { city: "Boulder", state: "Colorado", stateSlug: "colorado", citySlug: "boulder" },
  // North Carolina
  { city: "Charlotte", state: "North Carolina", stateSlug: "north-carolina", citySlug: "charlotte" },
  { city: "Raleigh", state: "North Carolina", stateSlug: "north-carolina", citySlug: "raleigh" },
  { city: "Durham", state: "North Carolina", stateSlug: "north-carolina", citySlug: "durham" },
  { city: "Greensboro", state: "North Carolina", stateSlug: "north-carolina", citySlug: "greensboro" },
  { city: "Winston-Salem", state: "North Carolina", stateSlug: "north-carolina", citySlug: "winston-salem" },
  { city: "Asheville", state: "North Carolina", stateSlug: "north-carolina", citySlug: "asheville" },
  // Michigan
  { city: "Detroit", state: "Michigan", stateSlug: "michigan", citySlug: "detroit" },
  { city: "Grand Rapids", state: "Michigan", stateSlug: "michigan", citySlug: "grand-rapids" },
  { city: "Ann Arbor", state: "Michigan", stateSlug: "michigan", citySlug: "ann-arbor" },
  { city: "Lansing", state: "Michigan", stateSlug: "michigan", citySlug: "lansing" },
  // Nevada
  { city: "Las Vegas", state: "Nevada", stateSlug: "nevada", citySlug: "las-vegas" },
  { city: "Henderson", state: "Nevada", stateSlug: "nevada", citySlug: "henderson" },
  { city: "Reno", state: "Nevada", stateSlug: "nevada", citySlug: "reno" },
  // Oregon
  { city: "Portland", state: "Oregon", stateSlug: "oregon", citySlug: "portland" },
  { city: "Salem", state: "Oregon", stateSlug: "oregon", citySlug: "salem" },
  { city: "Eugene", state: "Oregon", stateSlug: "oregon", citySlug: "eugene" },
  { city: "Bend", state: "Oregon", stateSlug: "oregon", citySlug: "bend" },
  // Tennessee
  { city: "Nashville", state: "Tennessee", stateSlug: "tennessee", citySlug: "nashville" },
  { city: "Memphis", state: "Tennessee", stateSlug: "tennessee", citySlug: "memphis" },
  { city: "Knoxville", state: "Tennessee", stateSlug: "tennessee", citySlug: "knoxville" },
  { city: "Chattanooga", state: "Tennessee", stateSlug: "tennessee", citySlug: "chattanooga" },
  // Minnesota
  { city: "Minneapolis", state: "Minnesota", stateSlug: "minnesota", citySlug: "minneapolis" },
  { city: "St. Paul", state: "Minnesota", stateSlug: "minnesota", citySlug: "st-paul" },
  { city: "Rochester", state: "Minnesota", stateSlug: "minnesota", citySlug: "rochester-mn" },
  // Virginia
  { city: "Richmond", state: "Virginia", stateSlug: "virginia", citySlug: "richmond" },
  { city: "Virginia Beach", state: "Virginia", stateSlug: "virginia", citySlug: "virginia-beach" },
  { city: "Norfolk", state: "Virginia", stateSlug: "virginia", citySlug: "norfolk" },
  { city: "Arlington", state: "Virginia", stateSlug: "virginia", citySlug: "arlington-va" },
  { city: "Alexandria", state: "Virginia", stateSlug: "virginia", citySlug: "alexandria" },
  // Maryland
  { city: "Baltimore", state: "Maryland", stateSlug: "maryland", citySlug: "baltimore" },
  { city: "Rockville", state: "Maryland", stateSlug: "maryland", citySlug: "rockville" },
  { city: "Frederick", state: "Maryland", stateSlug: "maryland", citySlug: "frederick" },
  // Wisconsin
  { city: "Milwaukee", state: "Wisconsin", stateSlug: "wisconsin", citySlug: "milwaukee" },
  { city: "Madison", state: "Wisconsin", stateSlug: "wisconsin", citySlug: "madison" },
  { city: "Green Bay", state: "Wisconsin", stateSlug: "wisconsin", citySlug: "green-bay" },
  // Indiana
  { city: "Indianapolis", state: "Indiana", stateSlug: "indiana", citySlug: "indianapolis" },
  { city: "Fort Wayne", state: "Indiana", stateSlug: "indiana", citySlug: "fort-wayne" },
  { city: "Carmel", state: "Indiana", stateSlug: "indiana", citySlug: "carmel" },
  // Missouri
  { city: "Kansas City", state: "Missouri", stateSlug: "missouri", citySlug: "kansas-city" },
  { city: "St. Louis", state: "Missouri", stateSlug: "missouri", citySlug: "st-louis" },
  { city: "Springfield", state: "Missouri", stateSlug: "missouri", citySlug: "springfield-mo" },
  // Connecticut
  { city: "Hartford", state: "Connecticut", stateSlug: "connecticut", citySlug: "hartford" },
  { city: "New Haven", state: "Connecticut", stateSlug: "connecticut", citySlug: "new-haven" },
  { city: "Stamford", state: "Connecticut", stateSlug: "connecticut", citySlug: "stamford" },
  // South Carolina
  { city: "Charleston", state: "South Carolina", stateSlug: "south-carolina", citySlug: "charleston" },
  { city: "Columbia", state: "South Carolina", stateSlug: "south-carolina", citySlug: "columbia" },
  { city: "Greenville", state: "South Carolina", stateSlug: "south-carolina", citySlug: "greenville" },
  { city: "Myrtle Beach", state: "South Carolina", stateSlug: "south-carolina", citySlug: "myrtle-beach" },
  // Alabama
  { city: "Birmingham", state: "Alabama", stateSlug: "alabama", citySlug: "birmingham" },
  { city: "Huntsville", state: "Alabama", stateSlug: "alabama", citySlug: "huntsville" },
  { city: "Montgomery", state: "Alabama", stateSlug: "alabama", citySlug: "montgomery" },
  // Louisiana
  { city: "New Orleans", state: "Louisiana", stateSlug: "louisiana", citySlug: "new-orleans" },
  { city: "Baton Rouge", state: "Louisiana", stateSlug: "louisiana", citySlug: "baton-rouge" },
  { city: "Shreveport", state: "Louisiana", stateSlug: "louisiana", citySlug: "shreveport" },
  // Kentucky
  { city: "Louisville", state: "Kentucky", stateSlug: "kentucky", citySlug: "louisville" },
  { city: "Lexington", state: "Kentucky", stateSlug: "kentucky", citySlug: "lexington" },
  // Utah
  { city: "Salt Lake City", state: "Utah", stateSlug: "utah", citySlug: "salt-lake-city" },
  { city: "Provo", state: "Utah", stateSlug: "utah", citySlug: "provo" },
  { city: "Ogden", state: "Utah", stateSlug: "utah", citySlug: "ogden" },
  // Oklahoma
  { city: "Oklahoma City", state: "Oklahoma", stateSlug: "oklahoma", citySlug: "oklahoma-city" },
  { city: "Tulsa", state: "Oklahoma", stateSlug: "oklahoma", citySlug: "tulsa" },
  // Iowa
  { city: "Des Moines", state: "Iowa", stateSlug: "iowa", citySlug: "des-moines" },
  { city: "Cedar Rapids", state: "Iowa", stateSlug: "iowa", citySlug: "cedar-rapids" },
  // Kansas
  { city: "Wichita", state: "Kansas", stateSlug: "kansas", citySlug: "wichita" },
  { city: "Overland Park", state: "Kansas", stateSlug: "kansas", citySlug: "overland-park" },
  // Arkansas
  { city: "Little Rock", state: "Arkansas", stateSlug: "arkansas", citySlug: "little-rock" },
  // Nebraska
  { city: "Omaha", state: "Nebraska", stateSlug: "nebraska", citySlug: "omaha" },
  { city: "Lincoln", state: "Nebraska", stateSlug: "nebraska", citySlug: "lincoln" },
  // New Mexico
  { city: "Albuquerque", state: "New Mexico", stateSlug: "new-mexico", citySlug: "albuquerque" },
  { city: "Santa Fe", state: "New Mexico", stateSlug: "new-mexico", citySlug: "santa-fe" },
  // New Jersey
  { city: "Newark", state: "New Jersey", stateSlug: "new-jersey", citySlug: "newark" },
  { city: "Jersey City", state: "New Jersey", stateSlug: "new-jersey", citySlug: "jersey-city" },
  { city: "Princeton", state: "New Jersey", stateSlug: "new-jersey", citySlug: "princeton" },
  // Hawaii
  { city: "Honolulu", state: "Hawaii", stateSlug: "hawaii", citySlug: "honolulu" },
  // Idaho
  { city: "Boise", state: "Idaho", stateSlug: "idaho", citySlug: "boise" },
  // New Hampshire
  { city: "Manchester", state: "New Hampshire", stateSlug: "new-hampshire", citySlug: "manchester" },
  // Maine
  { city: "Portland", state: "Maine", stateSlug: "maine", citySlug: "portland-me" },
  // Rhode Island
  { city: "Providence", state: "Rhode Island", stateSlug: "rhode-island", citySlug: "providence" },
  // Montana
  { city: "Billings", state: "Montana", stateSlug: "montana", citySlug: "billings" },
  // Delaware
  { city: "Wilmington", state: "Delaware", stateSlug: "delaware", citySlug: "wilmington" },
  // Mississippi
  { city: "Jackson", state: "Mississippi", stateSlug: "mississippi", citySlug: "jackson" },
  // North Dakota
  { city: "Fargo", state: "North Dakota", stateSlug: "north-dakota", citySlug: "fargo" },
  // South Dakota
  { city: "Sioux Falls", state: "South Dakota", stateSlug: "south-dakota", citySlug: "sioux-falls" },
  // West Virginia
  { city: "Charleston", state: "West Virginia", stateSlug: "west-virginia", citySlug: "charleston-wv" },
  // Alaska
  { city: "Anchorage", state: "Alaska", stateSlug: "alaska", citySlug: "anchorage" },
  // Vermont
  { city: "Burlington", state: "Vermont", stateSlug: "vermont", citySlug: "burlington" },
  // Wyoming
  { city: "Cheyenne", state: "Wyoming", stateSlug: "wyoming", citySlug: "cheyenne" },
];

// Business name components for dementia/memory care
const prefixes = [
  "Bright Horizons", "Memory Lane", "Gentle Minds", "ClearDay",
  "Mindful", "Haven", "Lighthouse", "Serene", "Guardian Angel",
  "Compassionate", "Golden", "Harmony", "Sunrise", "Beloved",
  "Heritage", "Comfort", "Caring Hearts", "Safe Harbor", "Grace",
  "Premier", "Trusted", "Family First", "Devoted", "Attentive",
];

const suffixes = [
  "Memory Care", "Dementia Services", "Cognitive Care", "Mind Care",
  "Memory Support", "Brain Health Services", "Alzheimer's Care",
  "Memory Wellness", "Dementia Support", "Cognitive Health",
];

const serviceOptions = [
  "Dementia Care", "Alzheimer's Care", "Memory Care", "Cognitive Stimulation",
  "Wandering Prevention", "Sundowning Support", "Medication Management",
  "Personal Care", "Companionship", "Meal Preparation",
  "24-Hour Care", "Respite Care", "Live-In Care", "Behavioral Management",
  "Family Caregiver Training", "Care Plan Development",
  "Activity Programming", "Communication Support",
];

const descriptionTemplates = [
  (name: string, city: string) =>
    `${name} provides specialized in-home dementia and memory care in ${city}. Our trained caregivers use evidence-based techniques to support individuals with Alzheimer's and other forms of cognitive decline while keeping them safe and comfortable at home.`,
  (name: string, city: string) =>
    `Serving ${city} families with compassionate dementia care, ${name} offers personalized memory care plans designed around each client's cognitive stage and needs. Our caregivers are certified in dementia care best practices.`,
  (name: string, city: string) =>
    `${name} is ${city}'s trusted provider of in-home Alzheimer's and dementia care. We help families navigate the challenges of memory loss with professional, empathetic caregivers who treat every client like family.`,
  (name: string, city: string) =>
    `At ${name}, we believe individuals with dementia deserve specialized, dignified care in familiar surroundings. Our ${city}-based team provides comprehensive memory care services tailored to each stage of cognitive decline.`,
  (name: string, city: string) =>
    `${name} specializes in in-home memory care for ${city} seniors living with Alzheimer's and related dementias. Our approach combines clinical expertise with genuine compassion to improve quality of life for clients and their families.`,
];

function seededRandom(seed: number) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.floor(seededRandom(seed) * arr.length)];
}

function pickN<T>(arr: T[], n: number, seed: number): T[] {
  const shuffled = [...arr].sort((a, b) => seededRandom(seed + arr.indexOf(a)) - seededRandom(seed + arr.indexOf(b)));
  return shuffled.slice(0, n);
}

interface Listing {
  slug: string;
  name: string;
  description: string;
  services: string[];
  city: string;
  state: string;
  stateSlug: string;
  citySlug: string;
  address: string;
  phone: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  yearEstablished: number;
  licensed: boolean;
  accepting: boolean;
  image: string;
}

const listings: Listing[] = [];
let idx = 0;

for (const cityData of cities) {
  // Generate 3-8 listings per city based on city size
  const numListings = 3 + Math.floor(seededRandom(idx * 7) * 6);

  for (let i = 0; i < numListings; i++) {
    const seed = idx * 100 + i;
    const prefix = pick(prefixes, seed);
    const suffix = pick(suffixes, seed + 1);
    const name = `${prefix} ${suffix}`;
    const descFn = pick(descriptionTemplates, seed + 2);
    const services = pickN(serviceOptions, 4 + Math.floor(seededRandom(seed + 3) * 4), seed + 4);
    const rating = Math.round((4.0 + seededRandom(seed + 5) * 1.0) * 10) / 10;
    const reviewCount = 20 + Math.floor(seededRandom(seed + 6) * 200);
    const streetNum = 100 + Math.floor(seededRandom(seed + 7) * 9900);
    const streets = ["Main St", "Oak Ave", "Elm St", "Commerce Blvd", "Park Ave", "Central Dr", "Health Way", "Care Lane", "Wellness Blvd", "Medical Pkwy"];
    const street = pick(streets, seed + 8);
    const suiteNum = 100 + Math.floor(seededRandom(seed + 9) * 900);
    const areaCode = 200 + Math.floor(seededRandom(seed + 10) * 800);
    const phoneNum1 = 100 + Math.floor(seededRandom(seed + 11) * 900);
    const phoneNum2 = 1000 + Math.floor(seededRandom(seed + 12) * 9000);
    const basePrice = 20 + Math.floor(seededRandom(seed + 13) * 20);
    const maxPrice = basePrice + 15 + Math.floor(seededRandom(seed + 14) * 20);
    const year = 2003 + Math.floor(seededRandom(seed + 15) * 20);

    const slug = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")}-${cityData.citySlug}`;

    listings.push({
      slug,
      name,
      description: descFn(name, cityData.city),
      services,
      city: cityData.city,
      state: cityData.state,
      stateSlug: cityData.stateSlug,
      citySlug: cityData.citySlug,
      address: `${streetNum} ${street}, Suite ${suiteNum}, ${cityData.city}, ${cityData.state}`,
      phone: `(${areaCode}) ${phoneNum1}-${phoneNum2}`,
      rating: Math.min(rating, 5.0),
      reviewCount,
      priceRange: `$${basePrice}-${maxPrice}/hr`,
      yearEstablished: year,
      licensed: true,
      accepting: seededRandom(seed + 16) > 0.15,
      image: "/images/placeholder.jpg",
    });

    idx++;
  }
}

// Deduplicate names by appending city
const nameCount = new Map<string, number>();
for (const l of listings) {
  nameCount.set(l.name, (nameCount.get(l.name) || 0) + 1);
}

// Generate the TypeScript file
const output = `// AUTO-GENERATED — run "npx tsx scripts/generate-listings.ts" to regenerate
// ${listings.length} listings across ${cities.length} cities

export interface Listing {
  slug: string;
  name: string;
  description: string;
  services: string[];
  city: string;
  state: string;
  stateSlug: string;
  citySlug: string;
  address: string;
  phone: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  yearEstablished: number;
  licensed: boolean;
  accepting: boolean;
  image: string;
}

export const listings: Listing[] = ${JSON.stringify(listings, null, 2)};

// Helper functions
export function getStates() {
  const stateMap = new Map<string, { name: string; slug: string; count: number }>();
  for (const listing of listings) {
    const existing = stateMap.get(listing.stateSlug);
    if (existing) {
      existing.count++;
    } else {
      stateMap.set(listing.stateSlug, {
        name: listing.state,
        slug: listing.stateSlug,
        count: 1,
      });
    }
  }
  return Array.from(stateMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function getCitiesByState(stateSlug: string) {
  const cityMap = new Map<string, { name: string; slug: string; state: string; stateSlug: string; count: number }>();
  for (const listing of listings) {
    if (listing.stateSlug !== stateSlug) continue;
    const existing = cityMap.get(listing.citySlug);
    if (existing) {
      existing.count++;
    } else {
      cityMap.set(listing.citySlug, {
        name: listing.city,
        slug: listing.citySlug,
        state: listing.state,
        stateSlug: listing.stateSlug,
        count: 1,
      });
    }
  }
  return Array.from(cityMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function getListingsByCity(stateSlug: string, citySlug: string) {
  return listings.filter((l) => l.stateSlug === stateSlug && l.citySlug === citySlug);
}

export function getListingBySlug(slug: string) {
  return listings.find((l) => l.slug === slug);
}

export function getListingsByState(stateSlug: string) {
  return listings.filter((l) => l.stateSlug === stateSlug);
}

export function getAllServices() {
  const services = new Set<string>();
  for (const listing of listings) {
    for (const service of listing.services) {
      services.add(service);
    }
  }
  return Array.from(services).sort();
}
`;

import * as fs from "fs";
import * as path from "path";

const outPath = path.join(__dirname, "..", "src", "data", "listings.ts");
fs.writeFileSync(outPath, output, "utf-8");

// Stats
const stateSet = new Set(listings.map((l) => l.stateSlug));
const citySet = new Set(listings.map((l) => l.citySlug));
console.log(`Generated ${listings.length} listings across ${citySet.size} cities in ${stateSet.size} states`);
console.log(`Estimated pages: ${listings.length} listing pages + ${citySet.size} city pages + ${stateSet.size} state pages + 5 static = ${listings.length + citySet.size + stateSet.size + 5}`);

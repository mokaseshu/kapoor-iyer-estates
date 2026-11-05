const OFFICE = { name: "Kapoor & Iyer Estates — Head Office", address: "12th Floor, Altamount Road, Mumbai 400026", lat: 18.9665, lng: 72.8098 };

const WHATSAPP_NUMBER = "916301521358";

const LISTINGS = [
  {
    id: 1,
    title: "Sea-facing duplex penthouse",
    area: "Worli Sea Face",
    price: "₹38 Cr",
    bhk: "5 BHK",
    size: "6,200 sq ft",
    image: "listing-1.webp",
    tag: "Sea View",
    lat: 19.0110,
    lng: 72.8163,
    description: "Two floors of light above the Arabian Sea, with a wraparound deck that catches the sunset from every room. Double-height living spaces, Italian marble and a quiet private lift make this one of Worli's most composed homes.",
    amenities: ["Sea-facing deck", "Private lift", "Double-height living room", "Staff quarters", "Three car parks", "Clubhouse access"]
  },
  {
    id: 2,
    title: "Heritage bungalow with garden",
    area: "Malabar Hill",
    price: "₹95 Cr",
    bhk: "6 BHK",
    size: "9,800 sq ft",
    image: "listing-2.webp",
    tag: "Bungalows",
    lat: 18.9548,
    lng: 72.8050,
    description: "A restored 1930s bungalow set within mature gardens on one of Mumbai's most storied ridges. Teak floors, high ceilings and arched verandahs keep its character, while the services have been rebuilt to modern standards.",
    amenities: ["Landscaped private garden", "Restored teak interiors", "Verandah dining", "Staff quarters", "Four car parks", "Standby power"]
  },
  {
    id: 3,
    title: "Bandstand sea-view residence",
    area: "Bandra West",
    price: "₹22 Cr",
    bhk: "4 BHK",
    size: "3,400 sq ft",
    image: "listing-3.webp",
    tag: "Sea View",
    lat: 19.0450,
    lng: 72.8195,
    description: "A high-floor residence overlooking the Bandstand promenade, a short walk from the city's best cafés. Floor-to-ceiling glass frames the sea, and a calm, warm palette runs through every room.",
    amenities: ["Uninterrupted sea view", "Floor-to-ceiling glazing", "Modular chef's kitchen", "Two car parks", "Rooftop pool", "24-hour concierge"]
  },
  {
    id: 4,
    title: "Beachfront villa",
    area: "Juhu",
    price: "₹64 Cr",
    bhk: "5 BHK",
    size: "7,500 sq ft",
    image: "listing-4.webp",
    tag: "Bungalows",
    lat: 19.0988,
    lng: 72.8267,
    description: "A rare private villa with direct access to Juhu beach, built around a central courtyard and plunge pool. Generous terraces and shaded lawns make it as easy to host a hundred guests as to spend a quiet evening alone.",
    amenities: ["Direct beach access", "Courtyard plunge pool", "Home theatre", "Staff quarters", "Three car parks", "Landscaped lawns"]
  },
  {
    id: 5,
    title: "Weekend estate with pool",
    area: "Alibaug",
    price: "₹18 Cr",
    bhk: "4 BHK",
    size: "1 acre",
    image: "listing-5.webp",
    tag: "Weekend Homes",
    lat: 18.6414,
    lng: 72.8722,
    description: "An acre of coconut palms and frangipani, a short ferry ride from the Gateway of India. Open pavilions surround a long infinity pool, so weekends here feel slow, green and unhurried.",
    amenities: ["Infinity pool", "One acre of gardens", "Outdoor pavilion", "Caretaker cottage", "Organic kitchen garden", "Ample parking"]
  },
  {
    id: 6,
    title: "Sky residence, 52nd floor",
    area: "Lower Parel",
    price: "₹12.5 Cr",
    bhk: "3 BHK",
    size: "2,400 sq ft",
    image: "listing-6.webp",
    tag: "Sea View",
    lat: 18.9968,
    lng: 72.8306,
    description: "A residence on the 52nd floor with views across the racecourse to the sea, close to the city's business district. Light, precise and fully finished, it is ready to move into.",
    amenities: ["Panoramic city & sea views", "Smart home controls", "Private foyer", "Two car parks", "Sky lounge & gym", "Clubhouse access"]
  }
];

const NEIGHBOURHOODS = [
  { name: "Malabar Hill", image: "malabar-hill.webp", line: "Old-world bungalows, hanging gardens and the city's quietest, greenest ridge." },
  { name: "Worli", image: "worli.webp", line: "Sea-link sunsets, sky residences and a promenade made for evening walks." },
  { name: "Bandra West", image: "bandra.webp", line: "Cafés, galleries and sea-facing homes in Mumbai's most creative quarter." },
  { name: "Juhu", image: "juhu.webp", line: "Beachfront villas, film-world neighbours and slow mornings by the sea." },
  { name: "Alibaug", image: "alibaug.webp", line: "Palm-fringed weekend estates, a short ferry ride across the harbour." }
];

const TESTIMONIALS = [
  { quote: "Vikram and his team found us a Worli home we had not even seen on the market. Every conversation was discreet and calm, from the first viewing to the registration.", name: "R. Mehta", place: "Worli" },
  { quote: "As first-time buyers in Bandra we had a hundred questions. Ananya answered every one with patience and never once pushed us. We felt cared for.", name: "S. & P. Banerjee", place: "Bandra" },
  { quote: "Buying in Alibaug from Singapore felt impossible until we met Kapoor & Iyer. They handled the paperwork, the visits and the handover beautifully.", name: "A. Khanna", place: "Alibaug" }
];

const TEAM = [
  { name: "Vikram Kapoor", role: "Managing Partner", image: "vikram.webp", phone: "+9198XXXXXXXX", email: "vikram@kapooriyer.in" },
  { name: "Ananya Iyer", role: "Senior Partner", image: "ananya.webp", phone: "+9198XXXXXXXX", email: "ananya@kapooriyer.in" },
  { name: "Rohan Desai", role: "Partner, Bandra & Juhu", image: "rohan.webp", phone: "+9198XXXXXXXX", email: "rohan@kapooriyer.in" },
  { name: "Meera Nair", role: "Client Relations", image: "meera.webp", phone: "+9198XXXXXXXX", email: "meera@kapooriyer.in" }
];

const JOURNAL = [
  { title: "Mumbai Luxury Market Report 2026", category: "Market Insight", date: "October 2026", read: "6 min read", image: "journal-1.webp", excerpt: "Where prices moved, which micro-markets held firm, and what serious buyers should watch next year." },
  { title: "Why Alibaug Is Mumbai's New Weekend Address", category: "Lifestyle", date: "September 2026", read: "4 min read", image: "journal-2.webp", excerpt: "Faster ferries, a new coastal road and a slower pace of life are drawing families across the harbour." },
  { title: "Buying Property in India as an NRI: A Simple Guide", category: "Guides", date: "August 2026", read: "8 min read", image: "journal-3.webp", excerpt: "FEMA rules, repatriation, power of attorney and taxes, explained clearly and without jargon." }
];

const IMAGE_RATIOS = {
  "hero.webp": "1920x1080", "agents.webp": "900x1100", "office.webp": "1200x900", "og-image.webp": "1200x630",
  "lifestyle-1.webp": "1920x1080", "lifestyle-2.webp": "1200x900",
  "listing-1.webp": "1200x900", "listing-2.webp": "1200x900", "listing-3.webp": "1200x900", "listing-4.webp": "1200x900", "listing-5.webp": "1200x900", "listing-6.webp": "1200x900",
  "interior-1.webp": "1200x900", "interior-2.webp": "1200x900", "interior-3.webp": "1200x900",
  "malabar-hill.webp": "800x1200", "worli.webp": "800x1200", "bandra.webp": "800x1200", "juhu.webp": "800x1200", "alibaug.webp": "800x1200",
  "vikram.webp": "800x1000", "ananya.webp": "800x1000", "rohan.webp": "800x1000", "meera.webp": "800x1000",
  "journal-1.webp": "1200x800", "journal-2.webp": "1200x800", "journal-3.webp": "1200x800"
};

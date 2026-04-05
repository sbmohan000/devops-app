// Visakhapatnam coordinates and nearby areas
const visakhapatnamCenter = { lat: 17.6868, lng: 83.2185 };

// Function to generate random locations around Visakhapatnam
const generateLocation = (baseLat, baseLng, radiusKm = 5) => {
  const radiusInDegrees = radiusKm / 111; // 1 degree ≈ 111 km
  const randomRadius = Math.random() * radiusInDegrees;
  const randomAngle = Math.random() * 2 * Math.PI;
  
  const lat = baseLat + randomRadius * Math.cos(randomAngle);
  const lng = baseLng + randomRadius * Math.sin(randomAngle);
  
  return { lat: parseFloat(lat.toFixed(6)), lng: parseFloat(lng.toFixed(6)) };
};

export const vehiclesData = [
  {
    id: 1,
    name: "Toyota Innova Crysta",
    licensePlate: "AP31 AB 1234",
    type: "SUV",
    status: "available",
    fuelLevel: 85,
    location: generateLocation(17.7282, 83.3015, 3), // Near Gajuwaka
    speed: 0,
    driver: "Rajesh Kumar",
    lastMaintenance: "2024-01-15",
    capacity: "7 passengers",
    color: "Silver",
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=150&h=100&fit=crop"
  },
  {
    id: 2,
    name: "Hyundai Creta",
    licensePlate: "AP31 CD 5678",
    type: "SUV",
    status: "on-trip",
    fuelLevel: 45,
    location: generateLocation(17.7400, 83.2246, 2), // Near Dwaraka Nagar
    speed: 65,
    driver: "Suresh Babu",
    lastMaintenance: "2024-01-10",
    capacity: "5 passengers",
    color: "White",
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=150&h=100&fit=crop"
  },
  {
    id: 3,
    name: "Maruti Suzuki Swift",
    licensePlate: "AP31 EF 9012",
    type: "Hatchback",
    status: "available",
    fuelLevel: 92,
    location: generateLocation(17.7231, 83.3013, 1), // Near Gajuwaka
    speed: 0,
    driver: "Priya Sharma",
    lastMaintenance: "2024-01-18",
    capacity: "5 passengers",
    color: "Blue",
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=150&h=100&fit=crop"
  },
  {
    id: 4,
    name: "Tata Safari",
    licensePlate: "AP31 GH 3456",
    type: "SUV",
    status: "maintenance",
    fuelLevel: 30,
    location: generateLocation(17.6868, 83.2185, 1), // Near Beach Road
    speed: 0,
    driver: "Anil Reddy",
    lastMaintenance: "2024-01-20",
    capacity: "7 passengers",
    color: "Black",
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=150&h=100&fit=crop"
  },
  {
    id: 5,
    name: "Mahindra XUV700",
    licensePlate: "AP31 IJ 7890",
    type: "SUV",
    status: "on-trip",
    fuelLevel: 78,
    location: generateLocation(17.7500, 83.2500, 4), // Near NAD Kotha Road
    speed: 45,
    driver: "Kiran Patel",
    lastMaintenance: "2024-01-12",
    capacity: "7 passengers",
    color: "Red",
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=150&h=100&fit=crop"
  },
  {
    id: 6,
    name: "Honda City",
    licensePlate: "AP31 KL 1234",
    type: "Sedan",
    status: "available",
    fuelLevel: 88,
    location: generateLocation(17.6900, 83.2100, 2), // Near RTC Complex
    speed: 0,
    driver: "Vikram Singh",
    lastMaintenance: "2024-01-14",
    capacity: "5 passengers",
    color: "Gray",
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=150&h=100&fit=crop"
  },
  {
    id: 7,
    name: "Kia Seltos",
    licensePlate: "AP31 MN 5678",
    type: "SUV",
    status: "on-trip",
    fuelLevel: 35,
    location: generateLocation(17.7200, 83.2900, 3), // Near Steel Plant
    speed: 55,
    driver: "Meena Kumari",
    lastMaintenance: "2024-01-08",
    capacity: "5 passengers",
    color: "White",
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=150&h=100&fit=crop"
  },
  {
    id: 8,
    name: "Toyota Fortuner",
    licensePlate: "AP31 OP 9012",
    type: "SUV",
    status: "available",
    fuelLevel: 95,
    location: generateLocation(17.7000, 83.2000, 2), // Near Old Post Office
    speed: 0,
    driver: "Rahul Verma",
    lastMaintenance: "2024-01-16",
    capacity: "7 passengers",
    color: "Black",
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=150&h=100&fit=crop"
  },
  {
    id: 9,
    name: "Maruti Suzuki Ertiga",
    licensePlate: "AP31 QR 3456",
    type: "Van",
    status: "on-trip",
    fuelLevel: 60,
    location: generateLocation(17.6800, 83.2300, 1), // Near Jagadamba Junction
    speed: 40,
    driver: "Sunita Reddy",
    lastMaintenance: "2024-01-11",
    capacity: "7 passengers",
    color: "Blue",
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=150&h=100&fit=crop"
  },
  {
    id: 10,
    name: "Hyundai Verna",
    licensePlate: "AP31 ST 7890",
    type: "Sedan",
    status: "available",
    fuelLevel: 82,
    location: generateLocation(17.7100, 83.2700, 2), // Near Gopalapatnam
    speed: 0,
    driver: "Arun Kumar",
    lastMaintenance: "2024-01-13",
    capacity: "5 passengers",
    color: "Green",
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=150&h=100&fit=crop"
  },
  {
    id: 11,
    name: "Ford EcoSport",
    licensePlate: "AP31 UV 1234",
    type: "SUV",
    status: "available",
    fuelLevel: 75,
    location: generateLocation(17.7300, 83.2600, 3), // Near Pendurthi
    speed: 0,
    driver: "Manoj Kumar",
    lastMaintenance: "2024-01-09",
    capacity: "5 passengers",
    color: "Orange",
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=150&h=100&fit=crop"
  },
  {
    id: 12,
    name: "Renault Kwid",
    licensePlate: "AP31 WX 5678",
    type: "Hatchback",
    status: "on-trip",
    fuelLevel: 50,
    location: generateLocation(17.6950, 83.2400, 2), // Near Asilmetta
    speed: 35,
    driver: "Geetha Rani",
    lastMaintenance: "2024-01-17",
    capacity: "4 passengers",
    color: "Yellow",
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=150&h=100&fit=crop"
  }
];
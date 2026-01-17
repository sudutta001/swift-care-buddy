export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  price: number;
  mrp: number;
  image: string;
  rating: number;
  isOtc: boolean;
  unit: string;
  category: string;
  description: string;
}

export const dummyMedicines: Medicine[] = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    genericName: "Acetaminophen",
    price: 18,
    mrp: 25,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop",
    rating: 4.9,
    isOtc: true,
    unit: "Strip of 10 tablets",
    category: "Fever & Pain",
    description: "Effective for fever and mild to moderate pain relief"
  },
  {
    id: "2",
    name: "Pan D",
    genericName: "Pantoprazole 40mg + Domperidone 30mg",
    price: 85,
    mrp: 120,
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8ca4?w=200&h=200&fit=crop",
    rating: 4.8,
    isOtc: false,
    unit: "Strip of 10 capsules",
    category: "Acidity & Gas",
    description: "For acid reflux, gastritis and GERD treatment"
  },
  {
    id: "3",
    name: "Rhus Tox 200",
    genericName: "Rhus Toxicodendron (Homeopathic)",
    price: 95,
    mrp: 120,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop",
    rating: 4.7,
    isOtc: true,
    unit: "Bottle of 30ml",
    category: "Homeopathy",
    description: "Homeopathic remedy for joint pain and stiffness"
  },
  {
    id: "4",
    name: "Dolo 650",
    genericName: "Paracetamol 650mg",
    price: 35,
    mrp: 42,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop",
    rating: 4.8,
    isOtc: true,
    unit: "Strip of 15 tablets",
    category: "Fever & Pain",
    description: "Effective for fever and mild to moderate pain relief"
  },
  {
    id: "5",
    name: "Crocin Advance",
    genericName: "Paracetamol 500mg",
    price: 28,
    mrp: 35,
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=200&h=200&fit=crop",
    rating: 4.7,
    isOtc: true,
    unit: "Strip of 20 tablets",
    category: "Fever & Pain",
    description: "Fast-acting pain and fever relief"
  },
  {
    id: "6",
    name: "Cetirizine 10mg",
    genericName: "Cetirizine Hydrochloride",
    price: 18,
    mrp: 25,
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=200&h=200&fit=crop",
    rating: 4.6,
    isOtc: true,
    unit: "Strip of 10 tablets",
    category: "Allergy",
    description: "Antihistamine for allergic rhinitis and urticaria"
  },
  {
    id: "7",
    name: "Vitamin C 1000",
    genericName: "Ascorbic Acid 1000mg",
    price: 185,
    mrp: 250,
    image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=200&h=200&fit=crop",
    rating: 4.9,
    isOtc: true,
    unit: "Bottle of 60 tablets",
    category: "Vitamins",
    description: "Immune system support and antioxidant"
  },
  {
    id: "8",
    name: "Digene Gel",
    genericName: "Antacid Gel",
    price: 75,
    mrp: 95,
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3bc536b2?w=200&h=200&fit=crop",
    rating: 4.5,
    isOtc: true,
    unit: "200ml Bottle",
    category: "Acidity & Gas",
    description: "Relief from acidity, heartburn and gas"
  },
  {
    id: "9",
    name: "Volini Spray",
    genericName: "Diclofenac Spray",
    price: 185,
    mrp: 225,
    image: "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?w=200&h=200&fit=crop",
    rating: 4.7,
    isOtc: true,
    unit: "100ml Spray",
    category: "Body Pain",
    description: "Fast pain relief for muscles and joints"
  },
  {
    id: "10",
    name: "Benadryl Cough Syrup",
    genericName: "Diphenhydramine",
    price: 95,
    mrp: 120,
    image: "https://images.unsplash.com/photo-1603807008857-ad66b70431aa?w=200&h=200&fit=crop",
    rating: 4.4,
    isOtc: true,
    unit: "100ml Bottle",
    category: "Cold & Cough",
    description: "Relief from dry cough and throat irritation"
  },
  {
    id: "11",
    name: "Omez 20",
    genericName: "Omeprazole 20mg",
    price: 55,
    mrp: 70,
    image: "https://images.unsplash.com/photo-1559058789-672da06263d8?w=200&h=200&fit=crop",
    rating: 4.6,
    isOtc: true,
    unit: "Strip of 10 capsules",
    category: "Acidity & Gas",
    description: "Reduces stomach acid production"
  },
  {
    id: "12",
    name: "Brufen 400",
    genericName: "Ibuprofen 400mg",
    price: 32,
    mrp: 45,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=200&h=200&fit=crop",
    rating: 4.5,
    isOtc: true,
    unit: "Strip of 10 tablets",
    category: "Fever & Pain",
    description: "Anti-inflammatory pain relief"
  },
  {
    id: "13",
    name: "Vicks Vaporub",
    genericName: "Camphor, Menthol, Eucalyptus",
    price: 145,
    mrp: 175,
    image: "https://images.unsplash.com/photo-1612531822005-8e56cab4d499?w=200&h=200&fit=crop",
    rating: 4.7,
    isOtc: true,
    unit: "50g Jar",
    category: "Cold & Cough",
    description: "Topical cough suppressant"
  },
  {
    id: "14",
    name: "Moov Pain Cream",
    genericName: "Diclofenac Gel",
    price: 85,
    mrp: 110,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop",
    rating: 4.4,
    isOtc: true,
    unit: "50g Tube",
    category: "Body Pain",
    description: "Fast relief from back pain and muscle strain"
  },
  {
    id: "15",
    name: "Becosules Capsules",
    genericName: "Vitamin B Complex + Vitamin C",
    price: 35,
    mrp: 45,
    image: "https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?w=200&h=200&fit=crop",
    rating: 4.6,
    isOtc: true,
    unit: "Strip of 20 capsules",
    category: "Vitamins",
    description: "B-complex vitamins for overall health"
  },
  {
    id: "16",
    name: "Shelcal 500",
    genericName: "Calcium 500mg + Vitamin D3",
    price: 145,
    mrp: 185,
    image: "https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?w=200&h=200&fit=crop",
    rating: 4.7,
    isOtc: true,
    unit: "Strip of 15 tablets",
    category: "Vitamins",
    description: "Calcium supplement for bone health"
  },
];

export const categories = [
  { name: "Fever & Pain", emoji: "🌡️", items: ["Paracetamol", "Ibuprofen", "Aspirin"] },
  { name: "Cold & Cough", emoji: "🤧", items: ["Cetirizine", "Cough Syrup", "Nasal Spray"] },
  { name: "Acidity & Gas", emoji: "💊", items: ["Antacids", "Omeprazole", "Eno"] },
  { name: "Allergy", emoji: "🌿", items: ["Antihistamines", "Loratadine"] },
  { name: "Body Pain", emoji: "💪", items: ["Pain Balm", "Muscle Relaxant"] },
  { name: "Vitamins", emoji: "✨", items: ["Multivitamins", "Vitamin C", "Calcium"] },
  { name: "Homeopathy", emoji: "🌱", items: ["Rhus Tox", "Arnica", "Nux Vomica"] },
];

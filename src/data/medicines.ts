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
    image: "https://5.imimg.com/data5/SELLER/Default/2022/9/CG/TT/GW/160219148/paracetamol-500-mg-tablets.jpg",
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
    image: "https://5.imimg.com/data5/SELLER/Default/2023/3/294621037/QB/XG/LM/103975330/pan-d-capsule.jpg",
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
    image: "https://m.media-amazon.com/images/I/61qJXQK8NHL._AC_UF1000,1000_QL80_.jpg",
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
    image: "https://5.imimg.com/data5/SELLER/Default/2023/9/344849131/PB/OF/LZ/4273125/dolo-650-mg-paracetamol-tablets.jpg",
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
    image: "https://5.imimg.com/data5/SELLER/Default/2022/9/TH/DL/AW/103975330/crocin-advance-tablet.jpg",
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
    image: "https://5.imimg.com/data5/SELLER/Default/2023/4/299566677/IC/FG/GU/26aboratories/cetirizine-tablets.jpg",
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
    image: "https://m.media-amazon.com/images/I/61P7FP6bH-L._AC_UF1000,1000_QL80_.jpg",
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
    image: "https://5.imimg.com/data5/SELLER/Default/2021/5/LG/FC/NH/2829689/digene-antacid-gel.jpg",
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
    image: "https://5.imimg.com/data5/SELLER/Default/2023/3/294621037/PF/UO/RP/103975330/volini-spray.jpg",
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
    image: "https://5.imimg.com/data5/SELLER/Default/2022/12/AY/JA/BH/3097636/benadryl-dr-cough-syrup.jpg",
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
    image: "https://5.imimg.com/data5/SELLER/Default/2022/3/TU/WY/LT/149001893/omez-20-mg-capsule.jpg",
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
    image: "https://5.imimg.com/data5/SELLER/Default/2023/3/292959621/AC/OW/OG/103975330/brufen-400-tablet.jpg",
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
    image: "https://5.imimg.com/data5/SELLER/Default/2022/2/ZL/CZ/UT/145817418/vicks-vaporub-50-ml.jpg",
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
    image: "https://5.imimg.com/data5/SELLER/Default/2020/10/JU/SD/JR/114569957/moov-pain-relief-cream.jpeg",
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
    image: "https://5.imimg.com/data5/SELLER/Default/2022/9/BU/XD/RP/103975330/becosule-capsules.jpg",
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
    image: "https://5.imimg.com/data5/SELLER/Default/2022/9/BL/QT/ZE/103975330/shelcal-500-tablet.jpg",
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

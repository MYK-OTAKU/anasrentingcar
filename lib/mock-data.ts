import type { Car, Review } from "./types"

export const mockCars: Car[] = [
  {
    id: "1",
    brand: "Renault",
    model: "Clio",
    category: "citadine",
    seats: 5,
    transmission: "manual",
    fuel_type: "essence",
    price_per_day: 350,
    description: "Compacte et économique, idéale pour la ville.",
    image_url: "/renault-clio-white-compact-car.jpg",
    available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    brand: "Peugeot",
    model: "3008",
    category: "suv",
    seats: 5,
    transmission: "automatic",
    fuel_type: "diesel",
    price_per_day: 650,
    description: "SUV spacieux et confortable pour toute la famille.",
    image_url: "/peugeot-3008-suv-gray.jpg",
    available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    brand: "Mercedes",
    model: "Classe C",
    category: "berline",
    seats: 5,
    transmission: "automatic",
    fuel_type: "diesel",
    price_per_day: 950,
    description: "Élégance et confort pour vos déplacements professionnels.",
    image_url: "/mercedes-c-class-black-sedan-luxury.jpg",
    available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    brand: "Citroën",
    model: "C3",
    category: "citadine",
    seats: 5,
    transmission: "manual",
    fuel_type: "essence",
    price_per_day: 300,
    description: "Petite citadine parfaite pour les trajets quotidiens.",
    image_url: "/citroen-c3-orange-compact.jpg",
    available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    brand: "Renault",
    model: "Kangoo",
    category: "utilitaire",
    seats: 2,
    transmission: "manual",
    fuel_type: "diesel",
    price_per_day: 450,
    description: "Utilitaire pratique pour vos déménagements et transports.",
    image_url: "/renault-kangoo-white-van-utility.jpg",
    available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    brand: "Tesla",
    model: "Model 3",
    category: "berline",
    seats: 5,
    transmission: "automatic",
    fuel_type: "electric",
    price_per_day: 850,
    description: "Berline électrique performante et écologique.",
    image_url: "/tesla-model-3-white-electric-sedan.jpg",
    available: true,
    created_at: new Date().toISOString(),
  },
]

export const mockReviews: Review[] = [
  {
    id: "1",
    customer_name: "Fatima Z.",
    rating: 5,
    comment: "Service impeccable ! Voiture propre et en parfait état. Je recommande vivement.",
    approved: true,
    created_at: "2024-11-15T10:00:00Z",
  },
  {
    id: "2",
    customer_name: "Mohammed A.",
    rating: 4,
    comment: "Très bonne expérience. Prix compétitifs et équipe sympathique.",
    approved: true,
    created_at: "2024-11-10T14:30:00Z",
  },
  {
    id: "3",
    customer_name: "Sara B.",
    rating: 5,
    comment: "Location sans souci du début à la fin. Merci YR Location !",
    approved: true,
    created_at: "2024-11-05T09:15:00Z",
  },
  {
    id: "4",
    customer_name: "Youssef M.",
    rating: 4,
    comment: "Bon rapport qualité-prix. La Peugeot 3008 était parfaite pour notre voyage en famille.",
    approved: true,
    created_at: "2024-10-28T16:45:00Z",
  },
]

export const faqItems = [
  {
    question: "Quels documents sont nécessaires pour louer une voiture ?",
    answer:
      "Vous devez présenter un permis de conduire valide (depuis au moins 1 an), une pièce d'identité en cours de validité (CIN ou passeport) et une carte bancaire au nom du conducteur principal.",
  },
  {
    question: "Quel est l'âge minimum pour louer ?",
    answer:
      "L'âge minimum est de 21 ans avec un permis de conduire obtenu depuis au moins 2 ans. Pour certaines catégories de véhicules (premium, SUV), l'âge minimum peut être de 25 ans.",
  },
  {
    question: "Comment fonctionne la caution ?",
    answer:
      "Une caution est prélevée sur votre carte bancaire au moment de la prise en charge du véhicule. Elle varie selon la catégorie du véhicule (de 3000 DH à 15000 DH) et est restituée sous 7 jours ouvrés après le retour du véhicule en bon état.",
  },
  {
    question: "Le carburant est-il inclus ?",
    answer:
      "Le véhicule est fourni avec le plein de carburant. Vous devez le restituer avec le même niveau de carburant. En cas contraire, des frais de remplissage seront facturés.",
  },
  {
    question: "Puis-je modifier ou annuler ma réservation ?",
    answer:
      "Oui, vous pouvez modifier ou annuler votre réservation jusqu'à 48h avant la date de prise en charge sans frais. Au-delà, des frais peuvent s'appliquer.",
  },
  {
    question: "L'assurance est-elle comprise ?",
    answer:
      "Une assurance responsabilité civile est incluse dans toutes nos locations. Des options d'assurance complémentaire (vol, bris de glace, tous risques) sont disponibles.",
  },
  {
    question: "Y a-t-il une limite de kilométrage ?",
    answer:
      "Nos forfaits incluent généralement 200 km/jour. Des forfaits kilométrage illimité sont disponibles pour les locations longue durée.",
  },
  {
    question: "Proposez-vous la livraison du véhicule ?",
    answer:
      "Oui, nous proposons un service de livraison et de récupération du véhicule à domicile ou à l'aéroport (Mohammed V, Rabat-Salé, Marrakech Menara), moyennant des frais supplémentaires selon la distance.",
  },
]

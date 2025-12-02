-- Seed data for YR Location
-- Run this script to populate initial data

-- Insert sample cars
INSERT INTO cars (brand, model, category, seats, transmission, fuel_type, price_per_day, description, image_url, available) VALUES
  ('Renault', 'Clio', 'citadine', 5, 'manual', 'essence', 35.00, 'Compacte et économique, idéale pour la ville. Faible consommation et facile à garer.', '/renault-clio-white-compact-car.jpg', true),
  ('Peugeot', '3008', 'suv', 5, 'automatic', 'diesel', 65.00, 'SUV spacieux et confortable pour toute la famille. Coffre généreux et équipements modernes.', '/peugeot-3008-suv-gray.jpg', true),
  ('Mercedes', 'Classe C', 'berline', 5, 'automatic', 'diesel', 95.00, 'Élégance et confort pour vos déplacements professionnels. Finitions haut de gamme.', '/mercedes-c-class-black-sedan-luxury.jpg', true),
  ('Citroën', 'C3', 'citadine', 5, 'manual', 'essence', 30.00, 'Petite citadine parfaite pour les trajets quotidiens. Design moderne et agile.', '/citroen-c3-orange-compact.jpg', true),
  ('Renault', 'Kangoo', 'utilitaire', 2, 'manual', 'diesel', 45.00, 'Utilitaire pratique pour vos déménagements et transports. Grand volume de chargement.', '/renault-kangoo-white-van-utility.jpg', true),
  ('Tesla', 'Model 3', 'berline', 5, 'automatic', 'electric', 85.00, 'Berline électrique performante et écologique. Autonomie exceptionnelle et technologie avancée.', '/tesla-model-3-white-electric-sedan.jpg', true),
  ('Volkswagen', 'Golf', 'citadine', 5, 'manual', 'essence', 40.00, 'Compacte polyvalente, parfaite en ville comme sur route. Confort et fiabilité allemande.', '/placeholder.svg?height=300&width=400', true),
  ('BMW', 'X3', 'suv', 5, 'automatic', 'diesel', 80.00, 'SUV premium avec excellent comportement routier. Luxe et sportivité réunis.', '/placeholder.svg?height=300&width=400', true),
  ('Fiat', '500', 'citadine', 4, 'manual', 'essence', 28.00, 'Icône du style italien, parfaite pour la ville. Compacte et pleine de caractère.', '/placeholder.svg?height=300&width=400', true),
  ('Ford', 'Transit', 'utilitaire', 3, 'manual', 'diesel', 55.00, 'Utilitaire spacieux pour les gros chargements. Idéal pour déménagement ou transport professionnel.', '/placeholder.svg?height=300&width=400', true)
ON CONFLICT DO NOTHING;

-- Insert sample approved reviews
INSERT INTO reviews (customer_name, rating, comment, approved, created_at) VALUES
  ('Marie L.', 5, 'Service impeccable ! Voiture propre et en parfait état. Je recommande vivement YR Location pour la qualité de leur service.', true, NOW() - INTERVAL '15 days'),
  ('Pierre D.', 4, 'Très bonne expérience. Prix compétitifs et équipe sympathique. La Peugeot 3008 était parfaite pour notre voyage.', true, NOW() - INTERVAL '20 days'),
  ('Sophie M.', 5, 'Location sans souci du début à la fin. Merci YR Location ! Véhicule propre et bien entretenu.', true, NOW() - INTERVAL '25 days'),
  ('Jean-Marc B.', 4, 'Bon rapport qualité-prix. La Mercedes était parfaite pour mon déplacement professionnel.', true, NOW() - INTERVAL '30 days'),
  ('Camille R.', 5, 'Excellente agence ! Personnel accueillant et véhicule impeccable. Je reviendrai sans hésiter.', true, NOW() - INTERVAL '35 days'),
  ('Thomas L.', 4, 'Service rapide et efficace. Le Kangoo était idéal pour mon déménagement. Merci !', true, NOW() - INTERVAL '40 days')
ON CONFLICT DO NOTHING;

-- Insert sample contact requests for admin testing
INSERT INTO contact_requests (name, email, phone, subject, message, status, created_at) VALUES
  ('Alice Martin', 'alice.martin@email.com', '06 12 34 56 78', 'reservation', 'Bonjour, je souhaite réserver une Renault Clio du 15 au 20 décembre. Merci de me confirmer la disponibilité.', 'new', NOW() - INTERVAL '2 days'),
  ('Bernard Dupont', 'b.dupont@entreprise.fr', '01 98 76 54 32', 'devis', 'Nous aurions besoin d''un devis pour la location longue durée d''un véhicule utilitaire (3 mois). Merci.', 'in_progress', NOW() - INTERVAL '5 days'),
  ('Claire Petit', 'claire.petit@gmail.com', NULL, 'info', 'Est-ce possible de récupérer le véhicule à l''aéroport CDG ? Quels sont les frais supplémentaires ?', 'done', NOW() - INTERVAL '10 days')
ON CONFLICT DO NOTHING;

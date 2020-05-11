db.place.insertOne({
  name: "10ème arrondissement",
  geometry: {
    type: "Point",
    coordinates: [2.3594856262207027, 48.876288295456625],
  },
});

db.place.insertOne({
  name: "14ème arrondissement",
  geometry: {
    type: "Point",
    coordinates: [2.326784133911133, 48.83342459901093],
  },
});

db.place.insertOne({
  name: "8ème arrondissement",
  geometry: {
    type: "Point",
    coordinates: [2.3169994354248047, 48.87758662245016],
  },
});

// On insère un 4 ème lieu
db.place.insertOne({
  name: "17ème arrondissement",
  geometry: {
    type: "Point",
    coordinates: [2.3224925994873047, 48.88492435891923],
  },
});

// Création d'un index pour geometry
db.place.createIndex({ geometry: "2dsphere" });

// Ici on cherche à voir quel lieu est le plus proche du 17 ème arrondissement
// On cherche dans un premier temps dans un rayon de 2000 m pour voir le nombre de lieu présent
// Et ensuite on réduit le rayon pour trouver un seul lieu en plus du 17 ème arrondissement
// Ici on trouve directement le 8 ème arrondissement
db.place.find({
  geometry: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [2.3224925994873047, 48.88492435891923],
      },
      $maxDistance: 2000,
      $minDistance: 0,
    },
  },
});

// Recherche des lieu présent dans le poygone
db.place.find({
  geometry: {
    $geoWithin: {
      $geometry: {
        type: "Polygon",
        coordinates: [
          [
            [2.3178577423095703, 48.89220458715174],
            [2.3054122924804688, 48.87792531090653],
            [2.3219776153564453, 48.873239917037544],
            [2.333908081054687, 48.887746278609676],
            [2.3178577423095703, 48.89220458715174],
          ],
        ],
      },
    },
  },
});

// Centre du rayon de recherche
db.place.insertOne({
  name: "1er arrondissement",
  geometry: {
    type: "Point",
    coordinates: [2.334766387939453, 48.864827687257964],
  },
});

// Retourne tout les points dans un rayon de 2400m
db.place.find({
  geometry: {
    $nearSphere: {
      $geometry: {
        type: "Point",
        coordinates: [2.334766387939453, 48.864827687257964],
      },
      $maxDistance: 2400,
      $minDistance: 0,
    },
  },
});

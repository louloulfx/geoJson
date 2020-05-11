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

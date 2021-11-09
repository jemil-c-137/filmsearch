const GenresEnum = {
  Drama: 'Drama',
  Cartoon: 'Cartoon',
  Comedy: 'Comedy',
  Fantasy: 'Fantasy',
  SciFi: 'Sci-Fi',
  Criminal: 'Criminal',
};

const ActorsEnum = {
  JustinRoiland: 'Justin Roiland',
  DanHarmon: 'Dan Harmon',
  JohnTravolta: 'John Travolta',
  SamuelLJackson: 'Samuel L. Jackson',
  BruceWillis: 'Bruce Willis',
  UmaTurman: 'Uma Thurman',
  ALPacino: 'Al PAcino',
  ChrisODonnell: "Chris O'Donnell",
};

const directorsEnum = {
  QuentinTarantino: 'Quentin Tarantino',
  JustinRoiland: ActorsEnum.JustinRoiland,
  MartinBrest: 'Martin Brest',
};

const persons = [
  {
    id: '501',
    name: 'Justin Roiland',
    age: 41,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Justin_Roiland_%2836434635662%29.jpg/800px-Justin_Roiland_%2836434635662%29.jpg',
    slug: 'justin-roiland',
    bio: "Martin Justin Roiland is an American voice actor, animator, writer, producer, and director. He is best known as the co-creator of Adult Swim's Rick and Morty and its subsequent franchise, on which he voices the show's title characters Rick Sanchez and Morty Smith, and as the co-creator of Hulu's Solar Opposites, in which he voices the main character, Korvo. He has also played Earl of Lemongrab on Adventure Time and Blendin Blandin on Gravity Falls. He founded the animation studio Justin Roiland's Solo Vanity Card Productions! and the video game studio Squanch Games.",
  },
  {
    id: '502',
    name: directorsEnum.QuentinTarantino,
    slug: 'quentin-tarantino',
    age: 58,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Quentin_Tarantino_by_Gage_Skidmore.jpg/1200px-Quentin_Tarantino_by_Gage_Skidmore.jpg',
    bio: 'Quentin Jerome Tarantino is an American film director, screenwriter, producer, author, film critic, and actor. His films are characterized by nonlinear storylines, dark humor, stylized violence, extended dialogue, ensemble casts, references to popular culture, alternate history, and neo-noir.',
  },
  {
    id: '503',
    name: directorsEnum.MartinBrest,
    slug: 'martin-brest',
    age: 70,
    image:
      'https://m.media-amazon.com/images/M/MV5BOTRlN2UwNTEtNTI3OS00ZmYwLTk0NzktODViNjUxZjdjYTZlXkEyXkFqcGdeQXVyMjA0MTYzNzI@._V1_.jpg',
  },
  {
    id: '504',
    name: ActorsEnum.SamuelLJackson,
    slug: 'samuel-l-jackson',
    age: 72,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Samuel_L._Jackson_2019_by_Glenn_Francis.jpg/800px-Samuel_L._Jackson_2019_by_Glenn_Francis.jpg',
    bio: 'is an American actor and producer. Widely regarded as one of the most popular actors of his generation, the films in which he has appeared have collectively grossed over $27 billion worldwide, making him the highest-grossing actor of all time (when cameo appearances are excluded).',
  },
  {
    id: '505',
    name: ActorsEnum.DanHarmon,
    slug: 'dan-harmon',
    age: 48,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Dan_Harmon_%2814790686643%29.jpg/1024px-Dan_Harmon_%2814790686643%29.jpg',
    bio: 'is an American writer, producer, actor and comedian',
  },
  {
    id: '506',
    name: ActorsEnum.JohnTravolta,
    slug: 'john-travolta',
    age: 67,
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/John_Travolta_Cannes_2018_%28cropped%29.jpg',
    bio: 'John Travolta is an American actor, singer and prominent Scientologist.',
  },
  {
    id: '507',
    name: ActorsEnum.BruceWillis,
    slug: 'bruce-willis',
    age: 66,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Bruce_Willis_by_Gage_Skidmore_3.jpg/800px-Bruce_Willis_by_Gage_Skidmore_3.jpg',
    bio: 'Bruce Willis s an American actor. Born in Germany to a German mother and American father, Willis moved to the U.S. with his family when he was two years old. His career began on the off-Broadway stage in the 1970s.',
  },
  {
    id: '508',
    name: ActorsEnum.UmaTurman,
    slug: 'uma-thurman',
    age: 51,
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Uma_Thurman_Cannes_2017_%28cropped%29.jpg',
    bio: 'Uma Thurman is an American actress, writer, producer and model..',
  },
  {
    id: '509',
    name: ActorsEnum.ALPacino,
    slug: 'al-pacino',
    age: 81,
    image: 'https://pyxis.nymag.com/v1/imgs/bc9/ccb/936534d0b82b77cf0ffbac92010ee38ea3-06-al-pacino.2x.h600.w512.jpg',
    bio: 'Al Pacino is an American actor and filmmaker. In a career spanning over five decades, he has received many awards and nominations, including an Academy Award, two Tony Awards, and two Primetime Emmy Awards',
  },
  {
    id: '510',
    name: ActorsEnum.ChrisODonnell,
    slug: 'chris-o-donnell',
    age: 51,
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Chris_ODonnell_Max_Payne_2008.jpg',
    bio: "Chris O'Donnell is an American actor and former model",
  },
];

const genres = [
  {
    id: '201',
    name: GenresEnum.SciFi,
    slug: 'sci-fi',
  },
  {
    id: '202',
    name: GenresEnum.Drama,
    slug: 'drama',
  },
  {
    id: '203',
    name: GenresEnum.Criminal,
    slug: 'criminal',
  },
  {
    id: '204',
    name: GenresEnum.Comedy,
    slug: 'comedy',
  },
  {
    id: '205',
    name: GenresEnum.Cartoon,
    slug: 'cartoon',
  },
  {
    id: '206',
    name: GenresEnum.Fantasy,
    slug: 'fantasy',
  },
];

const directors = [
  {
    id: '301',
    name: directorsEnum.QuentinTarantino,
    slug: 'quentin-tarantino',
    age: 58,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Quentin_Tarantino_by_Gage_Skidmore.jpg/1200px-Quentin_Tarantino_by_Gage_Skidmore.jpg',
    bio: 'Quentin Jerome Tarantino is an American film director, screenwriter, producer, author, film critic, and actor. His films are characterized by nonlinear storylines, dark humor, stylized violence, extended dialogue, ensemble casts, references to popular culture, alternate history, and neo-noir.',
  },
  {
    id: '302',
    name: directorsEnum.JustinRoiland,
    slug: 'justin-roiland',
    age: 41,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Justin_Roiland_%2836434635662%29.jpg/800px-Justin_Roiland_%2836434635662%29.jpg',
    bio: "Martin Justin Roiland is an American voice actor, animator, writer, producer, and director. He is best known as the co-creator of Adult Swim's Rick and Morty and its subsequent franchise, on which he voices the show's title characters Rick Sanchez and Morty Smith, and as the co-creator of Hulu's Solar Opposites, in which he voices the main character, Korvo. He has also played Earl of Lemongrab on Adventure Time and Blendin Blandin on Gravity Falls. He founded the animation studio Justin Roiland's Solo Vanity Card Productions! and the video game studio Squanch Games.",
  },
  {
    id: '303',
    name: directorsEnum.MartinBrest,
    slug: 'martin-brest',
    age: 70,
    image:
      'https://m.media-amazon.com/images/M/MV5BOTRlN2UwNTEtNTI3OS00ZmYwLTk0NzktODViNjUxZjdjYTZlXkEyXkFqcGdeQXVyMjA0MTYzNzI@._V1_.jpg',
  },
];

const actors = [
  {
    id: '401',
    name: ActorsEnum.SamuelLJackson,
    slug: 'samuel-l-jackson',
    age: 72,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Samuel_L._Jackson_2019_by_Glenn_Francis.jpg/800px-Samuel_L._Jackson_2019_by_Glenn_Francis.jpg',
    bio: 'is an American actor and producer. Widely regarded as one of the most popular actors of his generation, the films in which he has appeared have collectively grossed over $27 billion worldwide, making him the highest-grossing actor of all time (when cameo appearances are excluded).',
  },
  {
    id: '402',
    name: ActorsEnum.DanHarmon,
    slug: 'dan-harmon',
    age: 48,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Dan_Harmon_%2814790686643%29.jpg/1024px-Dan_Harmon_%2814790686643%29.jpg',
    bio: 'is an American writer, producer, actor and comedian',
  },
  {
    id: '403',
    name: ActorsEnum.JohnTravolta,
    slug: 'john-travolta',
    age: 67,
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/John_Travolta_Cannes_2018_%28cropped%29.jpg',
    bio: 'John Travolta is an American actor, singer and prominent Scientologist.',
  },
  {
    id: '404',
    name: directorsEnum.JustinRoiland,
    slug: 'justin-roiland',
    age: 41,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Justin_Roiland_%2836434635662%29.jpg/800px-Justin_Roiland_%2836434635662%29.jpg',
    bio: "Martin Justin Roiland is an American voice actor, animator, writer, producer, and director. He is best known as the co-creator of Adult Swim's Rick and Morty and its subsequent franchise, on which he voices the show's title characters Rick Sanchez and Morty Smith, and as the co-creator of Hulu's Solar Opposites, in which he voices the main character, Korvo. He has also played Earl of Lemongrab on Adventure Time and Blendin Blandin on Gravity Falls. He founded the animation studio Justin Roiland's Solo Vanity Card Productions! and the video game studio Squanch Games.",
  },
  {
    id: '405',
    name: ActorsEnum.BruceWillis,
    slug: 'bruce-willis',
    age: 66,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Bruce_Willis_by_Gage_Skidmore_3.jpg/800px-Bruce_Willis_by_Gage_Skidmore_3.jpg',
    bio: 'Bruce Willis s an American actor. Born in Germany to a German mother and American father, Willis moved to the U.S. with his family when he was two years old. His career began on the off-Broadway stage in the 1970s.',
  },
  {
    id: '406',
    name: ActorsEnum.UmaTurman,
    slug: 'uma-thurman',
    age: 51,
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Uma_Thurman_Cannes_2017_%28cropped%29.jpg',
    bio: 'Uma Thurman is an American actress, writer, producer and model..',
  },
  {
    id: '407',
    name: ActorsEnum.ALPacino,
    slug: 'al-pacino',
    age: 81,
    image: 'https://pyxis.nymag.com/v1/imgs/bc9/ccb/936534d0b82b77cf0ffbac92010ee38ea3-06-al-pacino.2x.h600.w512.jpg',
    bio: 'Al Pacino is an American actor and filmmaker. In a career spanning over five decades, he has received many awards and nominations, including an Academy Award, two Tony Awards, and two Primetime Emmy Awards',
  },
  {
    id: '408',
    name: ActorsEnum.ChrisODonnell,
    slug: 'chris-o-donnell',
    age: 51,
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Chris_ODonnell_Max_Payne_2008.jpg',
    bio: "Chris O'Donnell is an American actor and former model",
  },
];

const RolesEnum = {
  director: 'Director',
  actor: 'Actor',
  operator: 'Operator',
  producer: 'Producer',
  screenwriter: 'Screenwriter',
};

const films = [
  {
    id: '101',
    title: 'Rick and Morty',
    director: directorsEnum.JustinRoiland,
    genre: [GenresEnum.Cartoon, GenresEnum.Comedy, GenresEnum.SciFi],
    year: 2013,
    rate: 9.01,
    description:
      "Rick is a scientist who has moved in with the family of his daughter Beth, a veterinarian and equine cardiac surgeon. He spends most of his time working on various high-tech projects and taking his young grandson Morty (and later his granddaughter Summer) on dangerous, fantastical adventures throughout their own and other universes. Compounded with Morty's already odd family, these events cause Morty much distress at home and school.",
    slug: 'rick-and-morty',
    duration: 23,
    actors: [ActorsEnum.JustinRoiland, ActorsEnum.DanHarmon],
    image:
      'https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_.jpg',
    tvShow: true,
    featured: true,
    crew: [
      { person: persons[0], role: RolesEnum.director },
      { person: persons[4], role: RolesEnum.actor },
      { person: persons[0], role: RolesEnum.actor },
    ],
  },
  {
    id: '102',
    title: 'Pulp Fiction',
    director: directorsEnum.QuentinTarantino,
    genre: [GenresEnum.Drama, GenresEnum.Criminal],
    year: 1994,
    rate: 8.6,
    description:
      'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    slug: 'pulp-fiction',
    duration: 154,
    actors: [ActorsEnum.UmaTurman, ActorsEnum.JohnTravolta, ActorsEnum.SamuelLJackson],
    image: 'https://images.pathe-thuis.nl/25479_450x640.jpg',

    crew: [
      { person: persons[1], role: RolesEnum.director },
      { person: persons[7], role: RolesEnum.actor },
      { person: persons[5], role: RolesEnum.actor },
      { person: persons[6], role: RolesEnum.actor },
      { person: persons[3], role: RolesEnum.actor },
    ],
  },
  {
    id: '103',
    title: 'Scent of Woman',
    director: directorsEnum.MartinBrest,
    genre: [GenresEnum.Drama],
    year: 1992,
    rate: 8.4,
    description:
      "A prep school student needing money agrees to 'babysit' a blind man, but the job is not at all what he anticipated.",
    slug: 'scent-of-woman',
    duration: 156,
    actors: [ActorsEnum.ALPacino, ActorsEnum.ChrisODonnell],
    image:
      'https://m.media-amazon.com/images/M/MV5BZTM3ZjA3NTctZThkYy00ODYyLTk2ZjItZmE0MmZlMTk3YjQwXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
    crew: [
      { person: persons[2], role: RolesEnum.director },
      { person: persons[9], role: RolesEnum.actor },
      { person: persons[8], role: RolesEnum.actor },
    ],
  },
];

module.exports = {
  films,
  actors,
  genres,
  directors,
  persons,
  RolesEnum
};

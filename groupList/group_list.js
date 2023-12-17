const data = {
    get: "teams",
    parameters: {
      league: "39",
      season: "2023",
    },
    errors: [],
    results: 20,
    paging: {
      current: 1,
      total: 1,
    },
    response: [
      {
        team: {
          id: 33,
          name: "Manchester United",
          code: "MUN",
          country: "England",
          founded: 1878,
          national: false,
          logo: "https://media-4.api-sports.io/football/teams/33.png",
        },
        venue: {
          id: 556,
          name: "Old Trafford",
          address: "Sir Matt Busby Way",
          city: "Manchester",
          capacity: 76212,
          surface: "grass",
          image: "https://media-4.api-sports.io/football/venues/556.png",
        },
      },
      // ... (other team and venue objects)
    ],
  };
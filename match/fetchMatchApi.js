const axios = require('axios');
const leagueId = 39; // Replace with your actual league ID
const apiKey = 'e67d254b5f3aea256bdce5a4a1b43224'; // Replace with your actual API key
const Match=require('../model/premieldgeMatch');
const apiUrl = 'https://v3.football.api-sports.io/fixtures';

const config = {
  method: 'GET',
  url: apiUrl,
  params: { league: leagueId, season: '2023',last:99},
  headers: {
    'x-rapidapi-key': apiKey,
  },
};
async function matchApi(){
  await  axios(config)
  .then((response) => {
    // console.log(response.data.response)
    const data=response.data.response;
    const extractedFixtureInfo = data.map(async (fixture) => {
            const check=await fetchFicture(fixture.fixture.id)
            if(check===null){
                const data= {
                    fixtureId: fixture.fixture.id,
                    fixtureDate: fixture.fixture.date,
                    name: fixture.teams.home.name,
                    
                    away: fixture.teams.away.name,
                    
                  };
                  Match(data).save()
            }
            
        
          });
    return response.data.response;
  })
  .catch((error) => {
    console.error(error);
  });
}
async function fetchFicture(fixtureId){
    const result=Match.findOne({fixtureId:fixtureId});
    return result
 }
module.exports={matchApi}
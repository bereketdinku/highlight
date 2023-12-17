const Match=require('../model/premieldgeMatch')
const axios = require('axios');
const { matchApi } = require('./fetchMatchApi');

const apiUrl = 'https://v3.football.api-sports.io/fixtures';
const apiKey = 'XxXxXxXxXxXxXxXxXxXxXxXx'; 

  async function storematch(){
    const response = await matchApi()
    console.log(response)
    // const extractedFixtureInfo = response.map(async (fixture) => {
    //     const check=await fetchFicture(fixture.fixture.id)
    //     if(check===null){
    //         const data= {
    //             fixtureId: fixture.fixture.id,
    //             fixtureDate: fixture.fixture.date,
    //             name: fixture.teams.home.name,
                
    //             away: fixture.teams.away.name,
                
    //           };
    //           Match(data).save()
    //     }
        
    
    //   });
  }
 async function fetchFicture(fictureId){
    const result=Match.findOne({fictureId});
    return result
 }
  module.exports={storematch}
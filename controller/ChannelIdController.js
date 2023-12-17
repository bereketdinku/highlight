const { channelUrls } = require('../const');
const ChannelId=require('../model/ChannelId')
const url = require('url');
const store=(req,res)=>{
    const {name,channelId}=req.params;
    const data={
        name:name,
        channelId:channelId
    }
    ChannelId(data).save()
}


    function extractClubInfo(channelUrl) {
        const parsedUrl = new URL(channelUrl);
        const pathSegments = parsedUrl.pathname.split('/');
        const channelId = pathSegments[pathSegments.indexOf('channel') + 1];
      
        const clubMap = {
          "UCpryVRk_VDudG8SHXgWcG0w": "Arsenal",
          "UCU2PacFf99vhb3hNiYDmxww": "Chelsea",
          "UC9LQwHZoucFT94I2h6JOcjw": "Liverpool",
          "cUCkzCjdRMrW2vXLx8mvPVLdQ": "Manchester City",
          "UC6yW44UGJJBvYTlfC7CRg2Q": "Manchester United",
          "UCEg25rdRZXg32iwai6N6l0w": "Tottenham Hotspur",
          "UCICNP0mvtr0prFwGUQIABfQ": "Aston Villa",
          "UCeOCuVSSweaEj6oVtJZEKQw": "AFC Bournemouth",
          "UCAalMUm3LIf504ItA3rqfug": "Brentford",
          "UCf-cpC9WAdOsas19JHipukA": "Brighton & Hove Albion",
          "UCWB9N0012fG6bGyj486Qxmg": "Crystal Palace",
          "UCtK4QAczAN2mt2ow_jlGinQ": "Everton",
          "UC2VLfz92cTT8jHIFOecC-LA": "Fulham",
          "UCyQcJHDN4uYfPa1DHzKVSnw": "Leeds United",
          "UCBkRQtxofyXr09mWtgoUUqw": "Leicester City",
          "UCywGl_BPp9QhD0uAcP2HsJw": "Newcastle United",
          "UCyAxjuAr8f_BFDGCO3Htbxw": "Nottingham Forest",
          "UCxvXjfiIHQ2O6saVx_ZFqnw": "Southampton",
          "UCCNOsmurvpEit9paBOzWtUg": "West Ham United",
          "UCQ7Lqg5Czh5djGK6iOG53KQ": "Wolves"
        };
      
        const clubName = clubMap[channelId] || "Unknown Club";
      
        return { clubName, channelId };
      }
      function storeChannel(){
        channelUrls.forEach((url) => {
                const { clubName, channelId } = extractClubInfo(url);
                // console.log(`${clubName}: ${channelId}`);
                const data={
                    name:clubName,
                    channelId:channelId
                }
                ChannelId(data).save()
              });
      }
  // Extract and print club names and channelIds
//   channelUrls.forEach((url) => {
//     const { clubName, channelId } = extractClubInfo(url);
//     console.log(`${clubName}: ${channelId}`);
//   });

module.exports={store,extractClubInfo,storeChannel}
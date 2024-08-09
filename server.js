const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Use your actual bot token and guild ID here
const DISCORD_BOT_TOKEN = 'MTI3MTM5NTUzNTU1ODgwMzQ5Nw.Gqp_aN.-a25vTBG4xRcZWOhLnMYXYa2Bz_wH9hn5y46i4';
const GUILD_ID = '1265624772780228619';

app.get('/members', async (req, res) => {
    try {
        let members = [];
        let url = `https://discord.com/api/v10/guilds/${GUILD_ID}/members?limit=1000`;
        
        while (url) {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bot ${DISCORD_BOT_TOKEN}`
                }
            });
            
            members = members.concat(response.data);
            
            // Check if there are more members to fetch
            if (response.headers['x-next'] && response.headers['x-next'] !== 'null') {
                url = response.headers['x-next'];
            } else {
                url = null;
            }
        }
        
        res.json(members);
    } catch (error) {
        res.status(500).send('Error fetching members');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

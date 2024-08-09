const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const DISCORD_BOT_TOKEN = 'YOUR_BOT_TOKEN';
const GUILD_ID = 'YOUR_GUILD_ID';

app.get('/members', async (req, res) => {
    try {
        const response = await axios.get(`https://discord.com/api/v10/guilds/${GUILD_ID}/members`, {
            headers: {
                'Authorization': `Bot ${DISCORD_BOT_TOKEN}`
            }
        });
        
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching members');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
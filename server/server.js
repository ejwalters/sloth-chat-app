const express = require('express');
const app = express();
const port = 3001;
const axios = require('axios');
var profileApiToken = "OnE2g7YLo4LqQBIKPUo5pcm73Ph7tIvJdAuy6__xZzaMKfMHmb6BSz9hO08hom4b4MpDcVKn3Gi0OKPy4gb4QsHz8_u8e7vwOsjk96yjiJfP5v2yqLqUjLk1bUltCR5G75jv2lLC9DABHccEE-5wl82dvvnSDCGe7P54GFNJ2gFD3vQPAp01nJ1_Dpjb1tQM7-kGOAqx8JxdeasC6o7dHFuIQ_Z5BfLif3b87TVHsmt0vHM0Uhf9XHqzBUavTJCSmu24kDnl_OwOX_O9lO5po8NDBZo=";
var writeKey = "eznOJ1f1AE93h0xn2ErLOTWMhYFPq6gP";
var PersonasSpace = "spa_guwfkaTcfqVerxoetnb6AS";
const anon_id = "08482335-3061-4447-88a2-6f478a5ee814";
const cors = require('cors');

app.use(cors());

app.get('/api/data', async (req, res) => {
    let new_anon_id = (anon_id.replace(/['"]+/g, ''));
    let api_url = 'https://profiles.segment.com/v1/spaces/' + PersonasSpace + '/collections/users/profiles/anonymous_id:' + new_anon_id + '/traits?limit=200';
    var hash = btoa(profileApiToken + ':');
    const headers = {
        'Authorization': 'Basic ' + hash,
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.get(api_url, { headers });
        res.json(response.data.traits);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while trying to fetch data' });
    }
    res.end();
});

app.get('/api/events', async (req, res) => {
    let new_anon_id = (anon_id.replace(/['"]+/g, ''));
    let api_url = 'https://profiles.segment.com/v1/spaces/' + PersonasSpace + '/collections/users/profiles/anonymous_id:' + new_anon_id + '/events';
    console.log("API URL -- ", api_url);
    var hash = btoa(profileApiToken + ':');
    const headers = {
        'Authorization': 'Basic ' + hash,
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.get(api_url, { headers });
        res.json(response.data);
        //console.log("Events -- ", response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while trying to fetch data' });
    }
    res.end();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
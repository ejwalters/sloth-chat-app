const express = require('express');
const app = express();
const port = 3001;
const axios = require('axios');
var profileApiToken = "t9dcWS0b-6QN03Ru_aUKqbNeef1PTwf4PbOvmpDwQI0SWxOlry3fehPlEu96RMsxr2rvDUW_qLhkkFgedHcG41ArjpoNVbnDgvmSN29yl0_k1vuKNhQQ6B-wqMZpxdPvf-tM0KIk1xRRxvzMR5-Mxjfa0OHe1vLbtif4feslQmz1WNwZJFQgbjgPYwIgn6gUcbOhApCZRxZULEhGjsGx44nvdSsRn_oLzSLyDQ6hDHDhB_cMODo0Cq7H1BrPV1sexC2yXGk0elafjFU84cdxSEKK9lw=";
var writeKey = "eznOJ1f1AE93h0xn2ErLOTWMhYFPq6gP";
var PersonasSpace = "spa_j6DSbfNS41FxuKXLfotDLZ";
const anon_id = "a36e6c21-86f4-4489-998d-3fe3cd637edb";
const cors = require('cors');

app.use(cors());

//Fetch Traits From Profile API
app.get('/api/data', async (req, res) => {
    let new_anon_id = (anon_id.replace(/['"]+/g, ''));
    const user = JSON.parse(req.headers['user']); // parse the user information from the headers
    console.log("USER -- ", user);
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

//Fetch Events From Profile API
app.get('/api/events', async (req, res) => {
    let new_anon_id = (anon_id.replace(/['"]+/g, ''));
    let api_url = 'https://profiles.segment.com/v1/spaces/' + PersonasSpace + '/collections/users/profiles/anonymous_id:' + new_anon_id + '/events?limit=10';
    var hash = btoa(profileApiToken + ':');
    const headers = {
        'Authorization': 'Basic ' + hash,
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.get(api_url, { headers });
        const responseData = response.data;
        res.json(responseData.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while trying to fetch data' });
    }
    res.end();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
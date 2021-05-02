let express = require('express');
let app = express();
require('dotenv').config();

var listener = app.listen(process.env.PORT, function () {
    console.log(process.env.PORT);
    console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/api/:raw_date', (req, res) => {
    let raw_date = req.params.raw_date;

    if (/\d{5,}/.test(raw_date)) {
        const unixTimestamp = parseInt(raw_date);

        res.json({ unix: unixTimestamp, utc: new Date(unixTimestamp).toUTCString() });
    } else {
        let date = new Date(raw_date);

        if (date.toString() === "Invalid Date") {
            res.json({ error: "Invalid Date" });
        } else {
            res.json({ unix: date.valueOf(), utc: date.toUTCString() });
        }
    }
});

app.get('/api', (req, res) => {
    res.json({ unix: Date.now(), utc: Date() });
});
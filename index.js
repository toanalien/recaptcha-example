/**
 * Created by toanalien on 4/8/2016.
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    reCAPTCHA = require('recaptcha2');

recaptcha = new reCAPTCHA({
    siteKey: '',
    secretKey: ''
});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'form.html'));
});

function submitForm(req, res) {
    recaptcha.validateRequest(req)
        .then(function () {
            // validated and secure
            res.json({formSubmit: true})
        })
        .catch(function (errorCodes) {
            // invalid
            res.json({formSubmit: false, errors: recaptcha.translateErrors(errorCodes)});
        });
}

app.post('/', function (req, res) {
    submitForm(req, res);
});

app.listen(3000);
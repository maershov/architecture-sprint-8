const express = require('express');
const cors = require('cors');
const Keycloak = require('keycloak-connect');

const {
    PORT = 3000,
    CORS_ORIGIN,
    KEYCLOAK_URL,
    KEYCLOAK_CLIENT_ID,
    KEYCLOAK_REALM,
    KEYCLOAK_SECRET
} = process.env;

const app = express();

const keycloakConfig = {
    clientId: KEYCLOAK_CLIENT_ID,
    secret: KEYCLOAK_SECRET,
    serverUrl: KEYCLOAK_URL,
    realm: KEYCLOAK_REALM,
    bearerOnly: true,
    public: true
};

const keycloak = new Keycloak(
    {},
    keycloakConfig
);

app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
}));

app.use(keycloak.middleware());

app.get('/reports', keycloak.protect((token, _) => {
    return token.hasRole('realm:prothetic_user')
}), (req, res) => {
    try {
        res.json("Report successfully generated: " + Math.random());
    } catch (e) {
        console.error(e);
        res.status(500);
        res.send();
    }
});


async function run() {
    return new Promise((resolve) => {
        app.listen(PORT, () => {
            resolve();
            console.log(`Example app listening on port ${PORT}`);
        });
    })
}

module.exports = run;

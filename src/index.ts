import dotenv from "dotenv";
import express from "express";
import config from "./config";
dotenv.config();
const app = express();

app.post("/webhook", (req, res) => {
	let body = req.body;
	console.log(`\u{1F7EA} Received webhook:`);
	console.dir(body, { depth: null });
	res.sendStatus(200);
});

app.get("/messaging-webhook", (req, res) => {
	// Parse the query params
	let mode = req.query["hub.mode"];
	let token = req.query["hub.verify_token"];
	let challenge = req.query["hub.challenge"];

	// Check if a token and mode is in the query string of the request
	if (mode && token) {
		// Check the mode and token sent is correct
		if (mode === "subscribe" && token === config.verifyToken) {
			// Respond with the challenge token from the request
			console.log("WEBHOOK_VERIFIED");
			res.status(200).send(challenge);
		} else {
			// Respond with '403 Forbidden' if verify tokens do not match
			res.sendStatus(403);
		}
	}
});

app.listen(config.port, () => {
	console.log(`Server is running on port ${config.port}`);
});

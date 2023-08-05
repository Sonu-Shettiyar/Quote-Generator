const express = require("express");
const qouteRouter = express.Router();
require('isomorphic-fetch');
require("dotenv").config();

qouteRouter.post("/:topic", async (req, res) => {
    const { topic } = req.params;
    const prompt = req.query.q
    console.log("andr aagya")
    try {
        const request = await fetch(`https://api.openai.com/v1/chat/completions`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: `Generate a short ${topic} quote with this keywords: ${prompt}` }],
                max_tokens: 400
            })
        });
        const response = await request.json();
        console.log("response", response);
        res.status(200).json({ msg: "Succesfully got response" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = { qouteRouter };
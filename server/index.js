const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { promptimprover, generateresponseStream } = require("./utils/ai");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Hello! Welcome to the server");
});

app.get('/generate-code', async (req, res) => {
    const prompt = req.query.prompt || 'Create a calculator app';

    try {
        const improvedPrompt = await promptimprover(prompt);
        const stream = await generateresponseStream(improvedPrompt);

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        for await (const chunk of stream) {
            const text = chunk.text();
            if (text) {
                res.write(text);
            }
        }

        res.end();
    } catch (err) {
        console.error("Error in /generate-code:", err);
        res.status(500).json({ error: "Failed to generate code" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const app = require("./app");

const PORT = 5005;

console.log(`Starting server...`);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

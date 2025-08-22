import app from "./app.js";
import 'dotenv/config'
import db from "./src/db/index.js";

const port = process.env.PORT

db();

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
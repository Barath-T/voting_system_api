import app from "./app.js";
import { PORT } from "./utils/config.js";

app.listen(PORT, () => console.log("server is listening at ", PORT));
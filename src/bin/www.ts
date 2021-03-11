import app from "../app";
//import d from 'debug'
//const debug = d("www")
const debug = require("debug")("www");

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => debug(`Server started, listening on PORT: ${PORT}`))
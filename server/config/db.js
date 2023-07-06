const { default: mongoose } = require("mongoose");

mongoose.connect(
    "mongodb+srv://wattamwargaj:ccsA0RNGAxmIyLQo@mycluster.zaz7z54.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log("Connected to DB"))
.catch(() => console.log("Error while connecting to DB"));
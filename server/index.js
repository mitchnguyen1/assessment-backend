const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static(`${__dirname}/../client`))

const { getCompliment,getFortune,newGoal,updateGoal,deleteGoal,displayGoals } = require('./controller')

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get("/api/goals",displayGoals)
app.post("/api/newGoal",newGoal)
app.put("/api/updateGoal/:id",updateGoal)
app.delete("/api/deleteGoal/:id",deleteGoal)



app.listen(4000, () => console.log("Server running on 4000"));

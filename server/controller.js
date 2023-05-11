require('dotenv').config()

const { ROLLBAR_ACCESS_TOKEN} = process.env
// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: `${ROLLBAR_ACCESS_TOKEN}`,
  captureUncaught: true,
  captureUnhandledRejections: true,
})


let goals = []
let id =0
module.exports = {
    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
        try{
            // choose random compliment
            let randomIndex = Math.floor(Math.random() * compliments.length);
            let randomCompliment = compliments[randomIndex];
            rollbar.info(`Random compliment returned: ${randomCompliment}`)
            res.status(200).send(randomCompliment);
        }catch(err){
            rollbar.error(err)
            res.status(500).send(err)
        }
    },
    //gets a random fortune from the array and send it
    getFortune: (req,res) => {
        const fortune = ['Competence like yours is underrated.','Chance favors those in motion.','Distance yourself from the vain.','Do not make extra work for yourself.','Don\'t just think, act!','He who expects no gratitude shall never be disappointed.']
        let randomNum = Math.floor(Math.random() * fortune.length)
        let randomFortune = fortune[randomNum]
        res.status(200).send(randomFortune)
    },
    //increment the id
    //grab the goal input from request body
    //create an new object to add to array
    //send back the entire array
    newGoal: (req,res)=>{
        id++
        const {goal} = req.body
        let body = {
            goal: goal,
            id
        }
        goals.push(body)
        res.status(200).send(goals)
        return
    },
    //grab the goal from the body, id from params(turn into a number)
    //search the array for a matching id and replace it
    //sends back goals array to be displayed
    updateGoal: (req,res) =>{
        const {goal} = req.body
        const {id} = req.params
        let newId = Number(id)
        for(let i = 0; i < goals.length; i++){
            if(goals[i].id === newId){
                goals[i].goal = goal
                res.status(200).send(goals)
                return
            }
        }
        
    },
    //grabs id from params and turn into a number
    //searches the array for a match in id and splice it out
    //send back array to be displayed
    deleteGoal: (req,res) => {
        const {id} = req.params
        let newId = Number(id)
        for(let i = 0; i < goals.length; i++){
            if(goals[i].id === newId){
                goals.splice(i,1)
            }
        }
        res.status(200).send(goals)
    },
    displayGoals: (req,res) =>{
        res.status(200).send(goals)
    }
    
}
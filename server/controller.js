require('dotenv').config()

const { ROLLBAR_ACCESS_TOKEN} = process.env
// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: `${ROLLBAR_ACCESS_TOKEN}`,
  captureUncaught: true,
  captureUnhandledRejections: true,
})

rollbar.info("connected")

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
            rollbar.critical(err)
            res.status(500).send(err)
        }
    },
    //gets a random fortune from the array and send it
    getFortune: (req,res) => {
        const fortune = ['Competence like yours is underrated.','Chance favors those in motion.','Distance yourself from the vain.','Do not make extra work for yourself.','Don\'t just think, act!','He who expects no gratitude shall never be disappointed.']
        try{
            let randomNum = Math.floor(Math.random() * fortune.length)
            let randomFortune = fortune[randomNum]
            rollbar.info(`Random fortune returned: ${randomFortune}`)
            res.status(200).send(randomFortune)
        }catch(err){
            rollbar.error(err)
            res.status(500).send(err)
        }
    },
    //increment the id
    //grab the goal input from request body
    //create an new object to add to array
    //send back the entire array
    newGoal: (req,res)=>{
        try{
            id++
            const {goal} = req.body
            let body = {
                goal: goal,
                id
            }
            goals.push(body)
            rollbar.info("Successfully added a new goal")
            res.status(200).send(goals)
            return
        }catch(err){
            rollbar.error(err)
            res.status(500).send(err)
        }
    },
    //grab the goal from the body, id from params(turn into a number)
    //search the array for a matching id and replace it
    //sends back goals array to be displayed
    updateGoal: (req,res) =>{
        try{
            const {goal} = req.body
            const {id} = req.params
            let newId = Number(id)
            for(let i = 0; i < goals.length; i++){
                if(goals[i].id === newId){
                    goals[i].goal = goal
                    rollbar.info(`Updated goal number: ${newId}`)
                    res.status(200).send(goals)
                    return
                }
            }
        }catch(err){
            rollbar.error(err)
            res.status(500).send(err)
        }
    },
    //grabs id from params and turn into a number
    //searches the array for a match in id and splice it out
    //send back array to be displayed
    deleteGoal: (req,res) => {
        try{
            const {id} = req.params
            let newId = Number(id)
            for(let i = 0; i < goals.length; i++){
                if(goals[i].id === newId){
                    goals.splice(i,1)
                }
            }
            rollbar.info("Successfully deleted goal")
            res.status(200).send(goals)
        }catch(err){
            rollbar.error(err)
            res.status(500).send(err)
        }
    },
    displayGoals: (req,res) =>{
        res.status(200).send(goals)
    },
    test: (req,res)=>{
        try{
            testError()
            rollbar.info('success')
            res.status(200).send(randomFortune())
        }
        catch(err){
            rollbar.error(err)
            res.status(500).send(err)
        }
    },
    critical:(req,res)=>{
        try{
            critical()
            rollbar.info('success')
            res.status(200).send(this.critical)
        }
        catch(err){
            rollbar.critical(err)
            res.status(500).send(err)
        }
    },
    warning: (req,res)=>{
        try{
            warning()
            rollbar.info('success')
            res.status(200).send(randomFortune())
        }
        catch(err){
            rollbar.warning(err)
            res.status(500).send(err)
        }
    },
    
}
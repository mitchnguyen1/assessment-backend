let goals = []
let id =0
module.exports = {
    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req,res) => {
        const fortune = ['Competence like yours is underrated.','Chance favors those in motion.','Distance yourself from the vain.','Do not make extra work for yourself.','Don\'t just think, act!','He who expects no gratitude shall never be disappointed.']
        let randomNum = Math.floor(Math.random() * fortune.length)
        let randomFortune = fortune[randomNum]
        res.status(200).send(randomFortune)
    },
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
    updateGoal: (req,res) =>{

        const {goal} = req.body
        const {id} = req.params
        let newId = Number(id)
        for(let i = 0; i < goals.length; i++){
            if(goals[i].id === newId){
                goals[i].goal = goal
                console.log(goals)
                res.status(200).send(goals)
                return
            }
        }
        
    },
    deleteGoal: (req,res) => {
        const {id} = req.params
        let newId = Number(id)
        console.log(newId)
        for(let i = 0; i < goals.length; i++){
            if(goals[i].id === newId){
                goals.splice(i,1)
            }
        }
        res.status(200).send(goals)
    }
    
}
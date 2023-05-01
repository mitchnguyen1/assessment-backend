//compliment
const complimentBtn = document.getElementById("complimentButton")
const displayComp = document.getElementById('displayComp')
//fortune 
const fortuneBtn = document.getElementById('fortuneButton')
const displayFortune = document.getElementById('displayFortune')
//goal form and input
const newGoalForm = document.querySelector('#newGoal')
const newGoalInput = document.querySelector('#goalInput')
//update goal form and input
const updateGoalForm = document.querySelector('#updateGoal')
const updateGoalInput = document.querySelector('#updateGoalInput')
const updateGoalID = document.querySelector('#goalID')
//delete goal button
const deleteBtn = document.querySelectorAll('.deleteBtn')

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            //display random comp in the compliment display box
            const data = res.data;
            let display = `<p id="Text">"${data}"</p>`
            displayComp.innerHTML = display
    });
};

//goes on link and get the object being sent(fortune)
const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune")
    //after success
        .then(res => {
        //display random comp in the compliment display box
        const data = res.data;
        let display = `<p id="Text">"${data}"</p>`
        displayFortune.innerHTML = display
    });
};

//display all goals in list
const displayGoals = data =>{
    let list = document.getElementById("goalList");
    list.innerHTML = ''
    for(let i = 0; i < data.length; i++){
        let newListItem = document.createElement("li");
        newListItem.innerHTML = `
            ${data[i].goal}
            <button class="deleteBtn" onclick="deleteGoal(${data[i].id})">X</button>`
        list.appendChild(newListItem);
    }
}

//upload the new goal(body) in array then display
const postGoal = body => axios.post('http://localhost:4000/api/newGoal', body).then(res => {
    displayGoals(res.data)
  }).catch(err => {
    console.log(err)
    alert('Uh oh. not working....')
  })

//function for new goal form, calls postGoal()
function newGoal(event) {
    event.preventDefault()
    let body = {
        goal: newGoalInput.value
    }
    postGoal(body)
    newGoalInput.value = ''
}

//function to update a certain goal in the array then displays all goals
const putGoal = body => axios.put(`http://localhost:4000/api/updateGoal/${updateGoalID.value}`, body).then(res => {
    displayGoals(res.data)
})
//function for update form, grabs the id and goal to replace
//calls putGoal() to update the array
const updateGoal = event => {
    event.preventDefault()
    let body = {
        goal: updateGoalInput.value,
        id: updateGoalID.value
    }
    putGoal(body)
    updateGoalInput.value = ''
    updateGoalID.value = ''
}

//delete goal function
//invoked is located as onclick in the button
//searches array and slice it out
const deleteGoal = id => axios.delete(`http://localhost:4000/api/deleteGoal/${id}`).then(res =>{
    displayGoals(res.data)
})

complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click',getFortune)
newGoalForm.addEventListener('submit',newGoal)
updateGoalForm.addEventListener('submit',updateGoal)

// constantly display the goal on load/refresh
axios.get("http://localhost:4000/api/goals")
.then(res =>{
    displayGoals(res.data)
})
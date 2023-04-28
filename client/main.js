const complimentBtn = document.getElementById("complimentButton")
//fortune button
const fortuneBtn = document.getElementById('fortuneButton')
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
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

//display goals in list
const displayGoals = data =>{
    let list = document.getElementById("goalList");
    list.innerHTML = ''
    for(let i = 0; i < data.length; i++){
        let newListItem = document.createElement("li");
        newListItem.innerHTML = `
            ${data[i].goal}
            <button class="deleteBtn" onclick="deleteMovie(${data[i].id})">X</button>`
        list.appendChild(newListItem);
    }
}

//event listener call back to upload new goal
const postGoal = body => axios.post('http://localhost:4000/api/newGoal', body).then(res => {
    displayGoals(res.data)
  }).catch(err => {
    console.log(err)
    alert('Uh oh. not working....')
  })
//function for new goal form
function newGoal(event) {
    event.preventDefault()
    let body = {
        goal: newGoalInput.value
    }
    postGoal(body)
    newGoalInput.value = ''
}

//function to update a current goal
const putGoal = body => axios.put(`http://localhost:4000/api/updateGoal/${updateGoalID.value}`, body).then(res => {
    displayGoals(res.data)
})
//function for update form
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
const deleteMovie = id => axios.delete(`http://localhost:4000/api/deleteGoal/${id}`).then(res =>{
    displayGoals(res.data)
})

complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click',getFortune)
newGoalForm.addEventListener('submit',newGoal)
updateGoalForm.addEventListener('submit',updateGoal)


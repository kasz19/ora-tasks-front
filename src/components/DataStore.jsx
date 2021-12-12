import axios from 'axios';


export function getTasks() {
    return axios.get(process.env.REACT_APP_TASKS_URL_FETCH)
            .catch(function (response) {
              console.log(response);
            });
  }

export function addTask(taskDescription, date) {
    var task = {"description": taskDescription, "taskDate": date}
    return axios.post(process.env.REACT_APP_TASKS_URL, task)
                .catch(function (response) {
                    console.log(response);
                });                 
}

export function deleteTask(taskId) {
    return axios.delete(process.env.REACT_APP_TASKS_URL + "/" + taskId)
      .catch(function (response) {
        console.log(response);
      });                 
}
  
export function editTask(taskId, taskDescription, date) {
  var task = {"id": taskId, "description": taskDescription, "taskDate": date}
  return axios.put(process.env.REACT_APP_TASKS_URL, task)
                .catch(function (response) {
                    console.log(response);
                });               
}
import  React, {Fragment} from 'react';
import TaskContainer  from './components/TaskContainer';
import {getTasks} from './components/DataStore';
import { Component } from 'react';
import AddTaskForm from './components/AddTaskForm';

class App extends Component {

    constructor(props) {
        super(props);
        this.updateTaskList = this.updateTaskList.bind(this);
        this.reloadTasks = this.reloadTasks.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.state = {tasks: []};
    }

    async reloadTasks() {
        var self = this; 
        self.setState({tasks: []}); 
        await getTasks().then(function (response) {
            if (response !== undefined) {
                console.log(response.data);
                self.setState({tasks: response.data}); 
            }
          });
    }

    componentDidMount() {
        this.reloadTasks()
    }

    updateTaskList (task) {
        this.setState(previousState => ({
            tasks: [...previousState.tasks, task]
        }));
    }

    removeTask(idTask) {
        this.setState({tasks: this.state.tasks.filter(function(task) { 
            return task.id !== idTask
        })});
    }
    

    render () {
            return <Fragment>
                <div className="frame_class">
                    <table id="task_table">
                        <tbody>
                            <tr key="idTaskReloadFormHeader">
                                <th>Current Tasks <button id="reloadTasksButton" onClick={this.reloadTasks} className="btn"><i className="fa fa-refresh"></i>Reload</button></th>
                            </tr>
                            <tr key="idTaskAddFormRow">
                                <td><AddTaskForm callbackAddTask={this.updateTaskList} /></td>
                            </tr>
                            {this.state.tasks.map(d => (<tr key={d.id} className="task-row-item"><td><TaskContainer 
                                            description={d.description}
                                            taskDate={d.taskDate}
                                            callbackDeletedTask={this.removeTask}
                                            idTask={d.id}/></td></tr>))}
                        </tbody>
                    </table>
                </div>
            </Fragment> 
        }

}


export default App;
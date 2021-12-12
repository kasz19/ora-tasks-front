import  React, {Fragment} from 'react';
import {addTask} from './DataStore';
import { Component } from 'react';

class AddTaskForm extends Component {

    constructor(props) {
        super(props);
        this.refDate = React.createRef();
        this.refDesc = React.createRef();
        this.handleTaskAdd = this.handleTaskAdd.bind(this);
    }

    handleTaskAdd()  {
        const description = this.refDesc.current.value;
        const date = this.refDate.current.value;  
        if(description === '' || date === '') {
            return ;
        } 
        var self = this; 
        addTask(description, date).then(function (response) {
            if (response !== undefined && response.data !== undefined && self.props.callbackAddTask !== undefined) {
                self.props.callbackAddTask(response.data)
            }
        }); 
    } 


    render () {
            return <Fragment>
                            <div className="box"> 
                                <input id="addTaskDescription" width="100%" ref={this.refDesc} type="text" placeholder="Description" /> <br />
                                <input id="addTaskDate" width="100%" ref={this.refDate} type="date" /> <br />
                                <button id="addTasksButton" onClick={this.handleTaskAdd} className="btn"><i className="fa fa-plus"></i>Add</button> <br />
                            </div>
                    </Fragment> 
        }
}


export default AddTaskForm;
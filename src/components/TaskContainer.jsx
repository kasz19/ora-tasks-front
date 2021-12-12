import React from 'react';
import { Component } from 'react';
import { deleteTask } from './DataStore';
import EditTaskForm from './EditTaskForm';

class TaskContainer extends Component {

    constructor(props) {
        super(props);
        this.idTask = this.props.idTask
        this.idDeleteButton = "idDeleteTaskButton-" + this.idTask
        this.idShowEditButton = "idShowEditButton-" + this.idTask
        this.idReadOnlyDescription = "idReadOnlyDescription-" + this.idTask
        this.idReadOnlyDate = "idReadOnlyDate-" + this.idTask
        this.description = this.props.description
        this.taskDate = this.props.taskDate
        this.state = {showTask: true, showEdit: false}; 
        this.handleTaskDelete = this.handleTaskDelete.bind(this);
        this.handleTaskShowEdit = this.handleTaskShowEdit.bind(this);
        this.handleTaskHideEdit = this.handleTaskHideEdit.bind(this);
        this.handleTaskEdited = this.handleTaskEdited.bind(this);
        this.refDate = React.createRef();
        this.refDesc = React.createRef();
    }

    handleTaskDelete()  {
        var self = this; 
        deleteTask(this.idTask).then(function (response) {
            self.setState({showTask: false}); 
            if (self.props.callbackDeletedTask !== undefined) {
                self.props.callbackDeletedTask(self.idTask)
            }
          });
    } 

    handleTaskHideEdit()  {
        this.setState({showTask: true, showEdit: false}); 
    } 

    handleTaskShowEdit()  {
        this.setState({showTask: false, showEdit: true}); 
    } 

    handleTaskEdited(newDescription, newDate)  {
        this.description = newDescription
        this.taskDate = newDate
        this.setState({showTask: true, showEdit: false}); 
    } 

    render () {
        if(this.state.showEdit) {
            return <EditTaskForm    callbackCancelEdit={this.handleTaskHideEdit} 
                                    callbackEditTask={this.handleTaskEdited} 
                                    description={this.description}
                                    taskDate={this.taskDate}
                                    idTask={this.idTask}
                    />    
        }else if(this.state.showTask) {
            return (
                    <div className="box" >
                            <input readOnly id={this.idReadOnlyDescription} ref={this.refDesc} type="text" defaultValue={this.description} />
                            <input readOnly id={this.idReadOnlyDate} ref={this.refDate} type="date" defaultValue={this.taskDate} /> <br/>
                            <button id={this.idShowEditButton} onClick={this.handleTaskShowEdit} className="btn"><i className="fa fa-edit"></i>Edit</button>
                            <button id={this.idDeleteButton} onClick={this.handleTaskDelete} className="btn"><i className="fa fa-trash"></i>Trash</button>
                    </div>
                )       
        } else {
            return null;
        }
    }

}

export default TaskContainer;



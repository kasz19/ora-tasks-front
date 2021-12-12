import  React, {Fragment} from 'react';
import {editTask} from './DataStore';
import { Component } from 'react';

class EditTaskForm extends Component {

    constructor(props) {
        super(props);
        this.idTask = this.props.idTask
        this.description = this.props.description
        this.taskDate = this.props.taskDate
        this.idDescriptionMod = "idDescriptionMod-" + this.idTask;
        this.idDateMod = "idDateMod-" + this.idTask;
        this.idHandleTaskEditButton = "idButtonMod-" + this.idTask;
        this.idHandleTaskCancelEditButton = "idButtonCancelMod-" + this.idTask;
        this.refDate = React.createRef();
        this.refDesc = React.createRef();
        this.handleTaskEdit = this.handleTaskEdit.bind(this);
        this.handleTaskCancelEdit = this.handleTaskCancelEdit.bind(this);
    }

    handleTaskEdit()  {
        const descriptionMod = this.refDesc.current.value;
        const dateMod = this.refDate.current.value;  
        if(descriptionMod === '' || dateMod === '') {
            return ;
        } 
        var self = this; 
        editTask(this.idTask, descriptionMod, dateMod).then(function (response) {
            self.description = descriptionMod
            self.taskDate = dateMod
            if(self.props.callbackEditTask !== undefined) {
                self.props.callbackEditTask(descriptionMod, dateMod)     
            }
          });
    } 

    handleTaskCancelEdit()  {
        if(this.props.callbackCancelEdit !== undefined) {
            this.props.callbackCancelEdit()     
        }
    } 

    render () {
            return <Fragment>
                            <div className="box" >
                                <input id={this.idDescriptionMod} ref={this.refDesc} type="text" defaultValue={this.description} />
                                <input id={this.idDateMod} ref={this.refDate} type="date" defaultValue={this.taskDate} /> <br/>
                                <button id={this.idHandleTaskEditButton}  onClick={this.handleTaskEdit} className="btn"><i className="fa fa-check"></i></button>
                                <button id={this.idHandleTaskCancelEditButton}  onClick={this.handleTaskCancelEdit} className="btn"><i className="fa fa-ban"></i> </button>
                            </div>
                    </Fragment> 
        }
}

export default EditTaskForm;
import * as axios from "axios";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';
import {mount} from 'enzyme';
import TaskContainer from "./TaskContainer.jsx";

jest.mock("axios");

const flushPromises = () => new Promise(setImmediate);

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
  container = null;
});

Enzyme.configure({
    adapter: new Adapter()
 });


test("Add component renders OK, simulate add click",  async () => {
    const task = {id:3, description: "Test", taskDate:"2020-01-01"}
    const wrapper = mount(<TaskContainer  description={task.description}
                                taskDate={task.taskDate}
                                idTask={task.id}/>);

    const isFormDescription = wrapper.find('#idReadOnlyDescription-' + task.id).exists();
    expect(isFormDescription).toBe(true);
    const isDateDescription = wrapper.find('#idReadOnlyDate-' + task.id).exists();
    expect(isDateDescription).toBe(true);
    wrapper.find('#idShowEditButton-' + task.id).simulate('click');

    await flushPromises();
    wrapper.update();

    const renderedDescModView = wrapper.find('#idDescriptionMod-' + task.id).exists();
    const renderedDateModView = wrapper.find('#idDateMod-' + task.id).exists();
    expect(renderedDescModView).toBe(true);
    expect(renderedDateModView).toBe(true);

    const modTask = {id:3, description: "TestMod", taskDate:"2020-01-01"}
    wrapper.find('#idDescriptionMod-' + task.id).instance().value = modTask.description;
    wrapper.find('#idDateMod-' + task.id).instance().value = modTask.taskDate;
    
    axios.put.mockImplementation(() => Promise.resolve({ data: task }));
    wrapper.find('#idButtonMod-' + task.id).simulate('click');
    await flushPromises();
    wrapper.update();
    const descriptionMod = wrapper.find('#idReadOnlyDescription-'+ task.id).instance().value;
    expect(descriptionMod).toBe(modTask.description);    

});


test("Add component renders OK, simulate delete click",  async () => {
    const task = {id:3, description: "Test", taskDate:"2020-01-01"}
    const wrapper = mount(<TaskContainer  description={task.description}
                                taskDate={task.taskDate}
                                idTask={task.id}/>);

    const isFormDescription = wrapper.find('#idReadOnlyDescription-' + task.id).exists();
    expect(isFormDescription).toBe(true);
    const isDateDescription = wrapper.find('#idReadOnlyDate-' + task.id).exists();
    expect(isDateDescription).toBe(true);
    axios.delete.mockImplementation(() => Promise.resolve({ data: task }));
    wrapper.find('#idDeleteTaskButton-' + task.id).simulate('click');

    await flushPromises();
    wrapper.update();

    const isReadOnlyDescription = wrapper.find('#idReadOnlyDescription-'+ task.id).exists();
    expect(isReadOnlyDescription).toBe(false);    

});

test("Add component renders OK, simulate cancel edit",  async () => {
    const task = {id:3, description: "Test", taskDate:"2020-01-01"}
    const wrapper = mount(<TaskContainer  description={task.description}
                                taskDate={task.taskDate}
                                idTask={task.id}/>);

    const isFormDescription = wrapper.find('#idReadOnlyDescription-' + task.id).exists();
    expect(isFormDescription).toBe(true);
    const isDateDescription = wrapper.find('#idReadOnlyDate-' + task.id).exists();
    expect(isDateDescription).toBe(true);
    axios.delete.mockImplementation(() => Promise.resolve({ data: task }));
    wrapper.find('#idShowEditButton-' + task.id).simulate('click');

    await flushPromises();
    wrapper.update();
    
    wrapper.find('#idButtonCancelMod-' + task.id).simulate('click');

    await flushPromises();
    wrapper.update();

    const descriptionReadOnly = wrapper.find('#idReadOnlyDescription-'+ task.id).exists();
    expect(descriptionReadOnly).toBe(true);    

});
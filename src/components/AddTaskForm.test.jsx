import * as axios from "axios";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';
import {mount} from 'enzyme';
import AddTaskForm from './AddTaskForm.jsx'

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
    const wrapper = mount(<AddTaskForm  />);
    const isFormDescription = wrapper.find('#addTaskDescription').exists();
    expect(isFormDescription).toBe(true);
    const isDateDescription = wrapper.find('#addTaskDescription').exists();
    expect(isDateDescription).toBe(true);
    const addedTask = {id:5, description: "TestX", taskDate:"2020-01-01"}
    axios.post.mockImplementation(() => Promise.resolve({ data: addedTask }));
    wrapper.find('#addTaskDescription').instance().value = addedTask.description;
    wrapper.find('#addTaskDate').instance().value = addedTask.taskDate;
    wrapper.find('#addTasksButton').simulate('click');
});
import * as axios from "axios";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';
import {mount} from 'enzyme';
import EditTaskForm from './EditTaskForm.jsx'

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

function handleTaskEdited(newDescription, newDate)  {
    console.log("handleTaskEdited Hanlded OK")
} 

function handleTaskCancelEdit()  {
    console.log("handleTaskCancelEdit Hanlded OK")
} 


test("Render OK the edit component,",  async () => {

    const modTask = {id:3, description: "Test", taskDate:"2020-01-01"}
    const idModTask = modTask.id;

    const wrapper = mount(<EditTaskForm  description={modTask.description}
                                         taskDate={modTask.taskDate}
                                         idTask={idModTask} />);

    const description = wrapper.find('#idDescriptionMod-' + idModTask).instance().value;
    const date = wrapper.find('#idDateMod-' + idModTask).instance().value;
    expect(description).toBe(modTask.description);
    expect(date).toBe(modTask.taskDate);
    axios.put.mockImplementation(() => Promise.resolve({ data: modTask }));
    
    wrapper.find('#idDescriptionMod-' + idModTask).instance().value = "ModTest";
    wrapper.find('#idButtonMod-' + idModTask).simulate('click');
    await flushPromises();
    wrapper.update();
    const descriptionMod = wrapper.find('#idDescriptionMod-' + idModTask).instance().value;
    expect(descriptionMod).toBe("ModTest");
});
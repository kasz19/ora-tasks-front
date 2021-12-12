import * as axios from "axios";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';
import {mount} from 'enzyme';
import App from './App.jsx'

jest.mock("axios");


const flushPromises = () => new Promise(setImmediate);

let container = null;
beforeEach(() => {
  // configurar un elemento del DOM como objetivo del renderizado
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



test("App renders OK with 3 data rows",  async () => {
    const dataTasks = [{id:3, description: "TestTask3", taskDate:"2020-01-01"}, {id:2, description: "TestTask2", taskDate:"2020-01-01"}, {id:1, description: "TestTask1", taskDate:"2020-01-01"}];
    axios.get.mockImplementation(() => Promise.resolve({ data: dataTasks }));
    const wrapper = mount(<App  />);
    await flushPromises();
    wrapper.update();
    const rows = wrapper.find('.task-row-item');
    expect(rows.length).toBe(dataTasks.length);
});


test("App renders OK with 0 data rows",  async () => {
    const dataTasks = [];
    axios.get.mockImplementation(() => Promise.resolve({ data: dataTasks }));
    const wrapper = mount(<App  />);
    await flushPromises();
    wrapper.update();
    const table_generated = wrapper.find('#task_table').exists();
    expect(table_generated).toBe(true);
});

test("App renders OK, Reload OK new added data rows",  async () => {
    var dataTasks = [{id:3, description: "TestTask3", taskDate:"2020-01-01"}, {id:2, description: "TestTask2", taskDate:"2020-01-01"}, {id:1, description: "TestTask1", taskDate:"2020-01-01"}];
    axios.get.mockImplementation(() => Promise.resolve({ data: dataTasks }));
    const wrapper = mount(<App  />);
    await flushPromises();
    wrapper.update();
    var rows = wrapper.find('.task-row-item');
    expect(rows.length).toBe(dataTasks.length);

    dataTasks = [{id:3, description: "TestTask3", taskDate:"2020-01-01"}, {id:2, description: "TestTask2", taskDate:"2020-01-01"}, {id:1, description: "TestTask1", taskDate:"2020-01-01"},
    {id:6, description: "TestTask6", taskDate:"2020-01-01"}, {id:5, description: "TestTask5", taskDate:"2020-01-01"}, {id:7, description: "TestTask7", taskDate:"2020-01-01"}];
    axios.get.mockImplementation(() => Promise.resolve({ data: dataTasks }));
    wrapper.find('#reloadTasksButton').simulate('click');
    await flushPromises();
    wrapper.update();
    rows = wrapper.find('.task-row-item');
    expect(rows.length).toBe(dataTasks.length);

});

test("App renders OK, Adds OK data rows",  async () => {
    var dataTasks = [{id:3, description: "TestTask3", taskDate:"2020-01-01"}, {id:2, description: "TestTask2", taskDate:"2020-01-01"}, {id:1, description: "TestTask1", taskDate:"2020-01-01"}];
    axios.get.mockImplementation(() => Promise.resolve({ data: dataTasks }));
    const wrapper = mount(<App  />);
    await flushPromises();
    wrapper.update();
    var rows = wrapper.find('.task-row-item');
    expect(rows.length).toBe(dataTasks.length);

    const addedTask = {id:5, description: "TestX", taskDate:"2020-01-01"}
    
    axios.post.mockImplementation(() => Promise.resolve({ data: addedTask }));
    wrapper.find('#addTaskDescription').instance().value = addedTask.description;
    wrapper.find('#addTaskDate').instance().value = addedTask.taskDate;
    wrapper.find('#addTasksButton').simulate('click');
    await flushPromises();
    wrapper.update();
    rows = wrapper.find('.task-row-item');
    expect(rows.length).toBe(dataTasks.length + 1);

});


test("App renders OK, Delete OK data row",  async () => {
    var dataTasks = [{id:3, description: "TestTask3", taskDate:"2020-01-01"}, {id:2, description: "TestTask2", taskDate:"2020-01-01"}, {id:1, description: "TestTask1", taskDate:"2020-01-01"}];
    axios.get.mockImplementation(() => Promise.resolve({ data: dataTasks }));
    const wrapper = mount(<App  />);
    await flushPromises();
    wrapper.update();
    var rows = wrapper.find('.task-row-item');
    expect(rows.length).toBe(dataTasks.length);
    const idDeleteTask = "#idDeleteTaskButton-" + 3;
    
    axios.delete.mockImplementation(() => Promise.resolve({ data: idDeleteTask }));
    wrapper.find(idDeleteTask).simulate('click');
    await flushPromises();
    wrapper.update();
    rows = wrapper.find('.task-row-item');
    expect(rows.length).toBe(dataTasks.length - 1);

});

test("App renders OK, Edit OK data row",  async () => {
    var dataTasks = [{id:3, description: "TestTask3", taskDate:"2020-01-01"}, {id:2, description: "TestTask2", taskDate:"2020-01-01"}, {id:1, description: "TestTask1", taskDate:"2020-01-01"}];
    axios.get.mockImplementation(() => Promise.resolve({ data: dataTasks }));
    const wrapper = mount(<App  />);
    await flushPromises();
    wrapper.update();
    var rows = wrapper.find('.task-row-item');
    expect(rows.length).toBe(dataTasks.length);

    const modTask = {id:3, description: "TestModification", taskDate:"2020-01-01"}
    const idModTask = modTask.id;

    wrapper.find('#idShowEditButton-' + idModTask).simulate('click');

    await flushPromises();
    wrapper.update();

    wrapper.find('#idDescriptionMod-' + idModTask).instance().value = modTask.description;
    wrapper.find('#idDateMod-' + idModTask).instance().value = modTask.taskDate;
    
    axios.put.mockImplementation(() => Promise.resolve({ data: modTask }));
    wrapper.find('#idButtonMod-' + idModTask).simulate('click');
    await flushPromises();
    wrapper.update();
    
    const descriptionMod = wrapper.find('#idReadOnlyDescription-'+idModTask).instance().value;
    expect(descriptionMod).toBe(modTask.description);

});
import React, { useState, useEffect } from 'react';
import '../todo/css/Table.css'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Logout from '../auth/Logout';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

function Table() {
  const usenavigate = useNavigate();

  useEffect(() => {
      let username=sessionStorage.getItem('username')
      if(username === '' || username===null){
          usenavigate('/login')
      } 
    }, []);
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  let newTodoItem = {
    priority: newPriority, 
    title: newTitle,
    description: newDescription,
  };
  
  const handleAddTodo = () => {
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    setNewDescription("")
    setNewTitle('')
    setNewPriority("")
    updatedTodoArr.sort((a, b) => {
      if (a.priority === 'high' && b.priority !== 'high') return -1;
      if (a.priority === 'medium' && b.priority === 'low') return -1;
      if (a.priority === 'low' && b.priority === 'medium') return 1;
      return 0;
    });
    
    setTodos(updatedTodoArr);
  };

  const handleDeleteTodo = index => {
    let reducedTodo = [...allTodos]; 
    reducedTodo.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleComplete = index => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));

    updatedCompletedArr.sort((a, b) => {
      if (a.priority === 'high' && b.priority !== 'high') return -1;
      if (a.priority === 'medium' && b.priority === 'low') return -1;
      if (a.priority === 'low' && b.priority === 'medium') return 1;
      return 0;
    });
      setCompletedTodos(updatedCompletedArr);
  };

  const handleDeleteCompletedTodo = index => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) {
      setTodos(savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  const handleEdit = (ind, item) => {
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, title: value };
    });
  };

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, description: value };
    });
  };

  const handleUpdateToDo = () => {
    let newToDo = [...allTodos];
    newToDo[currentEdit] = currentEditedItem;
    setTodos(newToDo);
    setCurrentEdit("");
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(allTodos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
    localStorage.setItem('todolist', JSON.stringify(items));
  };


  return (
    <div className="main">
      <h1>Todo App</h1>
      <Logout/>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text"value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Enter Task title."/>
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text"value={newDescription} onChange={e => setNewDescription(e.target.value)}placeholder="What's the task description?"/>
          </div>
          <div className="todo-input-item">
            <label>Priority</label>
            <input type="text"value={newPriority}onChange={e => setNewPriority(e.target.value)}placeholder="low,medium,high ? " />
          
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} className="primaryBtn" >Add </button>
          </div>
        </div>
        <Card isCompleteScreen={isCompleteScreen} setIsCompleteScreen={setIsCompleteScreen} />

        <div className="todo-list">
          {isCompleteScreen === false &&
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="todos">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {allTodos.map((item, index) => {
                      if (currentEdit === index) {
                        return (
                          <div className='edit__wrapper' key={index}>
                            <input placeholder='Updated Title'  onChange={(e) => handleUpdateTitle(e.target.value)} value={currentEditedItem.title} />
                            <textarea placeholder='Updated Description' rows={4} onChange={(e) => handleUpdateDescription(e.target.value)} value={currentEditedItem.description} />
                            <button type="button" onClick={handleUpdateToDo}className="primaryBtn" >Update </button>
                          </div>
                        )
                      } else {
                        return (
                          <Draggable key={index} draggableId={`todo-${index}`} index={index}>
                            {(provided) => (
                              <div className="todo-list-item"{...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}> <div>
                                  <h3> {index+1} Title :{item.title}</h3>
                                  <p>Description: {item.description}</p>
                                  <h4>Priority-Level: {item.priority}</h4>

                                </div>
                                <div>
                                  <AiOutlineDelete className="icon" onClick={() => handleDeleteTodo(index)} title="Delete?" />
                                  <BsCheckLg className="check-icon"onClick={() => handleComplete(index)} title="Complete?"/>
                                  <AiOutlineEdit className="check-icon"onClick={() => handleEdit(index, item)} title="Edit?" />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      }
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          }

          {isCompleteScreen === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>Title : {item.title}</h3>
                    <p>Description: {item.description}</p>
                    <h6>Completed on: {item.completedOn}</h6>
                    <h6>Priority-Level: {item.priority}</h6>
                  </div>
                  <div>
                    <AiOutlineDelete className="icon"onClick={() => handleDeleteCompletedTodo(index)}title="Delete?"/>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Table;

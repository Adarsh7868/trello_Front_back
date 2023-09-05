import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {  getBoardId } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createTask } from "../../redux/authSlice";
import { createColumn } from "../../redux/authSlice";
import { FaTrash } from "react-icons/fa";
import { deleteTask } from "../../redux/authSlice";
import { deleteColumnTask } from "../../redux/authSlice";
import "./Board_id.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { swapTasks } from "../../redux/authSlice";

import { swapColumn } from "../../redux/authSlice";

const BoardId = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const board = useSelector((state) => state.auth.data)
  const column = useSelector((state) => state.auth.column);

  useEffect(() => {
    dispatch(getBoardId(id));
  }, [id])

  if (!column) return <p>Wait...</p>;
  if (column.length === 0) return <p>loading...</p>;
  //  <h2>{board.name}</h2>

  const handleDeleteTask = (id) => {
    if (confirm("Are you sure you want to delete this task?"))
      dispatch(deleteTask(id));
    else return;
  };

  // ******************************************************************************************
  //Drag and Drop context
  console.log("column", column)
  
       //Main data 
  let data = column.ColumnList.map((item) => {

    const handleDragEnd = (result) => {

      console.log("result", result);
      // console.log("source id", result.source.droppableId);
      // console.log("destination", result.destination.droppableId);
      if (!result.destination) {
        console.log("no destination")
        return
      }
      if(result.source.index === result.destination.index){
        console.log("Same index")
        return
      }
      if (result.source.droppableId === result.destination.droppableId) {
        console.log("same column")  
        
        // let id1 = result.draggableId
        // let id2 = result.destination.droppableId

        // dispatch(swapTasks( id1, id2))

        const swapTaskInput = {
          id1: result.draggableId,
          id2: item.TaskList[result.destination.index]._id, 
        }
        console.log("Index 1", swapTaskInput.id1)
        console.log("Index 2", swapTaskInput.id2)
        dispatch(swapTasks(swapTaskInput))
      }
      if(result.source.droppableId !== result.destination.droppableId){

        console.log("different column")

          const swapColumInput = {
            id1: result.draggableId,
            columnId: result.destination.droppableId,
            ind: result.destination.index,
          }
        dispatch(swapColumn(swapColumInput))
        } 
  }

    return (
      <>
        <div style={{ display: "inline-block" }}>
          <div
            className="ColumHead"
            style={{
              border: "1px solid black",
              marginTop: "30px",
              margin: "10px",
              width: "300px",
              borderRadius: "5px",
              padding: "4px",
              backgroundColor: "  #f2f2f2",
            }}
          >
            <DragDropContext onDragEnd={handleDragEnd}>
              <h1
                style={{
                  backgroundColor: "black",
                  padding: "8px",
                  color: "white",
                  width: "auto",
                  borderRadius: "3px",
                  fontSize: "23px",
                  marginTop: "0px",
                }}
              >
                {item.title}

                <span // Delete Column button
                  style={{
                    position: "relative",
                    float: "right",
                    fontSize: "20px",
                    color: "red",
                  }}
                  onClick={() => {
                    if (
                      confirm("Are you sure you want to delete this column?")
                    ) {
                      dispatch(deleteColumnTask(item._id));
                    } else return;
                  }}
                >
                  <FaTrash />
                </span>
              </h1>

              {/* mapping all tasks of a column */}
              <div>
                <Droppable droppableId={item._id}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="task"
                      style={{
                        border: "4px solid orange",
                        borderRadius: "10px",
                      }} // Droppable area
                    >
                      <div>
                      {item.TaskList.map((task, index) => (
                        <div>
                          <Draggable
                            draggableId={task._id}
                            key={task._id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="task"
                                // style={{
                                //   border: "2px solid black",  margin: "5px",
                                //   padding: "8px",borderRadius: "5px",
                                //   backgroundColor: "white",width: "auto"}}
                              >
                                <h3>{task.Title}</h3>
                                <div>
                                  {task.Description}
                                  <span
                                    // delete task button
                                    style={{
                                      position: "relative",
                                      float: "right",
                                      padding: "2px",
                                      fontSize: "20px",
                                      marginTop: "-15px",
                                    }}
                                    onClick={() => {
                                      handleDeleteTask(task._id);
                                    }}
                                  >
                                    <FaTrash />
                                  </span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        </div>
                      ))}
                      </div>
                       
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </DragDropContext>

            {/* Add Task button  API */}
            <button
              onClick={() => {
                const Title = prompt("Enter Task ");
                if (!Title) return;
                const Description = prompt("Enter Description ");
                const Column = item._id;
                const CreateTaskInput = {
                  Title,
                  Description,
                  Column,
                };
                dispatch(createTask(CreateTaskInput));
              }}
              className="addTask"
              style={{
                border: "1px solid black",
                width: "120px",
                margin: "4px",
                color: "black",
                backgroundColor: "lightpink",
              }}
            >
              <h3>Add Task </h3>
            </button>
          </div>
        </div>
      </>
    );
  });
                      // Main rendering.............
  return (
    <>
      <div>
        {data}

        {/* <div */}
        {/* // style={{ border: "1px solid black", float: "right",marginTop: "18px", */}
        {/* //         padding: "2px",borderRadius: "5px",backgroundColor: "blue",width: "150px",}} */}
        {/* // > */}
                    {/* Column creation API button */}
          <button
            onClick={() => {
              let title = prompt("Enter Column Name");
              if (!title) return;
              let boardId = id;

              const CreateColumnInput = {
                title,
                boardId,
              };
              dispatch(createColumn(CreateColumnInput));
            }}
            style={{ width: "150px", backgroundColor: "blue" }}
          >
            Create Column +
          </button>
        {/* </div> */}
      </div>
      {/* ################################################################## End */}

                    {/* Logout and goto Board button */}
      <div
        style={{
          width: "350px",
          position: "relative",
          left: "39%",
          top: "140px",
        }}
      >
        <button
          type="submit"
          style={{
            marginRight: "10px",
            backgroundColor: "black",
            padding: "15px",
            fontSize: "18px",
            color: "white",
          }}
          onClick={() => {
            if (confirm("Are you sure you want to logout?")) {
              localStorage.removeItem("token");
              navigate("/");
            } else return;
          }}
        >
          Logout
        </button>

        <button
          type="submit"
          style={{
            marginRight: "10px",
            backgroundColor: "white",
            color: "black",
            padding: "15px",
            fontSize: "15px",
            width: "150px",
            fontFamily: "verdana",
          }}
          onClick={() => {
            navigate("/AllBoard");
          }}
        >
          Go to Boards
        </button>
      </div>
    </>
  );
};

export default BoardId;

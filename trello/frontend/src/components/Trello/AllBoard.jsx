import React, { useState, useEffect } from "react"  // Import statements
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createNewBoard, getAllBoard } from "../../redux/authSlice"
import "./AllBoard.css"
import { FaTrash } from "react-icons/fa";


const AllBoard = () => {
  
  const board = useSelector((state) => state.auth.data)
  const [newBoardName, setNewBoardName] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getAllBoard())
  }, [])

  console.log("board", board)

                          // creating new Board
  const createBoard = () => {
    if (newBoardName.trim() === "") {
      alert("Please provide a board name")
      return
    } else if (newBoardName.length > 15) {
      alert("Board name is too long!")
      return
    }

    const newBoard = {
      name: newBoardName,
    }
    dispatch(createNewBoard(newBoard))
    setNewBoardName('')
  }


  // Rendered JSX
  return ( 
    <>
      <h2>Trello</h2>
      <div>
        <h1>Create New Board</h1>
        <input
          type="text"
          className="input"
          style={{
            width: "400px",
            borderRadius: "7px",
            border: "1px solid black",
            height: "50px",
            marginLeft: "10px",
          }}
          placeholder="Enter board name"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
        />
        <button
          onClick={createBoard}
          className="create_btn"
          style={{
            backgroundColor: "blue",
            width: "200px",
            marginLeft: "50px",
            borderRadius: "7px",
            fontSize: "17px",
            cursor: "pointer",
            padding: "10px",
            height: "50px",
          }}
        >Create Board
        </button>
        <br />
        <div style={{ marginTop: "1%" }}>
          {board.map((item) => (
            // console.log("item", item),
            <li key={item._id} className="lists"
              style={{ listStyle: "none", marginLeft: "1%" }}
            >
              <Link className="links" to={
                `/board/${item._id}`
              }>
                <button
                  style={{
                    backgroundColor: "black",
                    margin: "5px",
                    padding: "20px 10px",
                    width: "350px",
                  }}
                >
                  {item.name}
                  
                </button>
               
              </Link>
              {/* <span style={{
                    color:"red",
                    backgroundColor:"white",
                    padding:"14px",
                    fontSize:"18px",
                    marginLeft:"10px",
                    borderRadius:"22px",
                  }}
                 onClick={() => {
                    dispatch(deleteBoard(item._id))
                 }} 
                  >
                <FaTrash/>
              </span> */}
              <span>
                {/* update icon */}
                    
              </span>
            </li>
          ))}
        </div>
      </div>
    </>
  )
}

export default AllBoard

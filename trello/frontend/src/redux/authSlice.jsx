import { createAction, createSlice } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import client from "../apollo.client";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Create Trello User API
const CREATE_USER_MUTATION = gql`
  mutation CreateUser($CreateTrelloUser: CreateTrelloUser!) {
    CreateTrelloUser(CreateTrelloUser: $CreateTrelloUser) {
      _id
      name
      email
      password
      phone
      privateKey
    }
  }
`;
export const createUser = createAsyncThunk(
  "auth/createUser",

  async (CreateTrelloUser) => {
    try {
      console.log("createLoginInput data", CreateTrelloUser);
      const response = await client.mutate({
        mutation: CREATE_USER_MUTATION,
        variables: { CreateTrelloUser },
      });

      const createdUser = response.data.CreateTrelloUser;
      console.log("createdUser", createdUser);
      return createdUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
);
// Trello Login API
const LOGIN_USER = gql`
  mutation loginTrelloUser($email: String!, $password: String!) {
    LoginTrello(email: $email, password: $password)
  }
`;
export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async ({ email, password }) => {
    try {
      const response = await client.mutate({
        mutation: LOGIN_USER,
        variables: { email, password },
      });
      console.log("response login ", response.data.LoginTrello);

      const checkEmail = response.data.LoginTrello;
      console.log("checked Email", checkEmail);

      const token = checkEmail;
      if (token === null) {
        alert("Token not found !!");
        return;
      }

      localStorage.setItem("token", token);
      console.log("token", token);
      window.location.href = "/AllBoard";
      return response.data.LoginTrello;
    } catch (error) {
      alert("Invalid email catch");
    }
  }
);

// Created Trello Board API
const CREATEBOARD = gql`
  mutation createBoard($CreateBoardInput: CreateBoardInput!) {
    createBoard(CreateBoardInput: $CreateBoardInput) {
      _id
      name
    }
  }
`;
export const createNewBoard = createAsyncThunk(
  "auth/createNewBoard",

  async (CreateBoardInput) => {
    try {
      console.log("check board", CreateBoardInput);
      const response = await client.mutate({
        mutation: CREATEBOARD,
        variables: { CreateBoardInput },
      });
      const respond = response.data.createBoard;
      console.log("respond ceate board ", respond);
      // alert("Board created successfully !!");
      console.log("response", response);
      return response.data.createBoard;
    } catch (error) {
      console.error("Error creating Board:", error);
      throw error;
    }
  }
);

// *************************************************************
// get AllBoard API
const GETALLBOARD = gql`
  query getALLBoards {
    getAllBoard {
      _id
      name
    }
  }
`;

export const getAllBoard = createAsyncThunk(
  "auth/getAllBoard",

  async () => {
    try {
      const response = await client.query({
        query: GETALLBOARD,
      });
      return response.data.getAllBoard;
    } catch (error) {
      console.error("Error getting Board:", error);
      throw error;
    }
  }
);
// *************************************************************
// API for particular id of board to get all details of specific board
const GETBOARDID = gql`
  query getBoardId($id: String!) {
    GetBoardById(id: $id) {
      _id
      name
      ColumnList {
        _id
        title
        boardId
        TaskList {
          _id
          Description
          Title
          index
          Column
        }
      }
    }
  }
`;
export const getBoardId = createAsyncThunk(
  "auth/getBoardId",

  async (id) => {
    try {
      // console.log("show id", id);
      const response = await client.query({
        query: GETBOARDID,
        variables: { id },
        // fetchPolicy: "network-only",
      });
      // console.log("b_id data", response.data.GetBoardById);
      return response.data.GetBoardById;
    } catch (error) {
      console.error("Error getting Board:", error);
      throw error;
    }
  }
);

// Create Task API for task creation
const CREATETASK = gql`
  mutation createTask($CreateTaskInput: CreateTaskInput!) {
    createTask(createTaskInput: $CreateTaskInput) {
      _id
      Title
      Description
      index
      Column
    }
  }
`;
export const createTask = createAsyncThunk(
  "auth/createTask",

  async (CreateTaskInput) => {
    try {
      // console.log("task ", CreateTaskInput);
      const response = await client.mutate({
        mutation: CREATETASK,
        variables: { CreateTaskInput },
      });
      const data = response.data.createTask;
      console.log("Task API", data);
      // alert("Task created successfully !!");
      return data;
    } catch (error) {
      console.error("Error creating Task:", error);
      throw error;
    }
  }
);

//   Created New column
const CREATECOLUMN = gql`
  mutation createColumn($CreateColumnInput: CreateColumnInput!) {
    createColumn(createColumnInput: $CreateColumnInput) {
      _id
      title
      boardId
      TaskList {
        _id
        Title
        Description
        index
        Column
      }
    }
  }
`;
export const createColumn = createAsyncThunk(
  "auth/createColumn",

  async (CreateColumnInput) => {
    try {
      // console.log("check column", CreateColumnInput);
      const response = await client.mutate({
        mutation: CREATECOLUMN,
        variables: { CreateColumnInput },
      });
      console.log("create column API", response.data.createColumn);

      return response.data.createColumn;
    } catch (error) {
      console.error("Error creating Column:", error);
      throw error;
    }
  }
);

// Delete Task API
const DELETETASK = gql`
  mutation deleteTask($id: String!) {
    DeleteTask(id: $id) {
      _id
      Title
      index
      Description
      Column
    }
  }
`;
export const deleteTask = createAsyncThunk(
  "auth/deleteTask",

  async (id) => {
    try {
      console.log("check del task", id);
      const response = await client.mutate({
        mutation: DELETETASK,
        variables: { id },
      });

      // alert("Task deleted successfully !!");
      window.location.reload();
      console.log("response delete", response);
      return response.data.deleteTask;
    } catch (error) {
      console.error("Error deleting Task:", error);
      throw error;
    }
  }
);
// Delete Column API
const DELETECOLUMN = gql`
  mutation deleteColumn($id: String!) {
    removeColumn(id: $id) {
      _id
      title
      boardId
    }
  }
`;
export const deleteColumnTask = createAsyncThunk(
  "auth/deleteColumn",

  async (id) => {
    try {
      // console.log("check del id slice", id);
      const response = await client.mutate({
        mutation: DELETECOLUMN,
        variables: { id },
      });
      window.location.reload();

      return response.data.deleteColumn;
    } catch (error) {
      console.error("Error deleting Column:", error);
      throw error;
    }
  }
);
// swap API to change index of tasks
const SWAPTASK = gql`
  mutation swapTask($id1: String!, $id2: String!) {
    swapTasks(taskId1: $id1, taskId2: $id2) {
      _id
      Title
      Description
      index
      Column
    }
  }
`;

export const swapTasks = createAsyncThunk(
  "auth/swapTask",

  async ({ id1, id2 }) => {
    try {
      console.log("check both task ID's", id1, " and", id2);
      const response = await client.mutate({
        mutation: SWAPTASK,
        variables: { id1, id2 },
      });
      console.log("response swap", response.data);

      // window.location.reload();
      return response.data;
    } catch (error) {
      console.error("Error swapping Task:", error);
      throw error;
    }
  }
);

//swapColumn API
const SWAPCOLUMN = gql`
  mutation swapColumn($id1: String!, $columnId: String!, $ind: Float!) {
    swapColumn(taskId1: $id1, column: $columnId, index: $ind) {
      _id
      Title
      Description
      index
      Column
    }
  }
`;
export const swapColumn = createAsyncThunk(
  "auth/swapColumn",

  async ({ id1, columnId, ind }) => {
    try {
      console.log("check both task ID's", id1, " and", columnId, " and", ind);
      const response = await client.mutate({
        mutation: SWAPCOLUMN,
        variables: { id1, columnId, ind },
      });
      console.log("swapping column", response.data);
      alert("Column swapped successfully !!");
      // window.location.reload();
      return response.data;
    } catch (error) {
      console.error("Error swapping Task:", error);
      throw error;
    }
  }
);

const initialState = {
  data: [],
  column: [],
  task: [],
  loading: false,
  error: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(createNewBoard.pending, (state) => {
        state.loading = true;
      })

      .addCase(createNewBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload];
        state.error = null;
      })

      .addCase(createNewBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getAllBoard.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAllBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })

      .addCase(getAllBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getBoardId.pending, (state) => {
        state.loading = true;
      })

      .addCase(getBoardId.fulfilled, (state, action) => {
        state.loading = false;
        state.column = action.payload;
        console.log("action.payload lookup", action.payload);
        state.error = null;
      })

      .addCase(getBoardId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;

        console.log("action.payload", action.payload)
                           //updating new task in state
        state.column.ColumnList = state.column.ColumnList.map((column) => {
          if (column._id === action.payload.Column) {
            column.TaskList = [...column.TaskList, action.payload];
          }
          return column;
        })

        console.log("updated Task state : ", state.column);

        state.error = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    //column created
    builder
      .addCase(createColumn.pending, (state) => {
        state.loading = true;
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        state.loading = false;

        // update new column in ColumnList of state.column
        console.log("action.payload", action.payload);
        state.column.ColumnList = [...state.column.ColumnList, action.payload];

        console.log("state.column", state.column);
        state.error = null;
      })
      .addCase(createColumn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    // swapping task
    builder
      .addCase(swapTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(swapTasks.fulfilled, (state, action) => {
        state.loading = false;

        //update swap index in ColumnList of state.column
        console.log("swap.payload", action.payload);
        state.column.ColumnList = state.column.ColumnList.map((column) => {
          console.log("i have started mapping")         //done 
          if (column._id === action.payload.Column) {
            console.log("i have entered in column by id")
            column.TaskList = column.TaskList.map((task) => {
                console.log("i have entered in tasklist by id");
              if (task._id === action.payload._id) {
                task.index = action.payload.index;
                console.log("payload index", action.payload._id);
              }
              return task;
            })
          }
          return column

        })
        console.log("swap updated state", state.column);

        // console.log("state.task", state.task);
        // console.log("action.payload index", action.payload.index);

        // const taskIndex1 = state.task.findIndex((task) => task._id === action.payload._id);
        // const taskIndex2 = state.task.findIndex((task) => task._id === action.payload._id);
        // console.log("taskIndex1", taskIndex1)
        // console.log("taskIndex2", taskIndex2)

        // if (taskIndex1 !== -1 && taskIndex2 !== -1) {

        // const updatedTasks = [...state.task];
        // [updatedTasks[taskIndex1], updatedTasks[taskIndex2]] = [updatedTasks[taskIndex2], updatedTasks[taskIndex1]]

        //   state.task = updatedTasks
        //   console.log("updatedTasks state", state.task)
        //   console.log("updatedTasks", updatedTasks)

        // }else{
        //   console.log("not found")
        // }

        state.error = null;
      })

      .addCase(swapTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default authSlice;

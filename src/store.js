import {createStore} from 'vuex'
import defaultBoard from './default-board';
import { saveStatePlugin, uuid } from './utils';

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard
const store = createStore({
  plugins:[saveStatePlugin],
  state () {
    return {
      board
    }
    
  },
  mutations: {
    CREATE_TASK(state,{tasks, name}){

      tasks.push({
        name,
        id: uuid(),
        description: ''

      })
    },
    CREATE_COLUMN (state, { name }) {
      state.board.columns.push({
        name,
        tasks: []
      })
    },
    UPDATE_TASK(state, {task, key, value}){
      task[key] = value
      //Vue.set(task, key, value)
    },
    MOVE_TASK(state, {fromTasks, toTasks, fromTaskIndex, toTaskIndex}){
        const taskToMove= fromTasks.splice(fromTaskIndex,1)[0];
        toTasks.splice(toTaskIndex,0,taskToMove);
    },
    MOVE_COLUMN (state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)
    },
  },
  getters:{
    getTask(state){
      return (id) => {
        for(const column of state.board.columns){
          for(const task of column.tasks){
            if(task.id == id){
              return task;
            }
          }
        }
      }
    }
  }
});
export default store

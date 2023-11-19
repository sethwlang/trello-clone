<template>
<div class="column" 
      draggable="true"
      @drop="moveTaskOrColumn($event, column.tasks), columnIndex"
      @dragover.prevent
      @dragenter.prevent
      @dragstart.self="pickupColumn($event, columnIndex)">
          <div class="flex items-center mb-2 font-bold">
            {{ column.name }}
          </div>
          <div class="list-reset">

          </div>
          <ColumnTask
          v-for="(task, $taskIndex) of column.tasks"
          :key="$taskIndex"
          :task="task"
          :taskIndex="$taskIndex"
          :column="column"
          :columnIndex="columnIndex"
          :board="board"
          />
          <input type="text"
          class="block p-2 w-full bg-transparent"
          placeholder="+ Enter new task" 
          @keyup.enter="createTask($event, column.tasks)"/>
      </div>
</template>
<script>
import ColumnTask from './ColumnTask.vue'
export default{
    components:{ ColumnTask},
props:{
    column:{
        type:Object,
        required: true,
    },
    columnIndex:{
        type:Number,
        required: true,
    },
    board:{
        type: Object,
        required: true
    }
},
methods:{

    moveTaskOrColumn (e, toTasks, toColumnIndex, toTaskIndex) {
      const type = e.dataTransfer.getData('type')
      if (type === 'task') {
        this.moveTask(e, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
      } else {
        this.moveColumn(e, toColumnIndex)
      }
    },
    moveTask(e, toTasks, toTaskIndex){
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      const fromTaskIndex = e.dataTransfer.getData('from-task-index')
      
      this.$store.commit('MOVE_TASK',{
        fromTasks,
        fromTaskIndex,
        toTasks,
        toTaskIndex

      })
    },
    moveColumn (e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex
      })
    },
    pickupColumn (e, columnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
    
      e.dataTransfer.setData('from-column-index', columnIndex)
      e.dataTransfer.setData('type', 'column')
    }, 
    createTask(e, tasks){
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value
      })
      e.target.value='';
    },

},

}
</script>
<style lang="css">

.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow;
  min-width: 350px;
}

</style>
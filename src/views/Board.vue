<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <BoardColumn
      v-for="(column, $columnIndex) of board.columns" 
      :key="$columnIndex"
      :column="column"
      :columnIndex="$columnIndex"
      :board="board"
      />
      <div class="column flex">
      <input
        class="p-2 mr-2 flex-grow"
        placeholder="New column name"
        v-model="newColumnName"
        @keyup.enter="createColumn"
      />
    </div>
    </div>
   
    <!-- TODO task-bg tailwindcss-->
    <div class="task-bg"
    v-if="isTaskOpen"
    @click.self="close">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import BoardColumn from '../components/BoardColumn.vue';
export default {
  components:{BoardColumn},
  data(){
    return{
      newColumnName:'',
    }
  },
  computed: {
    ...mapState(['board']),
    isTaskOpen(){
      return this.$route.name === 'task';
    }
  },
  methods:{
    close(){
      this.$router.push({name: 'board'})
    },
    createColumn () {
      this.$store.commit('CREATE_COLUMN', {
        name: this.newColumnName,
      })
      this.newColumnName = ''
    },
  }
}
</script>
<style lang="css">

.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply container absolute;
  background: rgba(0,0,0,0.5);
}
</style>

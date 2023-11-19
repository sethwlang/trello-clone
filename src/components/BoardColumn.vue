<template>
    <div class="column" draggable="true" @drop="moveTaskOrColumn($event, column.tasks), columnIndex" @dragover.prevent
        @dragenter.prevent @dragstart.self="pickupColumn($event, columnIndex)">
        <div class="flex items-center mb-2 font-bold">
            {{ column.name }}
        </div>
        <div class="list-reset">

        </div>
        <ColumnTask v-for="(task, $taskIndex) of column.tasks" :key="$taskIndex" :task="task" :taskIndex="$taskIndex"
            :column="column" :columnIndex="columnIndex" :board="board" />
        <input type="text" class="block p-2 w-full bg-transparent" placeholder="+ Enter new task"
            @keyup.enter="createTask($event, column.tasks)" />
    </div>
</template>
<script>
import ColumnTask from './ColumnTask.vue'
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'
export default {
    mixins: [movingTasksAndColumnsMixin],
    components: { ColumnTask },
    props: {
        column: {
            type: Object,
            required: true,
        },
        columnIndex: {
            type: Number,
            required: true,
        },
        board: {
            type: Object,
            required: true
        }
    },
    methods: {
        pickupColumn(e, columnIndex) {
            e.dataTransfer.effectAllowed = 'move'
            e.dataTransfer.dropEffect = 'move'

            e.dataTransfer.setData('from-column-index', columnIndex)
            e.dataTransfer.setData('type', 'column')
        },
        createTask(e, tasks) {
            this.$store.commit('CREATE_TASK', {
                tasks,
                name: e.target.value
            })
            e.target.value = '';
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
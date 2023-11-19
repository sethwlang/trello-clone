<template>
    <div
    @drop.self="onDrop"
    @dragover.prevent
    @dragenter.prevent
    >
    <slot/>
    </div>
    </template>
    <script>
    export default{
  
            methods:{
                onDrop(e){
                    const transferData = JSON.parse(e.dataTransfer.getData('payload'));
                    this.$emit('drop',transferData);
                }
            }
    }
    </script>
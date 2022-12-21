import Vue from "./Vue/Vue.js";

const vm = new Vue({
    el:"#app",
    data() {
        return {
            message:1,
            // person:{
            //     name:"陈平安"
            // }
        }
    },
    watch:{
        message(newValue,oldValue) {
            console.log(newValue,oldValue);
        },
    }
});

// vm.message++;

console.log(vm);


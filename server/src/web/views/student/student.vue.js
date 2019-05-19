// Define a new component called button-counter
Vue.component("button-counter", {
    data: function() {
        return {
            count: 0
        };
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
});

Vue.component("App", {
    data: function() {
        return {
            count: 0
        };
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
});

new Vue({
    el: "#app",
    // template: "<button-counter/>"
    // data: {
    //     message: "Hello Vue2!"
    // }
    components: {
        App
    },
    render: function(createElement) {
        return createElement(App);
    }
});


const pollApp = {
    data() {
        return {
            step: 1,
            level: 1,
            batteryCounter: 14,
        }
    },
    methods: {
        nextLevel() { setTimeout(() => this.level = 2, 200) },
        nextStep() {
            setTimeout(() => {
                this.step++
                this.level = 1;
            }, 200)
        },
        onAfterEnter(el) {
            console.log(el);
            el.classList.add('active');
        },
        classBind(num) {
            console.log(num <= this.batteryCounter);
            return "green" ? num <= this.batteryCounter : ''
        }
    }
}


const app = Vue.createApp(pollApp);
app.mount('#eco-game');

const pollApp = {
    data() {
        return {
            step: 1,
            level: 1,
            batteryCounter: 14,
            choise: ''
        }
    },
    methods: {
        nextLevel() { setTimeout(() => this.level++, 200) },
        nextStep() {
            setTimeout(() => {
                this.level = 1;
                this.step++;
                this.choise = '';
            }, 200)
        },
        onAfterEnter(el) {
            el.classList.add('active');
        },
        showSelectionModal(e) {
            const targetEl = e.target.closest('.click-selection');
            const targetParent = targetEl.closest('.screen-content');
            const elId = targetEl.dataset.selection;
            const curretModal = targetParent.querySelector(`[data-selection-modal="${elId}"]`);
            curretModal.classList.add('show');
        },

        choiseRes(choise, value) {
            this.choise = choise;
            this.batteryCounter += +value;
            this.level++;
        }
    }
}


const app = Vue.createApp(pollApp);
app.mount('#eco-game');
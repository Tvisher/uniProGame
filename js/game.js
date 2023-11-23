
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
                this.level = 1;
                this.step++
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
        }

    }
}


const app = Vue.createApp(pollApp);
app.mount('#eco-game');

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
            // this.batteryCounter += +value;
            const batteryCounter = this.batteryCounter + (+value);
            if (batteryCounter > 15) {
                this.batteryCounter = 15
            }
            else if (batteryCounter < 0) {
                this.batteryCounter = 0
            }
            else {
                this.batteryCounter = batteryCounter;
            }
            this.level++;
        },
        svgHover(e) {
            const target = e.target;
            const targetId = target.getAttribute('data-segment');
            const targetImage = target.closest('.screen-content').querySelector(`[data-selection="${targetId}"]`);
            targetImage && targetImage.classList.add('trans-anim')
        },
        svgUnhover(e) {
            const target = e.target;
            const targetId = target.getAttribute('data-segment');
            const targetImage = target.closest('.screen-content').querySelector(`[data-selection="${targetId}"]`);
            targetImage && targetImage.classList.remove('trans-anim')
        }
    }
}


const ecoGame = Vue.createApp(pollApp);
ecoGame.mount('#eco-game');



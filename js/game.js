
const pollApp = {
    data() {
        return {
            step: 1,
            level: 1,
            batteryCounter: 14,
            choise: '',
            messages: [
                'Посади дерево! Одно дерево обеспечивает кислородом от 2 до 10 человек.',
                'Сортируй мусор правильно! Нельзя допустить, чтобы наша планета превратилась в одну сплошную свалку.',
                'По возможности отказывайся от бумажных документов в пользу электронных! Для производства одной тонны офисной бумаги необходимо срубить 24 дерева.',
                'Не забывай выключать не нужный в данный момент свет и компьютер после работы! Работающие вхолостую электроприборы приводят к увеличению выброса парниковых газов в атмосферу.',
                'Не забывай выключать воду, когда не пользуешься ею! За минуту из крана может вытечь до 10 литров воды.',
                'Реже используй автотранспорт, больше ходи пешком и передвигайся на велосипеде! Выхлопные газы сильно загрязняют воздух, а физическая активность полезна для здоровья.',
                'Не мусори в общественных местах и на природе! Одна пластиковая бутылка может разлагаться полтысячи лет.',
                'По возможности отказывайся от использования бутылок и посуды из стекла в пользу пластика! При производстве изделий из стекла приходится тратить много энергии и ресурсов.',
                'Чаще принимай душ, реже – ванну! За пять минут в душе расходуется от 30 до 50 литров воды, а чтобы принять ванну, обычно требуется от 150 до 170 литров',
                'Установи на кран специальную насадку – аэратор, который рассеивает воду и позволяет сократить ее расход на 50%.',
                'Используй экономный режим стиральной машины или стирку при +30–40 °C. Откажись от машинной сушки, развешивай вещи на сушилке.',
                'Для мытья посуды используй посудомоечную машину: экономия воды на семью составляет порядка 60 литров в сутки.',
                'Почини кран, если он неисправен! Из капающего смесителя может вытечь до 20 литров воды в сутки.',
                'Используй светодиодные лампы! Они на 50% энергоэффективнее люминесцентных ламп и на 90% – ламп накаливания',
                'Если планируешь покупку новой техники, выбирай приборы с классом энергоэффективности «А».',
                'Утепли стены и окна в доме или поставь энергоэффективные стеклопакеты, если старые уже отслужили свое. Это позволит сохранить тепло в помещении, и дополнительные обогреватели не потребуются',
                'Поставь на батареи терморегуляторы, чтобы не тратить тепло понапрасну! Батареи, которые работают на максимуме, как правило, пересушивают воздух.',
                'Протирай окна, люстры, лампы, чтобы в помещении было светлее! Это поможет тебе дольше находиться при дневном свете.',
                'Заведи домашние растения! Они очищают воздух от избытка углекислого газа и насыщают его кислородом.',
                'Откажись от покупки лишних вещей! Засилье вещей в повседневной жизни людей – это не только серьезная нагрузка на личный бюджет шопоголиков, но и путь к нерациональному использованию ресурсов для производства ненужных товаров и к новым горам мусора.'
            ],
            displayedMessages: [],
            currentMessage: null
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
        },

        displayRandomMessage() {
            if (this.displayedMessages.length === this.messages.length) {
                this.displayedMessages = [];
            }
            let randomIndex = Math.floor(Math.random() * this.messages.length);
            while (this.displayedMessages.includes(randomIndex)) {
                randomIndex = Math.floor(Math.random() * this.messages.length);
            }
            this.currentMessage = this.messages[randomIndex];
            this.displayedMessages.push(randomIndex);
        },
        newMessage() {
            this.displayRandomMessage();
        },
        gameReset() {
            this.batteryCounter = 14;
            this.step = 1;
            this.level = 1;
            this.displayRandomMessage();
            this.displayedMessages = [];
        }
    },
    computed: {
        showBattery() {
            return (this.step >= 3 && this.step != 11 && this.step < 19)
        },
        resultType() {
            if (this.batteryCounter >= 0 && this.batteryCounter <= 6) {
                return 'low';
            } else if (this.batteryCounter >= 7 && this.batteryCounter <= 11) {
                return 'middle';
            } else if (this.batteryCounter >= 12 && this.batteryCounter <= 15) {
                return 'hight';
            } else {
                return '';
            }
        }
    },
    watch: {
        step() {
            console.log(this.step);
            if (this.step == 19) {
                setTimeout(() => this.step += 1, 10000)
            }
        },
    },

    mounted() {
        this.displayRandomMessage();
        setTimeout(() => {
            document.querySelector('.eco-game__content').classList.add('game-start')
        }, 200);
    },
}


const ecoGame = Vue.createApp(pollApp);
ecoGame.mount('#eco-game');



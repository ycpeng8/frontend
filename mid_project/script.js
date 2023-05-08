const Api = (()=>{
    const url = 'https://random-word-api.herokuapp.com/word';
    const getData = () => {
        return fetch(url)
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error("Request failed! Use local word instead")
                        }
                        return res.json()
                    }).catch((err) => {
                        console.log("Error: ", err);
                        // If API is down, randomly select a word from local datas 
                        const datas = [
                            "ballot",
                            "soil",
                            "legislation",
                            "valley",
                            "country",
                            "nail",
                            "piano",
                            "speech",
                            "efflux",
                            "reason",
                            "alcohol",
                            "stable",
                            "slice",
                            "situation",
                            "profession",
                            "restaurant",
                            "pocket",
                            "satisfaction",
                            "condition",
                            "comfortable"
                        ];
                        const randomIndex = Math.floor(Math.random() * datas.length);
                        const word = new Promise((resolve, reject) => {
                            resolve([datas[randomIndex]]);
                        });
                        return word
                    });
    };

    return {
        getData     // Promise
    }
})();

const View = (()=>{
    let domSelector = {
        timeLeft: "#timeLeft",
        fail: "#fail",
        word: "#word",
        inputBox: "#guessText",
        btn:"#newGameBtn",
        history: "#guessList"
    }

    const createWordTmp = (word)=>{
        let word_tmp = '';
        word_tmp += `${word}`;
        return word_tmp;
    }

    const createFailTmp = (fail)=>{
        let fail_tmp = '';
        fail_tmp += `${fail}`;
        return fail_tmp;
    }

    const emptyInput = ()=>{
        document.getElementById("guessText").value = "";
    }

    const timerTmp = (time)=>{
        let timer_tmp = '';
        timer_tmp += `${time}`;
        return timer_tmp;
    }

    const historyTmp = (guessDict)=>{
        let history_tmp = '';
        Object.keys(guessDict).forEach((guess)=>{
            history_tmp += `<li style="color:${guessDict[guess]};">${guess}</li>`;
        });
        return history_tmp;
    }

    const render = (ele, template)=>{
        ele.innerHTML = template;
    }

    return {
        domSelector,
        createWordTmp,
        createFailTmp,
        emptyInput,
        timerTmp,
        historyTmp,
        render
    }
})();

const Model = ((api, view)=>{
    const { domSelector, createWordTmp, createFailTmp, emptyInput, timerTmp, historyTmp, render } = view;
    const { getData } = api;

    class State{
        constructor(){
            this._fail = 0;
            this._word = '';
            this._hidden_letters = {};
            // hidden_letters {key: index, value: letter}
            this._success = 0;
            this._empty_input = true;
            this._guessing_word = '';
            this._full_word = '';
            this._timer = 60;
            this._history = {};
            // history {key: guess, value: color}
        }

        get getFail(){
            return this._fail;
        }

        set newFail(newNum){
            this._fail = newNum;
            let fail_selector = document.querySelector(domSelector.fail);
            let fail_tmp = createFailTmp(this._fail);
            render(fail_selector, fail_tmp);
        }

        get getWord(){
            return this._word;
        }

        set newWord(newWord){
            // randomly conseal letters
            let hidden_letters = {};
            let hidden_letters_index = [];
            let word_length = newWord.length;
            let hidden_letters_num = Math.floor(Math.random() * word_length);

            this._full_word = newWord;

            // make sure there is at least one hidden letter and not all letters are hidden
            if (hidden_letters_num === 0) 
            {
                hidden_letters_num = 1;
            } else if (hidden_letters_num === word_length)
            {
                hidden_letters_num = word_length - 1;
            }

            console.log(newWord);
            for (let i = 0; i < hidden_letters_num; i++) {
                let randomIndex = Math.floor(Math.random() * word_length);
                if (!hidden_letters_index.includes(randomIndex)) {
                    hidden_letters_index.push(randomIndex);
                    hidden_letters[randomIndex] = newWord[randomIndex];
                    newWord = newWord.slice(0, randomIndex) + '_' + newWord.slice(randomIndex + 1);
                }
            }
            console.log(hidden_letters);
            
            this._word = newWord;
            this._hidden_letters = hidden_letters;
            // render word
            let word_selector = document.querySelector(domSelector.word);
            let word_tmp = createWordTmp(this._word);
            render(word_selector, word_tmp);
        }

        get getGuessingWord(){
            return this._guessing_word;
        }

        set newGuessingWord(newWord){
            this._guessing_word = newWord;
            let word_selector = document.querySelector(domSelector.word);
            let word_tmp = createWordTmp(this._guessing_word);
            render(word_selector, word_tmp);
        }

        get getFullWord(){
            return this._full_word;
        }

        set newFullWord(newWord){
            this._full_word = newWord;
        }

        get getHiddenLetters(){
            return this._hidden_letters;
        }

        set newHiddenLetters(newLetters){ 
            this._hidden_letters = newLetters;
        }

        get getSuccess(){
            return this._success;
        }

        set newSuccess(newNum){
            this._success = newNum;
        }

        get getEmptyInput(){
            return this._empty_input;
        }

        set newEmptyInput(newBool){
            emptyInput();
            this._empty_input = newBool;
        }

        get getTimer(){
            return this._timer;
        }

        set newTimer(newTime){
            this._timer = newTime;
            let timer_selector = document.querySelector(domSelector.timeLeft);
            let timer_tmp = timerTmp(this._timer);
            render(timer_selector, timer_tmp);
        }

        get getHistory(){
            return this._history;
        }

        set newHistory(newHistory){
            this._history = newHistory;
            let history_selector = document.querySelector(domSelector.history);
            let history_tmp = historyTmp(this._history);
            render(history_selector, history_tmp);
        }

    }

    return {
        State,
        getData
    }
})(Api, View);

const Controller = ((view, model)=>{
    const {domSelector} = view;
    const {State, getData} = model;

    const state = new State();
    let timeId = null;

    // timer control
    const startTimer = () => {
        timeId = setInterval(() => {
            let timeLeft = state.getTimer - 1;
            if (timeLeft < 0) {
                alert("Time Out! You have guessed " + String(state.getSuccess) + " words!");
                state.newFail = 0;
                state.newSuccess = 0;
                state.newHiddenLetters = {};
                state.newFullWord = '';
                state.newGuessingWord = '';
                state.newTimer = 60;
                state.newHistory = {};
                const newData = Api.getData();
                newData.then((data) => {
                    state.newWord = data[0]
                });
                clearInterval(timeId);
                startTimer();
            }
            else
            {
                state.newTimer = timeLeft;
            }
        }, 1000);
    }

    const stopTimer = () => {
        clearInterval(timeId);
    }

    const init = () => {
        state.newFail = 0;
        const newData = Api.getData();
        newData.then((data) => {
            state.newWord = data[0]
        });
        startTimer();
    }

    const checkHistory = (guess, history) => {
        for (let letter in history)
        {
            if (letter === guess)
            {
                alert("You have already guessed this letter!")
                return true; // exist in history
            }
        }
        return false;
    }

    // Add event listeners
    const addGuess = () => {
        const userGuess = document.querySelector(domSelector.inputBox);
        const btn = document.querySelector(domSelector.btn);

        // inputBox control
        userGuess.addEventListener('keyup', ({key}) => {
            if (key === "Enter") 
            {
                let guess = userGuess.value;
                let hidden_letters = state.getHiddenLetters;
                let history = state.getHistory;
                let after_guess_hidden_letters = {};
                Object.keys(hidden_letters).filter(key => hidden_letters[key] !== guess )
                                           .forEach(key => after_guess_hidden_letters[key] = hidden_letters[key]);
                if (Object.keys(after_guess_hidden_letters).length === Object.keys(hidden_letters).length) 
                {
                    // guess wrong
                    if (!checkHistory(guess, history))
                    {
                        let fail = state.getFail + 1;
                        state.newHistory = {...history, [guess]: 'red'};
                        if (fail === 11) 
                        {
                            // Game over and start new game
                            stopTimer();
                            alert("Game over! You have guessed " + String(state.getSuccess) + " words!");
                            state.newFail = 0;
                            state.newSuccess = 0;
                            state.newHiddenLetters = {};
                            state.newFullWord = '';
                            state.newGuessingWord = '';
                            state.newTimer = 60;
                            state.newHistory = {};
                            const newData = Api.getData();
                            newData.then((data) => {
                                state.newWord = data[0]
                            });
                            startTimer();
                        }
                        else
                        {
                            // guess wrong but not game over, continue...
                            state.newFail = fail;
                        }
                    }
                }
                else
                {
                    // guess right
                    if (!checkHistory(guess, history))
                    {
                        if (Object.keys(after_guess_hidden_letters).length === 0)
                        {
                            // There is no hidden letter left and give a new word
                            state.newHistory = {...history, [guess]: 'blue'};
                            state.newSuccess = state.getSuccess + 1;
                            state.newGuessingWord = state.getFullWord;
                            const newData = Api.getData();
                            newData.then((data) => {
                                state.newWord = data[0]
                            });
                            state.newHistory = {};
                            state.newFullWord = '';
                            state.newHiddenLetters = {};
                        }
                        else
                        {
                            // There are still hidden letters left and continue working on the current word
                            let fullWord = state.getFullWord;
                            let afterGuessWord = fullWord;
                            for (let index in after_guess_hidden_letters)
                            {
                                afterGuessWord = afterGuessWord.slice(0, index) + '_' + afterGuessWord.slice(parseInt(index) + 1);
                            }
                            state.newGuessingWord = afterGuessWord;
                            state.newHiddenLetters = after_guess_hidden_letters;
                            state.newHistory = {...history, [guess]: 'blue'};
                        }
                    }
                }
                state.newEmptyInput = true;
            }
        });

        // new game button control
        btn.addEventListener('click', ()=>{
            state.newFail = 0;
            state.newSuccess = 0;
            state.newHiddenLetters = {};
            state.newFullWord = '';
            state.newGuessingWord = '';
            state.newHistory = {};
            stopTimer();
            state.newTimer = 60;
            const newData = Api.getData();
            newData.then((data) => {
                state.newWord = data[0]
            });
            startTimer();
        });

    }
    
    const bootstrap = () => {
        init();
        addGuess();
    }

    return {
        bootstrap
    }
})(View, Model);

Controller.bootstrap();

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
        fail: "#fail",
        word: "#word",
        inputBox: "#guessText",
        btn:"#newGameBtn"
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

    const render = (ele, template)=>{
        ele.innerHTML = template;
    }

    return {
        domSelector,
        createWordTmp,
        createFailTmp,
        render
    }
})();

const Model = ((api, view)=>{
    const { domSelector, createWordTmp, createFailTmp, render } = view;
    const { getData } = api;

    class State{
        constructor(){
            this._fail = 0;
            this._word = '';
            this._hidden_index = [];
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
            this._word = newWord;
            let word_selector = document.querySelector(domSelector.word);
            let word_tmp = createWordTmp(this._word);
            render(word_selector, word_tmp);
        }

        get getHiddenIndex(){
            return this._hidden_index;
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

    let word = '';

    const state = new State();
    const init = () => {
        state.newFail = 0;
        const newData = Api.getData();
        newData.then((data) => {
            state.newWord = data[0]
        });
    }

    // Add event listeners
    const addGuess = () => {
        const userGuess = document.querySelector(domSelector.inputBox);
        const btn = document.querySelector(domSelector.btn);

        userGuess.addEventListener('keyup', ({key}) => {
            if (key === "Enter") {
                let guess = userGuess.value;
            }
        });

        btn.addEventListener('click', ()=>{
            state.newFail = 0;
            const newData = Api.getData();
            newData.then((data) => {
                state.newWord = data[0]
            });
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


// function showWarning() {
//     alert("This is a browser warning message.");
// }

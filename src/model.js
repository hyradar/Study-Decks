import {isFuture} from 'date-fns';

export const model = (function(){

    const Card = {

        doSomething: function() {
            console.log(`im trying to do something`);
        }
    };

    const card1= Object.assign(Object.create(Card), {
        imagesrc: 'images/learning-color.svg',
        title: 'Decks Created',
        underlinecolor: 'greencardunderline',
        statistic: '18',
    });

    const card2 = Object.assign(Object.create(Card), {
        imagesrc: 'images/education-color.svg',
        title: 'Card 2 Title',
        underlinecolor: 'bluecardunderline',
        statistic: '73',
    });

    const card3 = Object.assign(Object.create(Card), {
        imagesrc: 'images/study-desk-color.svg',
        title: 'Card 3 Title',
        underlinecolor: 'brickcardunderline',
        statistic: '9',
    });

    const card4 = Object.assign(Object.create(Card), {
        imagesrc: 'images/study-lamp-color.svg',
        title: 'Card 4 Title',
        underlinecolor: 'sunshinecardunderline',
        statistic: '100',
    });

    const overviewCards = [card1, card2, card3, card4];

    const Deck = {
        name: 'default name',
        description: 'default description',
        dueDate: 'default dueDate',
        category: 'default category',
        print: function () {
            console.log(`printing from inside Deck`);
        },
    };

    const frenchDeck = Object.assign(Object.create(Deck), {
        name: 'French',
        description: 'A deck to learn French',
        numberOfQuestions: 10,
        dueDate: 'some time date thing',
        category: 'Languages',
        questionsList: [],
    });
    
    let currentPage = '';

    function setCurrentPage(page) {
        currentPage = page;
    }

    function getCurrentPage() {
        return currentPage;
    }

    function setStyles() {
        const deck = localStorage.getItem('newdeck');
    };

    function populateStorage(deck) {
        localStorage.setItem(deck.name, JSON.stringify(deck));
        setStyles();
    };

    function addDeckToLocalStorage() {
        const myFormData = new FormData(document.querySelector('.modal-form'));
        const formDataObj = Object.fromEntries(myFormData.entries());
    
        const newDeck = Object.assign(Object.create(Deck), {
            name: formDataObj.deckname,
            category: formDataObj.deckcategory,
            description: formDataObj.deckdescription,
            dueDate: formDataObj.deckduedate,
        });
    
        populateStorage(newDeck);
    };

    function getLocalStorage() {
        const deckArray = [];

          for (let i = 0; i < localStorage.length; i++) {
                const deck = JSON.parse(localStorage.getItem(localStorage.key(i)));
                deckArray.push(deck);
            }
            return deckArray;
    }

    const Validator = {
        data: null,
        element: null,
        isValid: false,

        setData: function(element, data) {
            this.element = element;
            this.data = data;
        },

        setValidityClass: function() {
                if (this.isValid) {
                    this.element.classList.remove('invalid');
                }
                else {
                    this.element.classList.add('invalid');
                }
        },

        displayWarning: function() {
            this.element.setCustomValidity('This field is invalid');
            this.element.reportValidity();
        },
    };

    const nameValidator = Object.assign(Object.create(Validator), {
        nameLengthIsValid: false,
        nameIsAvailable: false,

        checkValidity: function() {
            this.checkLength();
            this.checkNameAvailability(this.inputValue);
            if (this.nameLengthIsValid && this.nameIsAvailable) {
                this.isValid = true;
            }
            else {this.isValid = false};
        },

        checkLength: function () {
            this.nameLengthIsValid = this.data.length > 0 ? true : false;
        },

        checkNameAvailability: function() {
                const existingDeckName = Object.keys(localStorage).find(item => item === this.data);
                this.nameIsAvailable = existingDeckName !== this.data ? true: false;
        },

        displayWarning: function() {
            if (!this.nameLengthIsValid) {
                this.element.setCustomValidity('Name must be at least 1 character long');
                this.element.reportValidity();
                return;
            }
            else if (!this.nameIsAvailable) {
                this.element.setCustomValidity('Deck already exists, choose a different name');
                this.element.reportValidity();
            }
        }
    });

    const categoryValidator = Object.assign(Object.create(Validator), {

        checkValidity: function() {
            this.isValid = this.data !== '' ? true : false;
        },

        displayWarning: function() {
                this.element.setCustomValidity('Please choose a category');
                this.element.reportValidity();
        },
    });

    const dateValidator = Object.assign(Object.create(Validator), {

        checkValidity: function() {
            const userInput = this.convertDateData(this.data);
            this.isValid = isFuture(userInput);
        },

        convertDateData: function(dateData) {
            const array = dateData.split('-');
            const year = array[0];
            const month = array[1];
            const day = array[2];
            return new Date(`${year}/${month}/${day}`);
        },

        displayWarning: function() {
                this.element.setCustomValidity('Date must be in the future');
                this.element.reportValidity();
        },
    });

    return {
        addDeckToLocalStorage,
        getLocalStorage,
        overviewCards,
        nameValidator,
        categoryValidator,
        dateValidator,
        getCurrentPage,
        setCurrentPage,
    };
})();


// Question Object
// const frenchQuestionOne = {
//     question: 'How do you say \'a cat\' in French?',
//     answer: 'Un chat'
// };

//Now that I have the new deck object, I need to:
//Add it to the cateogory and the complete deck list
//Update the DOM (Do this through the Controller)

//Pushes deck to Associated Category and to Complete Deck List

// let categoryLanguages = [];
// function pushDeckToLists(deck) {
//     categoryLanguages.push(deck);
// }
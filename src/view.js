import { setAttributes } from "./helpers";
import { addDeckFunction } from "./index";

const main = document.querySelector('main');

//End Menu Button Logic

//Create Array of Main's Children and remove them
export function removeMainTagContent () {
    
    const mainChildren = Array.from(document.querySelector('.main').children);
    mainChildren.forEach(element => {
        element.remove();
    });
};

export function generateHomePage() {

    //get openbutton and add toggleNav function / same for closebutton
    const openNavButton = document.getElementById('opennavbtn');
    const openNavButtonImage = document.getElementById('opennavbuttonimage');

    openNavButton.addEventListener('click', toggleNav);

    //Overview Section
    const overviewSection = document.createElement('section');
    overviewSection.className = 'overview'

    const overviewSectionTitle = document.createElement('h1');
    overviewSectionTitle.innerText = 'Overview';
    overviewSectionTitle.id = 'overviewsectiontitle';

    const rowOfCardsDiv = document.createElement('div');
    rowOfCardsDiv.className = 'rowofcards';

    //Temporary PlaceHolder Card Information
    const card1 = {
        imagesrc: 'images/learning-color.svg',
        title: 'Decks Created',
        underlinecolor: 'greencardunderline',
        statistic: '18',
    };

    const card2 = {
        imagesrc: 'images/education-color.svg',
        title: 'Card 2 Title',
        underlinecolor: 'bluecardunderline',
        statistic: '73',
    };

    const card3 = {
        imagesrc: 'images/study-desk-color.svg',
        title: 'Card 3 Title',
        underlinecolor: 'brickcardunderline',
        statistic: '9',
    };

    const card4 = {
        imagesrc: 'images/study-lamp-color.svg',
        title: 'Card 4 Title',
        underlinecolor: 'sunshinecardunderline',
        statistic: '100',
    };

    const overviewCards = [card1, card2, card3, card4];
    overviewCards.forEach((element) => {
        const OuterDiv = document.createElement('div');
        OuterDiv.className = 'overviewcard';

        const innerDiv = document.createElement('div');
        
        const image = document.createElement('img');
        image.src = element.imagesrc;

        const title = document.createElement('h3');
        title.innerText = element.title;
 
        const statisticContainer = document.createElement('p');
        statisticContainer.className = element.underlinecolor;
        statisticContainer.innerText = element.statistic;

        //Constructing InnerDiv
        innerDiv.append(image, title);

        //Constructing OuterDiv
        OuterDiv.append(innerDiv, statisticContainer);

        //Append card to rowOfCardsDiv
        rowOfCardsDiv.appendChild(OuterDiv);
    });

    //Your Decks Section
    const yourDecksSection = document.createElement('section');
    const yourDecksTitle = document.createElement('h1');
    yourDecksTitle.innerText = 'Top Decks';
    yourDecksTitle.id = 'yourdeckstitle';

    const deckDisplayDiv = document.createElement('div');
    deckDisplayDiv.className = 'deckdisplay';

    const deck1 = 'deck1';
    const deck2 = 'deck2';
    const deck3 = 'deck3';
    const decks = [deck1, deck2, deck3];

    decks.forEach((element) => {
        const deckDiv = document.createElement('div');
        deckDiv.className = 'deck';

        const deckImageAndNameDiv = document.createElement('div');
        deckImageAndNameDiv.className = 'deckimageandname';

        const deckImage = document.createElement('img');
        setAttributes(deckImage, {
            'src': 'gridcheckmark.svg',
            'alt': 'click here to see this decks info',
        });

        const deckName = document.createElement('h3');
        deckName.id = element;

        deckImageAndNameDiv.append(deckImage, deckName);

        const deckInfoButton = document.createElement('img');
        setAttributes(deckInfoButton, {
            'src': 'chevron-down.svg',
            'alt': 'click here to see this decks info',
            'class': 'deckinfomenubuttonimage',
        });

        deckDiv.append(deckImageAndNameDiv, deckInfoButton);
        deckDisplayDiv.appendChild(deckDiv);
    });

    //Appending Sections
    yourDecksSection.append(yourDecksTitle, deckDisplayDiv);
    overviewSection.append(overviewSectionTitle, rowOfCardsDiv);

    //Appending the sections to main
    main.append(overviewSection, yourDecksSection);

};

export function generateMenuButtonEventListeners(id) {

    removeMainTagContent();
    toggleNav();

    switch (id) {
        case 'overviewoption':
             generateHomePage();
            break;
        case 'adddeckoption':
            generateAddDeckPage();
    }

}

export function generateAddDeckPage () {
    
    const main = document.querySelector('.main');

    const triggerButton = document.createElement('button');
    triggerButton.id = 'myBtn';
    triggerButton.className = 'adddeckbutton';
    triggerButton.innerText = 'Add a Deck';
    triggerButton.onclick = function() {
        modalDiv.style.display = 'block';
    }

    const addDeckPageTitle = document.createElement('h1');
    addDeckPageTitle.innerText = 'Decks';
    addDeckPageTitle.id = 'adddeckpapetitle';

    generateModal();
    main.appendChild(addDeckPageTitle);
    main.appendChild(triggerButton);
};

function generateModal() {

    //Start Creating Modal
    const modalDiv = document.createElement('div');
    modalDiv.id = 'myModal';
    modalDiv.className = 'modal';
    modalDiv.style.display = 'none';
    
    //Modal Content
    const modalContentDiv = document.createElement('div');
    modalContentDiv.className = 'modal-content';

    //Modal Header
    const modalHeaderDiv = document.createElement('div');
    modalHeaderDiv.className = 'modal-header';

    //Modal Span / X to Close
    const modalSpan = document.createElement('span');
    modalSpan.innerHTML = '&times;';
    modalSpan.onclick = function() {
        modalDiv.style.display = 'none';
    }
    window.onclick = function(event) {
        if (event.target == modalDiv) {
            modalDiv.style.display = 'none';
        }
    }

    //Header
    const modalHeader = document.createElement('h5');
    modalHeader.innerText = 'New Deck'

    //Body
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';

    //Form
    const form = document.createElement('form');
    form.className = 'modal-form';
    form.action = '';

    //Name Input
    const nameInputLabel = document.createElement('label');
    nameInputLabel.htmlFor = 'deckname';
    nameInputLabel.innerText = 'Deck Name:'
    const nameInput = document.createElement('input');
    
    setAttributes(nameInput, {
        'name': 'deckname',
        'id': 'deckname',
        'class': 'deckname',
    });

    //Description Input
    const descriptionLabel = document.createElement('label');
    descriptionLabel.htmlFor = 'deckdescription';
    descriptionLabel.innerText = 'Description:';
    const descriptionInput = document.createElement('textarea');
    setAttributes(descriptionInput,
        {
            'id': 'deckdescription',
            'class': 'deckdescription',
            'name': 'deckdescription',
            'rows': '4',
            'cols': '20',
            'maxLength': '150',
        });

    //Due Date Input
    const dueDateLabel = document.createElement('label');
    dueDateLabel.htmlFor = 'deckduedate';
    dueDateLabel.innerText = 'Due Date:';
    const dueDateInput = document.createElement('input');
    setAttributes(dueDateInput, {
        'id': 'deckduedate',
        'name': 'deckduedate',
        'class': 'deckduedate',
    });

    //# of Cards Input
    const categoryLabel = document.createElement('label');
    categoryLabel.htmlFor = 'deckcategory';
    categoryLabel.innerText = 'Category';
    
    const category = document.createElement('input');
    setAttributes(category, {
        'id': 'deckcategory',
        'name': 'deckcategory',
        'class': 'deckcategory',
        'list': 'categorylist',
    });

    const categoryDataList = document.createElement('datalist');
    categoryDataList.id = 'categorylist';

    const optionLanguage = document.createElement('option');
    optionLanguage.value = 'Languages';

    const optionWebDevelopment = document.createElement('option');
    optionWebDevelopment.value = 'Web Development';

    const optionMusic = document.createElement('option');
    optionMusic.value = 'Music';

    categoryDataList.append(optionLanguage, optionWebDevelopment, optionMusic);

    //Submit button
    const formSubmitButton = document.createElement('input');
    formSubmitButton.addEventListener('click', addDeckFunction);
    setAttributes(formSubmitButton, {
        'type': 'submit',
        'value': 'Add Deck',
        'class': 'submitbutton',
    });
    
    formSubmitButton.onclick = function(event) {
        if (event.target == this) {
            modalDiv.style.display = 'none';
        }
    }
    
    //Append the Modal to the MainPage Div
    main.appendChild(modalDiv);
    //Append HeaderDiv + BodyDiv to ContentDiv
    modalContentDiv.append(modalHeaderDiv, modalBody);
    //Append h5 + Span to HeaderDiv
    modalHeaderDiv.append(modalHeader, modalSpan);
    //Append ContentDiv to Modal
    modalDiv.appendChild(modalContentDiv);
    //Append Form to BodyDiv
    modalBody.appendChild(form);
    //Append Items to Form
    form.append(
        nameInputLabel, nameInput,
        descriptionLabel, descriptionInput,
        dueDateLabel, dueDateInput,
        categoryLabel, category, categoryDataList,
        formSubmitButton);
};

export function toggleNav() {
    
    const sideNav = document.getElementById('mySidenav');
    sideNav.classList.toggle('active');
    console.log('firing');
}


//This is janky as funk but at least it works as a prototype
export function changeTabColor (id) {

    switch (id) {
        case 'leftoverviewbutton':
            document.getElementById('leftoverviewbutton').style.borderTop = '1px solid blue';
            document.getElementById('overviewh3').style.color = 'blue';

            document.getElementById('rightstudybutton').style.borderTop = 'none';
            document.getElementById('aboutbutton').style.borderTop = 'none';
            document.getElementById('studyh3').style.color = 'grey';
            document.getElementById('abouth3').style.color = 'grey';
            break;

        case 'rightstudybutton':
            document.getElementById('rightstudybutton').style.borderTop = '1px solid blue';
            document.getElementById('studyh3').style.color = 'blue';

            document.getElementById('leftoverviewbutton').style.borderTop = 'none';
            document.getElementById('aboutbutton').style.borderTop = 'none';
            document.getElementById('overviewh3').style.color = 'grey';
            document.getElementById('abouth3').style.color = 'grey';
            break;
        
        case 'aboutbutton':
            document.getElementById('aboutbutton').style.borderTop = '1px solid blue';
            document.getElementById('abouth3').style.color = 'blue';

            document.getElementById('leftoverviewbutton').style.borderTop = 'none';
            document.getElementById('rightstudybutton').style.borderTop = 'none';
            document.getElementById('overviewh3').style.color = 'grey';
            document.getElementById('studyh3').style.color = 'grey';
            break;
    }
}

export function generateAboutPage() {
    let aboutPageTitle = document.createElement('h1');
    aboutPageTitle.innerText = 'About Page';
    main.appendChild(aboutPageTitle);
}
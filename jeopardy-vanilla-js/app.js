const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')

const jeopardyCategories = [
    {
        genre: "WHO",
        questions: [
            {
                question: 'Who sings 7 summers?',
                answers: ['Morgan Wallen', 'Luke Bryan'],
                correct: 'JK Rowling',
                level: 'easy'
            },
            {
                question: 'Who sings All yourn?',
                answers: ['Tyler Childers', 'Zach Brian'],
                correct: 'Tyler Childers',
                level: 'easy'
            },
            {
                question: 'Who whrote the Chronicles of Narnia',
                answers: ['C.S. Lewis', 'J.K. Rowling'],
                correct: 'King Charles III',
                level: 'medium'
            },
            {
                question: 'Who was the 17th president',
                answers: ['Andrew Johnson', 'Rutherford B. Hayes'],
                correct: 'Andrew Johnson',
                level: 'hard'
            },
            {
                question: 'Who was the 14th president of the USA?',
                answers: ['Franklin Pierce', 'James Buchanan'],
                correct: 'Franklin Pierce',
                level: 'hard'
            },
        ],
    },
    {
        genre: "WHERE",
        questions: [
            {
                question: 'Where is Corpus Christi',
                answers: ['Texas', 'Utah'],
                correct: 'Texas',
                level: 'easy'
            },
            {
                question: 'Where is the Statue of Liberty?',
                answers: ['New York', 'Pensylvania'],
                correct: 'New York',
                level: 'easy'
            },
            {
                question: 'Where is the country Tuvalu',
                answers: ['Oceania', 'Australia'],
                correct: 'Oceania',
                level: 'medium'
            },
            {
                question: 'Where is ?',
                answers: ['Northern Africa', 'West Africa'],
                correct: 'West Africa',
                level: 'hard'
            },
            {
                question: 'What is thew Capital of Lebanon?',
                answers: ['Beirut', 'Sidon'],
                correct: 'Beirut',
                level: 'hard'
            },
        ]
    },
    {
        genre: "WHEN",
        questions: [
            {
                question: 'When was the first landing on the moon?',
                answers: ['July 18, 1969', 'July 20, 1969'],
                correct: 'July 20, 1969',
                level: 'easy'
            },
            {
                question: 'When was Joe Biden elected?',
                answers: ['Tuesday, November 3, 2020', 'Wednesday, November 3, 2020'],
                correct: 'Tuesday, November 3, 2020',
                level: 'easy'
            },
            {
                question: 'When was the declaration of independance signed?',
                answers: ['1776', '1775'],
                correct: '1776',
                level: 'medium'
            },
            {
                question: 'When was the I have a Dream speech',
                answers: ['August 28, 1964', 'August 28, 1963'],
                correct: 'August 28, 1963',
                level: 'hard'
            },
            {
                question: 'When was the United States Constitution made?',
                answers: ['1787', '1789'],
                correct: '1787',
                level: 'hard'
            },
        ],
    },
    {
        genre: "WHAT",
        questions: [
            {
                question: 'What are the American Flag Colors?',
                answers: ['Red White and Purple', 'Red White and Blue'],
                correct: 'Red White and Blue',
                level: 'easy'
            },
            {
                question: 'What languages do they speak in Mexico?',
                answers: ['Spanish', 'Chinese'],
                correct: 'Spanish',
                level: 'easy'
            },
            {
                question: 'Where is the country Tuvalu',
                answers: ['Australia', 'Oceania'],
                correct: 'Oceania',
                level: 'medium'
            },
            {
                question: 'Where is Cote divoire?',
                answers: ['Northern Africa', 'West Africa'],
                correct: 'West Africa',
                level: 'hard'
            },
            {
                question: 'What are the first 10 digits of pi?',
                answers: ['3.1415826535', '3.1415926535'],
                correct: '3.1415926535',
                level: 'hard'
            },
        ],
    },
    {
        genre: "HOW MANY",
        questions: [
            {
                question: 'How many states are there in the USA?',
                answers: ['50', '51'],
                correct: '50',
                level: 'easy'
            },
            {
                question: 'How many countries in the world 2022?',
                answers: ['195', '201'],
                correct: '195',
                level: 'easy'
            },
            {
                question: 'How many people live in the USA?',
                answers: ['About 333 million', 'About 332 million'],
                correct: 'About 332 million',
                level: 'medium'
            },
            {
                question: 'How many people are there in the country Vatican City?',
                answers: ['153', '510'],
                correct: '510',
                level: 'hard'
            },
            {
                question: 'How many countries are there in North America',
                answers: ['23', '3'],
                correct: '23',
                level: 'hard'
            },
        ],
    },
]

let score = 0

function addCategory(category) {
    const column = document.createElement('div')
    column.classList.add('genre-column')

    const genreTitle = document.createElement('div')
    genreTitle.classList.add('genre-title')
    genreTitle.innerHTML = category.genre

    column.appendChild(genreTitle)
    game.append(column)

    category.questions.forEach(question => {
        const card = document.createElement('div')
        card.classList.add('card')
        column.append(card)

        if (question.level === 'easy') {
            card.innerHTML = 25
        }
        if (question.level === 'medium') {
            card.innerHTML = 50
        }
        if (question.level === 'hard') {
            card.innerHTML = 100
        }

        card.setAttribute('data-question', question.question)
        card.setAttribute('data-answer-1', question.answers[0])
        card.setAttribute('data-answer-2', question.answers[1])
        card.setAttribute('data-correct', question.correct)
        card.setAttribute('data-value', card.getInnerHTML())

        card.addEventListener('click', flipCard)
    })
}

jeopardyCategories.forEach(category => addCategory(category))

function flipCard() {
    this.innerHTML = ""
    this.style.fontSize = "15px"
    this.style.lineHeight = "30px"
    const textDisplay = document.createElement('div')
    textDisplay.classList.add('card-text')
    textDisplay.innerHTML = this.getAttribute('data-question')
    const firstButton = document.createElement('button')
    const secondButton = document.createElement('button')
    firstButton.classList.add('first-button')
    secondButton.classList.add('second-button')
    firstButton.innerHTML = this.getAttribute('data-answer-1')
    secondButton.innerHTML = this.getAttribute('data-answer-2')
    firstButton.addEventListener('click', getResult)
    secondButton.addEventListener('click', getResult)
    this.append(textDisplay, firstButton, secondButton)

    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.removeEventListener('click', flipCard))
}

function getResult() {
    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.addEventListener('click', flipCard))

    const cardOfButton = this.parentElement

    if (cardOfButton.getAttribute('data-correct') == this.innerHTML) {
        score = score + parseInt(cardOfButton.getAttribute('data-value'))
        scoreDisplay.innerHTML = score
        cardOfButton.classList.add('correct-answer')
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = cardOfButton.getAttribute('data-value')
        }, 100)
    } else {
        cardOfButton.classList.add('wrong-answer')
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = 0
        }, 100)
    }
    cardOfButton.removeEventListener('click', flipCard)

}


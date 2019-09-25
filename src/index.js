import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, withRouter} from 'react-router-dom'
import {shuffle, sample} from 'lodash'

import "./index.css";
import AuthorQuiz from "./AuthorQuiz";
import AddAuthorForm from './AddAuthorForm'
import * as serviceWorker from "./serviceWorker";


const authors = [{
    name: 'Mark Twain',
    imageUrl: 'images/authors/marktwain.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['The Adventures of Huckebberry Finn', 'Life on Mississipi', 'Grinding it out']
},{
    name: 'Joseph Conrad',
    imageUrl: 'images/authors/josephconrad.png',
    imageSource: 'Wikimedia Commons',
    books: ['Heart of Darkness']
  },
  {
    name: 'J.K. Rowling',
    imageUrl: 'images/authors/jkrowling.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Daniel Ogren',
    books: ['Harry Potter and the Sorcerers Stone']
  },
  {
    name: 'Stephen King',
    imageUrl: 'images/authors/stephenking.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Pinguino',
    books: ['The Shining', 'IT']
  },
  {
    name: 'Charles Dickens',
    imageUrl: 'images/authors/charlesdickens.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['David Copperfield', 'A Tale of Two Cities']
  },
  {
    name: 'William Shakespeare',
    imageUrl: 'images/authors/williamshakespeare.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
  }]


const getTurnData = (authors) => {
    const allBooks = authors.reduce((acc, author, index) => (acc.concat(author.books)), [])
    const fourRandomBooks = shuffle(allBooks).slice(0,4)
    const answer = sample(fourRandomBooks)
    return {
        books: fourRandomBooks,
        author: authors.find(author => author.books.some((title) => title === answer))
    }
}


const resetState = () => {
  return {
    turnData: getTurnData(authors),
    highlight: '' 
  }
}

let state = resetState()

const onAnswerSelected = (answer) => {
    const isCorrect = state.turnData.author.books.some((book)=> book === answer)
    state.highlight = isCorrect ? 'correct': 'wrong'
    render();
}

const onContinue = () => {
  state = resetState()
  console.log('cont')
  render();
}

function App() {
  return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} onContinue={onContinue}/>
}

const addAuthorWrapper = withRouter(({ history }) => {
  return <AddAuthorForm onAddAuthor={(author) => {
    authors.push(author)
    history.push('/')
  }} />
})

const render = () => {
  ReactDOM.render(<BrowserRouter>
      <Route exact path ='/' component={App}/>
      <Route path ="/add" component={addAuthorWrapper}/>
    </BrowserRouter>, document.getElementById("root"))}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some psitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
render();
serviceWorker.unregister();

import Intro from "./Intro"
import Main from "./Main"
import { useState, useEffect } from "react";
import {nanoid} from "nanoid"

function App() {

  const [page, setPage] = useState([])

  const [quiz, setQuiz] = useState([])

  const [newQuiz, setNewQuiz] = useState(true)

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
    .then(res => res.json())
    .then(data => setQuiz(data.results.map(q => ({
      question: q.question,
      button: true,
      qid: nanoid(),
      correctAnswer: q.correct_answer,
      answers: [...q.incorrect_answers,
                q.correct_answer
      ].sort((a,b) => 0.5 - Math.random()).map(a => ({
        answer: a,
        isHeld: false,
        id: nanoid(),
        wasCorrect: false,
        wasInCorrect: false,
        wasChecked: false,
      }))
    }))))
  }, [newQuiz])

  function startQuiz(){
    setPage(false)
  }

  function clickAnswer(id, qid){
      setQuiz(prevQuiz => prevQuiz.map(q=> {
        return {...q,
          answers: q.answers.map(a => {
          if(a.id === id){
            return {...a, isHeld: !a.isHeld}
          } else if(q.qid === qid){
            return {...a, isHeld: false}
          }
          return a
  })}
  }))}
  
  function checkAnswers(){
    setQuiz(prevQuiz => prevQuiz.map(q => {
      return{...q,
        button: false,
        answers: q.answers.map(an=>{
          if(an.answer === q.correctAnswer){
            return {...an, wasCorrect: true}
          } else if(an.answer !== q.correctAnswer && an.isHeld === true){
            return {...an, wasInCorrect: true}
          } else {
            return {...an, wasChecked: true}
          }
          })
      }
    }))
  }

  function countScore(){
    let count = 0
    quiz.map(q=> q.answers.map(an => {
        if(an.answer === q.correctAnswer && an.isHeld === true){
            count++
        }
        return count
    }))
    return count
  }

  function playAgain(){
    setNewQuiz(prevQuiz => !prevQuiz)
  }

  return (
    <div>
      {page ?
       <Intro startQuiz={startQuiz}/> :
       <Main
          test = {quiz}
          checkAnswers={checkAnswers} 
          clickAnswer={clickAnswer}
          score = {countScore}
          playAgain={playAgain}
        />
      }
    </div>
  );
}

export default App;


import {decode} from "html-entities"

export default function Main(props){

    const styles = {
        held: {
            backgroundColor: "#D6DBF5",
            border: "none"
        },
        correct: {
            backgroundColor: "#94D7A2",
            border: "none"
        },
        incorrect: {
            backgroundColor: "#F8BCBC",
            opacity: 0.5
        },
        checked: {
            opacity: 0.5
        },
        regular: {
            backgroundColor: "#F5F7FB",
            border: "0.794239px solid #4D5B9E"
        }
    } 
    
    let sty = {}
    function styless(an){
        if(an.wasCorrect){
           sty = styles.correct
        } else if(an.wasInCorrect){
            sty = styles.incorrect
        } else if(an.wasChecked){
            sty = styles.checked
        }else if(an.isHeld){
            sty = styles.held
        } else {
            sty = styles.regular
        }
        return sty    
    }

    return(
        <div className="main-page">
            <img className="blobs-yellow-small" src="./Images/blobs-yellow-small.png" alt=""/>
            <img className="blobs-blue-small" src="./Images/blobs-blue-small.png" alt=""/>
            <div className="test">
                {props.test.map(q => (
                    <div key={q.qid} className="test-section">
                        <h1 className="question">{decode(q.question)}</h1>
                        <div className="answers">
                            {q.answers.map(an=> (
                                <button key={an.id} style = {styless(an)}
                                onClick={() => props.clickAnswer(an.id, q.qid)} className="answer-button">{decode(an.answer)}</button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            {props.test[0].button ?
            <button className="main-button" onClick={props.checkAnswers}>Check answers</button>:
            <div className="results">
            <h4 className="score">You scored {props.score()}/{props.test.length} correct answers</h4>
            <button className="playagain-button"onClick={props.playAgain}>Play again</button>
            </div>  
            }       
        </div>
    )
}

export default function Intro(props){
    return(
        <div className="intro">
            <img className="yellow-blob" src="./Images/blobs-yellow.png" alt=""/>
            <div className="text-section">
                <h1 className = "title">Quizzical</h1>
                <h3>Test your knowledge</h3>
                <button className="intro-button" onClick={props.startQuiz}>Start quiz</button>
            </div>
            <img className="blue-blob" src="./Images/blobs-blue.png" alt=""/>
        </div>
    )
}
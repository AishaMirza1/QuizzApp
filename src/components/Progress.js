export default function Progress({numQuestions,answer,points,maxPoints,index}){
    return<header className="progress">
        <progress max={numQuestions} value={index+Number(answer !==null)} ></progress>
        <p>Question <strong>{index+1}</strong>/{numQuestions}</p>
        <p><strong>{points}</strong>/{maxPoints}</p>
    </header>
}
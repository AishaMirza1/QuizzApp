
 export default function Question({question,dispatch,answer}){
   const hasAnswered = answer !== null
    return(
        <div >
            <h4>{question.question}</h4>
            <div className="options">
                {question.options.map((option,index)=>
                <button 
                disabled ={hasAnswered}
                className={`btn btn-option ${answer===index?"answer":""} 
                
                ${hasAnswered ?index===question.correctOption?"correct":"wrong":""}`} 
                onClick={()=>dispatch({type:"newAnswer",payload:index})} 
                key={option}>

                {option}</button>)}

            </div>
        </div>
    )
 }
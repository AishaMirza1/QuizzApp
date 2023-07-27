export default function RestartBtn({dispatch}){
 return <button className="btn btn-ui" onClick={()=>dispatch({type:"restart"})}>Restart Quizz</button>
}
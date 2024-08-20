import React,{ useState, useRef } from "react";
import QuizData from "../Data/QuizData.js";

function Quiz(){
const [userAnswer,setUserAnswer]=useState({});
const [Score,setScore]=useState(0);
const submitBtnRef=useRef();


const handleAnswersChange=(el,i)=>{
  const newUserAnswer=c=>({...c,[i]:el})
  setUserAnswer(newUserAnswer);
}

const checkAnswers=()=>{
const isInputEmpty=QuizData.some((_,index)=>userAnswer[index]===undefined);
  if(!isInputEmpty){
    submitBtnRef.current.disabled=true;
    QuizData.map((element,index)=>{
      element.Answer==userAnswer[index]?setScore(c=>c+1):"";
    })
  }
}

const reset=()=>{
  submitBtnRef.current.disabled=false;
  setUserAnswer({});
  setScore(0);
}

return(
  <div className="container">
        <span>
    Score: {Score}
    </span>
    <form id="myform">
      {QuizData.map((element,index)=>
      <div key={"qContainer_"+index} className="Q-Container">
        <p>{(index+1) + ". " + element.Question}</p>
        {element.Choice.map((el,i)=> <label key={index+"_"+i} htmlFor={index+"_"+i}><input id={index+"_"+i} type="radio" name={"input_"+index} value={el} onChange={(e)=> handleAnswersChange(el,index)} checked={userAnswer[index]===el}/>{el}</label> 
      )}
        </div>
      )}
      <button type="button" ref={submitBtnRef} onClick={()=>checkAnswers()}>Submit</button>
      <button type="button" onClick={reset}>Again</button>
    </form>

  </div>
);
}
export default Quiz;
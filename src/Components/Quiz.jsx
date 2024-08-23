import React,{ useState, useRef, useEffect } from "react";
import QuizData from "../Data/QuizData.js";

function Quiz(){
const [userAnswer,setUserAnswer]=useState({});
const [Score,setScore]=useState(0);
const [questionNo,setQuestionNumber]=useState(0);
const [answerChoosed,setAnswerChoosed]=useState({});
const [isSubmitted,setIsSubmitted]=useState(false);
const [isInputEmpty,setIsInputEmpty]=useState(true);


const handleAnswersChange=(el,i)=>{
  const isAnswerChoosed=c=>({...c,[i]:true});
  setAnswerChoosed(isAnswerChoosed);
  const newUserAnswer=c=>({...c,[i]:el})
  setUserAnswer(newUserAnswer);

}

const checkAnswers=()=>{
setIsInputEmpty(QuizData.some((_,index)=>userAnswer[index]===undefined));
  if(!isInputEmpty){
    setIsSubmitted(true);
    QuizData.map((element,index)=>{
      element.Answer==userAnswer[index]?setScore(c=>c+1):"";
    })
  setUserAnswer({});
  }
}

const PreviousQuestion=()=>{
  if(questionNo>0&&questionNo<QuizData.length){
    setQuestionNumber(c=>c-1);
  }
}
const NextQuestion=()=>{
  if(questionNo>=0&&questionNo<QuizData.length-1){
    setQuestionNumber(c=>c+1);

  }
  // setIsAnswered(false);
}

const reset=()=>{
  setIsSubmitted(false);
  setAnswerChoosed({});
  setUserAnswer({});
  setScore(0);
  setQuestionNumber(0);
}

return(
  <div className="container flex flex-col border-2 mx-auto">
    {!isSubmitted?(
      <form id="myform" className="border-4">
      {QuizData.map((element,index)=>
      <div key={"qContainer_"+index} className={`Q-Container relative flex flex-col border-2 min-h-64 ${index===questionNo? "block":"hidden"}`}>
        <div className="flex flex-col">
        <p key={"p_"+index} className="font-bold">{(index+1) + ". " + element.Question}</p>
        {element.Choice.map((el,i)=> <div key={index+"_inputs_"+i}><label className="border-2" key={index+"_"+i} htmlFor={index+"_"+i}><input id={index+"_"+i} type="radio" name={"input_"+index} onChange={(e)=> handleAnswersChange(el,index)} checked={userAnswer[index]===el}/>{el}</label></div>////
      )}
        <div key={"button_"+index} className="flex justify-start gap-x-28 border-4">
        <button type="button" onClick={PreviousQuestion} className=" bg-blue-300 px-6 py-1 rounded-md font-mono font-bold mt-3" disabled={questionNo===0}>Prev</button>
        {index!==QuizData.length-1?<button id="next" onClick={NextQuestion} className=" bg-blue-300 px-6 py-1 rounded-md font-mono font-bold mt-3" type="button" disabled={!answerChoosed[index]}>Next</button>:<button className=" bg-blue-300 px-6 py-1 rounded-md font-mono font-bold mt-3" type="button"  onClick={()=>checkAnswers()}>Submit</button>}
        </div>
        </div>
        </div>
      )} 
    </form>):""}
    <span className={"text-center pt-24 absolute border-4 min-h-72 top-0 "+`${isSubmitted?" block ":" hidden "}`}>Score: {Score}</span>
    <button className={" bg-white rounded-md font-mono font-bold absolute"+`${isSubmitted?" block ":" hidden "}`} type="button" onClick={reset}>Again</button>
  </div>
);
}
export default Quiz;
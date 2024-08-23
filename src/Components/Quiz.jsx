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
  <div className="container flex flex-col border-2 mx-auto w-11/12 min-h-screen justify-center items-center p-6 bg-gray-100">
    {!isSubmitted?(
      <form id="myform" className="border-4 rounded-lg bg-white shadow-md p-6">
      {QuizData.map((element,index)=>
      <div key={"qContainer_"+index} className={`Q-Container relative border-2 p-4 rounded-lg shadow-md ${index===questionNo? "block":"hidden"}`}>
        <div className="flex flex-col mx-auto w-5/6">
        <p key={"p_"+index} className="font-bold text-xl mb-6 text-gray-800">{(index+1) + ". " + element.Question}</p>
        {element.Choice.map((el,i)=> <div key={index+"_inputs_"+i} className="mb-4 flex items-center"><input className="mr-3 accent-blue-500" id={index+"_"+i} type="radio" name={"input_"+index} onChange={(e)=> handleAnswersChange(el,index)} checked={userAnswer[index]===el}/><label className="text-lg text-gray-700" htmlFor={index+"_"+i}>{el}</label></div>////
      )}
        <div key={"button_"+index} className="flex gap-x-28">
        <button type="button" onClick={PreviousQuestion} className=" bg-blue-500 px-4 py-2 rounded-md font-mono font-bold mt-3 text-white text-lg hover:bg-blue-600 transition-colors" disabled={questionNo===0}>Prev</button>
        {index!==QuizData.length-1?<button id="next" onClick={NextQuestion} className=" bg-blue-500 px-4 py-2 rounded-md text-white text-lg font-mono font-bold mt-3 hover:bg-blue-600 transition-colors" type="button" disabled={!answerChoosed[index]}>Next</button>:<button  className="bg-blue-500 px-4 py-2 rounded-md font-mono font-bold mt-3 text-white text-lg hover:bg-blue-600 transition-colors" type="button"  onClick={()=>checkAnswers()}>Submit</button>}
        </div>
        </div>
        </div>
      )} 
    </form>):""}
    <span className={"text-center absolute border-4 bg-white p-8 rounded-lg shadow-lg text-2xl font-bold text-gray-800"+`${isSubmitted?" block ":" hidden"}`}>Score: {Score}</span>
    <button className={"bg-blue-500 px-4 py-2 rounded-md font-mono font-bold mt-48 text-white text-lg hover:bg-blue-600  transition-colors"+`${isSubmitted?" block ":" hidden "}`} type="button" onClick={reset}>Again</button>
  </div>
);
}
export default Quiz;
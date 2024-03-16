import { createContext, useState } from "react";
import runChat from "../Config/Gemini";
// import runChat from '../Config/Gemini';




export const Context = createContext();

const ContextProvider = (props) => {



  const [input, setInput] = useState("");
  const [recentPrompt, setrecentPrompt] = useState("");
  const [prevPrompts, setprevPrompts] = useState([]);
  const [showResult, setshowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");


  const delaypara=(index,nextword)=>{
    setTimeout(function(){
      setResultData(prev=>prev+nextword);
    }, 75*index)
}


const newchat=()=>{
  setInput(false);
  setshowResult(false);

}


  const onSend = async (prompt) => {
    setResultData("")
    setLoading(true)
    setshowResult(true)
    let  respones ;
    if(prompt!==undefined){
      respones =await runChat(prompt)
          setrecentPrompt(prompt)   
    }
    else
    {
      setprevPrompts(prev=>[...prev,input]) ;
      setrecentPrompt(input)
       respones = await runChat(input)
    }
    // 
   
    
    let responeArr=respones.split("**");
   let newRespone="";
   for(let i=0;i<responeArr.length;i++)
   {
      if(i===0 || i%2!==1){
        newRespone+=responeArr[i];
      }
      else{
        newRespone+="<b>" + responeArr[i]+"</b>";
      }
   }

   let newRespone2=newRespone.split("*").join("</br>")
   let newResponeArray=newRespone2.split(" ");
   for(let i=0;i<newResponeArray.length;i++)
   {
     const nextw=newResponeArray[i];
     delaypara(i,nextw+" ")
   }
    setLoading(false)
    setInput("")
  }





  const contextvalue = {
    prevPrompts, resultData, setprevPrompts, onSend, recentPrompt, setrecentPrompt, input, setInput, loading, showResult,newchat
  }


  return (
    <Context.Provider value={contextvalue}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider;
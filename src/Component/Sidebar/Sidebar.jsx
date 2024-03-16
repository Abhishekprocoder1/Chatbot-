import React, { useContext, useState } from 'react'
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../Context/Context';
const Sidebar = () => {

    const [extended, setextended] = useState(false);
    const { onSend,  setrecentPrompt, prevPrompts,newchat} = useContext(Context)

const loadPrompt =async(Prompt)=>{
    setrecentPrompt(Prompt);
    await onSend(Prompt)
}


    return (
        <div className='sidebar'>
            <div className="top">
                <img className='menu' src={assets.menu_icon} alt='' onClick={() => setextended(prev => !prev)} />
                <div onClick={()=>newchat()}   className="new-chat">
                    <img src={assets.plus_icon} alt='' />
                    {extended ? <p>New chat</p> : null}
                </div>

                {
                    extended ? 
                    <div className="recent">
                        <p className='recent-title'>Recent</p>
                    {
                            prevPrompts.map((item, index) => {

                         return(
                                    <div onClick={()=>loadPrompt(item)}  className="recent-entry">
                                        <img src={assets.message_icon} alt='' />
                                        <p>{item.slice(0,18)} ...</p>
                                    </div>
                                )
                            })
                    }


                    </div> : null
                }

            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt='' />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt='' />
                    {extended ? <p>Activity</p> : null}

                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.send_icon} alt='' />
                    {extended ? <p>Setting</p> : null}
                </div>

            </div>
        </div>
    )
}

export default Sidebar
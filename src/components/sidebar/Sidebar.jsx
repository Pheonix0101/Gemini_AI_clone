import { useContext, useState } from "react";
import "./Sidebar.css";

import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

function Sidebar() {
  const [toggleSidebar, settoggleSidebar] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadrecentPrompt = async (prompt) => {
    // setRecentPrompt(prompt);
    onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => settoggleSidebar((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="menu_icon"
        />
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="plus_icon" />
          {toggleSidebar ? <p>new chat</p> : null}
        </div>
        {toggleSidebar ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => loadrecentPrompt(item)}
                  className="recent-entry"
                >
                  <img src={assets.message_icon} alt="messsage_icon" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {toggleSidebar ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {toggleSidebar ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {toggleSidebar ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

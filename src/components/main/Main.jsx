import "./Main.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { Context } from "../../context/Context";

function Main() {
  const {
    prevPrompts,
    setprevPrompts,
    onSent,
    setrecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setinput,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>

        <img src={assets.user_icon} alt="user_icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Purushottam</span>
              </p>
              <p>how can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful place to visit in Japan</p>
                <img src={assets.compass_icon} alt="campus" />
              </div>
              <div className="card">
                <p>briefly summarize this concept: Quantam Computing</p>
                <img src={assets.bulb_icon} alt="campus" />
              </div>
              <div className="card">
                <p>How to improve my communication skill in team meeting</p>
                <img src={assets.message_icon} alt="campus" />
              </div>
              <div className="card">
                <p>
                  How can I improve the time and space complexity of following
                  java code
                </p>
                <img src={assets.code_icon} alt="campus" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="result">
              <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                )}
              </div>
            </div>
          </>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setinput(e.target.value)}
              type="text"
              value={input}
              placeholder="Enter a promt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.{" "}
            <span>Your privacy and Gemini Apps.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;

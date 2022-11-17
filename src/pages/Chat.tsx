export const Chat = () => {
  return (
    <div className="chat">
      <header>
        <h1>Chat room</h1>
      </header>
      <div className="body">
        <div>
          <span>player:</span>
          <div className="">Hey</div>
        </div>
        <div>
          <span>player:</span>
          <div className="">Hey</div>
        </div>
        <div>
          <span>player:</span>
          <div className="">Hey</div>
        </div>
      </div>
      <div className="input-container">
        <input type="text" placeholder="Please be nice in the chat!" />
      </div>
      <div className="auto-msg">
        <span>HI</span>
        <span>GL</span>
        <span>HF</span>
        <span>U2</span>
      </div>
    </div>
  )
}

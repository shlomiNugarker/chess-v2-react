import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RootState } from '../features'
import { getChatById, saveChat } from '../features/chat/asyncActions'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useTypedSelector'
import { utilService } from '../services/utilService'

export const Chat = () => {
  const dispatch = useAppDispatch()
  const gameState = useAppSelector((state: RootState) => state.game)
  const authState = useAppSelector((state: RootState) => state.auth)
  const chatState = useAppSelector((state: RootState) => state.chat)

  const [msg, setMsg] = useState('')

  const createMsg = (txt: string) => {
    return {
      _id: utilService.makeId(24),
      txt,
      fullname: authState.loggedInUser?.fullname || 'Guest',
    }
  }

  const sendMsg = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter' || ev.keyCode === 13) {
      // Do something
      const newMsg = createMsg(msg)
      const chatToSave = _.cloneDeep(chatState)
      chatToSave?.messages.push(newMsg)
      console.log(chatToSave)
      chatToSave && dispatch(saveChat(chatToSave))

      setMsg('')
    }
  }

  useEffect(() => {
    if (gameState?.chatId) dispatch(getChatById(gameState.chatId))
  }, [dispatch, gameState?.chatId])
  // useEffect(() => {}, [chatState?.messages.length])

  return (
    <div className="chat">
      <header>
        <h1>Chat room</h1>
      </header>
      <div className="body">
        {chatState?.messages.map((msg) => (
          <div key={msg._id}>
            <span>
              {msg.fullname}: {msg.txt}
            </span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          value={msg}
          type="text"
          onKeyUp={(ev) => sendMsg(ev)}
          onChange={(ev) => setMsg(ev.target.value)}
          placeholder="Please be nice in the chat!"
        />
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

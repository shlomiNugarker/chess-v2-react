import _ from 'lodash'
import { useEffect, useState } from 'react'
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
      userId: authState?.loggedInUser?._id || '',
      txt,
      fullname: authState.loggedInUser?.fullname || 'Guest',
    }
  }

  const isBlackUser = (userId: string) => userId === gameState?.players?.black

  const sendMsg = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (!msg.trim().length) return
    if (ev.key === 'Enter' || ev.keyCode === 13) {
      const newMsg = createMsg(msg)
      const chatToSave = _.cloneDeep(chatState)
      chatToSave?.messages.push(newMsg)
      chatToSave && dispatch(saveChat(chatToSave))

      setMsg('')
    }
  }

  const sendAutoMsg = (msg: string) => {
    const newMsg = createMsg(msg)
    const chatToSave = _.cloneDeep(chatState)
    chatToSave?.messages.push(newMsg)
    chatToSave && dispatch(saveChat(chatToSave))
  }

  useEffect(() => {
    // saving the black user into the chat (because sometimes not recognize the user on first load)
    if (chatState && !chatState.userId2 && gameState?.players?.black) {
      const chatToSave = _.cloneDeep(chatState)
      chatToSave.userId2 = gameState.players.black
      chatToSave && dispatch(saveChat(chatToSave))
    }
  }, [
    chatState,
    dispatch,
    gameState?.players?.black,
    gameState?.players?.white,
  ])

  useEffect(() => {
    if (gameState?.chatId) dispatch(getChatById(gameState.chatId))
  }, [dispatch, gameState?.chatId])

  if (!gameState?.isOnline)
    return <div className="chat not-online">Have fun !</div>

  return (
    <>
      <div className="chat">
        <header>
          <h1>Chat room</h1>
        </header>
        <div className="body">
          {chatState?.messages.map((msg: any) => (
            <div key={msg._id}>
              <span>
                {`${msg.fullname} ${
                  isBlackUser(msg.userId) ? '[black]' : '[white]'
                }:  ${msg.txt}`}
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
          <span
            onClick={() => {
              sendAutoMsg('Hello')
            }}
            title="Hello"
          >
            HI
          </span>
          <span
            onClick={() => {
              sendAutoMsg('Good luck')
            }}
            title="Good luck"
          >
            GL
          </span>
          <span
            onClick={() => {
              sendAutoMsg('Have fun!')
            }}
            title="Have fun!"
          >
            HF
          </span>
          <span
            onClick={() => {
              sendAutoMsg('Yoo too!')
            }}
            title="Yoo too!"
          >
            U2
          </span>
        </div>
      </div>
    </>
  )
}

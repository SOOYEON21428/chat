import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import Message from "../components/ui/Message";
import { SendImage } from "../components/Images";
import Person from "../components/ui/Person";
import moment from "moment/moment";
import WeatherApp from "./WeatherApp";


const isBrowser = typeof window !== "undefined";
const WS_URL = "ws://127.0.0.1:3011";

export default function ChatApp() {
  const [connected, setConnected] = useState(false);
  const [joined, setJoined] = useState(false);
  const [nickname, setNickname] = useState("");
  const [chatText, setChatText] = useState("");
  const [userList, setUserList] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [wsId, setWsId] = useState("");
  const ws = useRef(null);
  const messageRef = useRef(null);
  const [rejoin, setRejoin] = useState(false);

  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({ behavior: "smooth"})
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatList]);


  function sendChat() {
      if (!chatText) return;

      const request = {
        message: "msg:chat",
        data: {
          text: chatText,
        },
      };

      ws.current.send(JSON.stringify(request));
      setChatText("");
  }



  function entrance() {
    if (!nickname) return;
    if (ws.current === null) return;

    if (joined) return;
    const req = {
      message: "msg:join",
      data: { name: nickname, rejoin : rejoin },
    };
    ws.current.send(JSON.stringify(req));
  }
  
  useEffect(() => {
    if (!isBrowser) return;
    const socket =
      ws.current === null ? new WebSocket(WS_URL) : ws.current;
      
    socket.onopen = function () {
      setConnected(true);
    };

    socket.onmessage = function (event) {
      const reply = JSON.parse(event.data);
      console.log(reply)
      if (reply.message === "reply:welcome") {
        setWsId(reply.data.id);
      }
      if (reply.message === "broadcast:join") {
        if (reply.data.id === wsId) setJoined(true);
        const {id} = reply.data;
        const date = reply.date;
        const rejoin = reply.data.rejoin;

        fetch("http://127.0.0.1:3011/user").then((response) => {
          response.json().then((json) => {
            const newUserList = json.data.map(newUser => {
              const lastUser = userList.filter(user => user.id === newUser.id)[0];
              if (lastUser) {
                return {
                  ...newUser,
                  lastNickname: lastUser.name,
                  joinedDateTime: lastUser.joinedDateTime,
                };
              }
              else
                return newUser;
            });
            
            const user = getUser(newUserList, id);
            const nickname = user.name;
            const lastNickname = user.lastNickname;
            const joinedDateTime = user.joinedDateTime;
            const newChatItem = {
              id,
              dateString: date,
              notice: true,
              noticeType: "join",
              nickname,
              rejoin,
              lastNickname,
              joinedDateTime,
            };
            const newChatList = [...chatList, newChatItem];
            setChatList(newChatList);
            setUserList(newUserList);
          });
        });


      } else if (reply.message === "broadcast:leave") {
        const {id} = reply.data;
        const date = reply.date;
        const nickname = getUserName(userList, id);
        
        
        const newChatItem = {
          id,
          dateString : date,
          notice : true,
          noticeType: "leave",
          nickname
        };

        const newChatList = [...chatList, newChatItem];
        setChatList(newChatList);

        fetch("http://127.0.0.1:3011/user").then((response) => {
          response.json().then((json) => {
            setUserList(json.data);
          });
        });
      } else if(reply.message === "broadcast:chat"){
        const {id, text} = reply.data;
        const date = reply.date;
        const nickname = getUserName(userList, id);

        const newChatItem = {
          id,
          text,
          dateString : date,
          notice : false,
          nickname,
        };

        const newChatList = [...chatList, newChatItem];
        setChatList(newChatList);
      }
    };



    if (ws.current === null) ws.current = socket;
  }, [wsId, chatList, userList, rejoin]);

  if (!connected) return <div>연결중...</div>;

  return (
    <>
      <Head>
        <title>Chat Chat</title>
      </Head>
      {joined ? (
        <>
          {" "}
          <div className="grid grid-cols-5 grid-rows-2 h-[900px] max-w-[1500px] border-t border-gray-400">
            <div className="container col-span-4 row-span-2 max-w-full">
              <header className="h-[5.95%] bg-amber-100 flex items-center justify-center font-semibold text-xl border-b border-gray-400 select-none text-stone-700">
                채팅
              </header>
              <main className="h-[800px] grid overflow-y-auto">
                <div className="h-[740px] pt-5">
                  {chatList.map((chatItem, i) => (
                    <Message
                      key={i}
                      lastNickname={chatItem.lastNickname}
                      nickname={chatItem.nickname}
                      message={chatItem.text}
                      date={dateToFormat(chatItem.dateString)}
                      notice={chatItem.notice}
                      noticeType={chatItem.noticeType}
                      me={isMe(chatItem.id, wsId)}
                      rejoin={chatItem.rejoin}
                    ></Message>
                  ))}
                  <div ref={messageRef}></div>
                </div>
              </main>
            </div>
            <nav className="bg-zinc-100 col-span-1 row-span-3 border-x border-b border-gray-400 select-none">
              <div className=" mb-3 bg-amber-100 h-[5.6%] flex items-center justify-center font-semibold text-lg border-b border-gray-400 text-stone-700">
                인원&nbsp;({userList.length})
              </div>
              <div className="w-[200px] h-[40px] flex flex-col text-gray-800">
                {" "}
                {userList.map((user, i) => (
                  <Person key={i} user={user} me={isMe(user.id, wsId)}></Person>
                ))}
              </div>
            </nav>
            <footer className="bg-gray-100 col-span-4 row-span-1 h-[50px] border-y border-gray-400 flex items-center justify-center">
              <input
                type="text"
                placeholder="할 말이 있으신가요?"
                className="border border-gray-200 w-[90%] h-[80%] text-sm pl-3 rounded  outline-[#7D7D7D] outline-1 ml-2"
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    sendChat();
                  }
                }}
              />
              <button
                type="button"
                className="w-[110px] h-[75%] bg-gray-400 ml-3 flex items-center justify-center px-2  text-white
                      rounded uppercase ledading-tight shadow-md hover:bg-gray-500 pl-4 mr-1"
                onClick={sendChat}
              >
                전송
                <SendImage className="w-[30px] h-[30px] pb-1 pl-1 -rotate-45 fill-white"></SendImage>
              </button>
            </footer>
          </div>
          <div className="flex mt-4 justify-between max-w-[1500px]">
            <button
              className="select-none hover:no-underline text-gray-600 hover:font-medium ml-4 hover:animate-bounce hover:delay-75 "
              onClick={() => {
                setJoined(false);
                setNickname("");
                setRejoin(true);
              }}
            >
              ← 닉네임 변경하기
            </button>
            <WeatherApp/>
          </div>
        </>
      ) : (
        <>
          <main className="min-h-screen  py-16 px-0 flex-1 flex flex-col justify-center items-center h-screen bg-[#F3F4F6]">
            <div className="h-3/6 w-[500px] py-4 px-8 flex flex-col justify-center items-center ">
              <h2 className="m-0 text-4xl leading-none font-semibold select-none">
                Chat Chat 🐈
              </h2>
              <input
                type="text"
                placeholder="닉네임을 입력해주세요."
                className="w-[65%] h-[50px] mt-16 p-[16px] text-sm 
          leading-[20px] rounded-[12px] border border-solid border-gray-500 outline-[#7D7D7D]"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    entrance();
                  }
                }}
              />
              <button
                className="w-[120px] h-[40px] mt-14 flex flex-col justify-center items-center bg-[#a3a1a1]
             text-white text-sm border-none rounded-[15px] py-[15px] px-[30px] hover:no-underline hover:bg-[#888585] 
             font-semibold select-none
             white hover:shadow-[inset_13rem_0_0_0] hover:shadow-[#615959] duration-[800ms,700ms] transition-[color,box-shadow]"
                onClick={entrance}
              >
                입장하기
              </button>
            </div>
          </main>
        </>
      )}
    </>
  );
}

export function dateToFormat(dateString){
  return moment(dateString).format("HH:mm");
}

function getUserName(userList, id){
  return userList.filter(user=>user.id ===id)[0]?.name ?? "";
}

function getUser(userList, id){
  return userList.filter(user=>user.id ===id)[0]?? null;
}

function isMe(id, myId){
  return  id === myId;
}
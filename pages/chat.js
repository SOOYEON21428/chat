import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { SendImage } from "../components/Images";

import Message from "../components/ui/message";
import Person from "../components/ui/Person";
import EntranceMessage from "../components/ui/EntranceMessage";

// import SendImage from "../components/Images";

export default function Chat() {
  const [chatText, setChatText] = useState("fefdddef");
  const [chatList, setChatList] = useState(["ㅈㄷㅈㄷ"]);

  return (
    <>
      <Head>
        <title>Chat Chat</title>
      </Head>

      <div className="grid grid-cols-5 grid-rows-2 h-[900px] max-w-[1500px] border-t border-gray-400">
        <div className="container col-span-4 row-span-2 max-w-full">
          <header className="h-[5.95%] bg-gray-200 flex items-center justify-center font-semibold text-xl border-b border-gray-400">
            채팅
          </header>
          <main className="h-[95%] grid">
            <div className="h-[740px]">
              {(chatList) =>
                chatList.map((chat, i) => {
                  console.log(chat);
                  return <Message key={i} message={chat}></Message>;
                })
              }
              {/* <Message message="Cat🐈‍⬛ : Hi" ></Message>
                            <Message message="Dog🐕 : Hello Hello Hello" ></Message>                          
                            <div className="bg-orange-200 w-[100%] h-[35px] flex items-center justify-center my-2" >
                            Bird🦜님이 입장하셨습니다. 📢 
                            </div> */}
            </div>
            <div className="flex items-end h-[50px]">
              <div className="bg-blue-200 w-[100%] h-[90%] flex items-center justify-center">
                날씨
              </div>
            </div>
          </main>
        </div>
        <nav className="bg-gray-100 col-span-1 row-span-3 border-x border-b border-gray-400">
          <div className="bg-gray-200 h-[5.6%] flex items-center justify-center font-semibold text-xl border-b border-gray-400">
            인원(3)
          </div>
          <div className="w-[200px] h-[40px] flex">
            <Person person="Bird(나)"></Person>
          </div>
        </nav>
        <footer className="bg-gray-100 col-span-4 row-span-1 h-[50px] border-y border-gray-400 flex items-center justify-center">
          <input
            type="text"
            placeholder="할 말이 있으신가요?"
            className="border border-gray-200 w-[90%] h-[80%] text-sm pl-3 rounded  outline-[#7D7D7D] outline-1 ml-2"
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
          />
          <button
            type="button"
            className="w-[110px] h-[75%] bg-gray-400 ml-3 flex items-center justify-center px-2  text-white
                    rounded uppercase ledading-tight shadow-md hover:bg-gray-500 pl-4 mr-1"
            onClick={() => {
              if (!chatText) return;
              const newChatList = [...chatList, chatText];
              setChatList(newChatList);
              setChatText("");
            }}
          >
            전송
            <SendImage className="w-[30px] h-[30px] pb-1 pl-1 -rotate-45 fill-white"></SendImage>
          </button>
        </footer>
      </div>
      <h2 className="mt-4">
        <Link href="/">
          <a className="select-none hover:no-underline">← Back to Entrance</a>
        </Link>
      </h2>
    </>
  );
}
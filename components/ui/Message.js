import { NoticeImage } from "../Images";

function Message(props) {
    const { notice, noticeType, nickname, date, message, me, rejoin, lastNickname } = props;

    return (
      <>
        {notice ? (
          (function () {
            let message = "";
            if (!rejoin && noticeType === "join") {
              message = `${nickname}님이 입장하셨습니다. 😊`;
            } else if (noticeType === "leave") {
              message = `${nickname}님이 떠나셨습니다. 🥲`;
            } else if (rejoin && noticeType === "join") {
              message = `😎 닉네임 변경 ${lastNickname} ➡️ ${nickname}`;
            }
            return (
              <div className="w-full h-9 justify-center items-center flex my-4 px-2 j pt-3 pb-6 select-none">
                <p className={`flex text-sm items-center ${!rejoin ? "" : "bg-lime-200 py-1 px-3 rounded-full"}`}>
                  <NoticeImage
                    className={` ${ !rejoin ? "w-[35px] h-[35px] mr-2 flex pt-1" : "hidden"}`}
                  ></NoticeImage>
                  {message}
                  <p className={` ${!rejoin ? "text-xs text-gray-500 ml-3" : "hidden"}`}>{date}</p>
                </p>
              </div>
            );
          })()
        ) : (
          <>
            <p className={`ml-3 select-none ${me ? "hidden" : ""}`}>{nickname}</p>
            <div className={`flex ${me ? "flex-row-reverse" : ""}`}>
              <div
                className={`w-fit max-w-lg h-fit relative ${
                  me ? "bg-amber-200" : "bg-gray-200"
                } rounded-2xl mb-3 mt-1 mx-3 px-4 py-2 flex items-center shadow-sm`}
              >
                {message}
              </div>
              <p className="text-xs text-gray-500 flex items-center select-none">{date}</p>
            </div>
          </>
        )}
      </>
    );
}

export default Message;
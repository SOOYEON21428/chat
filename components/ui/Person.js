import { useState } from "react";
import { PersonImage } from "../Images";
import Tooltip from "./Tooltip";
import { dateToFormat } from "../ChatApp";

function Person(props) {
  const [showTooltip, setShowTooltip] = useState(false);

  const { user, me } = props;

  return (
    <div
      className="flex ml-3 mb-2"
      onMouseOver={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flow-root">
        <div className="flex">
          <PersonImage className="w-[35px] h-[35px] fill-gray-400"></PersonImage>
          <p>{`${user.name}${me ? " (나)" : ""}`}</p>
        </div>
        {showTooltip ? (
          <Tooltip
            message={`입장시간 : ${dateToFormat(user.joinedDateTime)}`}
          ></Tooltip>
        ) : null}
      </div>
    </div>
  );
}

export default Person;

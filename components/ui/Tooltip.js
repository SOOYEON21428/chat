import { DateImage } from "../Images";

function Tooltip(props) {
  const { message } = props;

  return (
    <div className="flex w-fit py-1 px-2 mt-0 ml-6 text-sm bg-gray-500 text-gray-200 opacity-60 rounded-sm">
      <DateImage className="w-[25px] h-[25px] mr-1 fill-gray-200"></DateImage>
          <p>{message}</p>
    </div>
  );
}

export default Tooltip;
 
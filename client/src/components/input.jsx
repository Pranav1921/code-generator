import { useRef } from "react";

const Input = ({ cb }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    const inputValue = inputRef.current.value.trim()
    if (inputValue) {
        cb(inputValue)
        inputRef.current.value=' '
    }
  };

  return (
    <div className="bg-black rounded-xl flex items-end p-6 mt-auto">
      <textarea
        ref={inputRef}
        className="w-full h-26 outline-none text-amber-50 bg-transparent resize-none"
        placeholder="Example: Create a calculator app"
      ></textarea>
      <button
        onClick={handleClick}
        className="ml-4 p-2 hover:bg-gray-800 rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
  );
};

export default Input;

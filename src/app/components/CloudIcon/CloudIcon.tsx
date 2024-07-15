import "../CloudIcon/cloud-icon.css";

export const CloudIcon = () => {
  return (
    <div className="cloud relative w-16 h-16">
      <div className="sun absolute w-8 h-8 bg-yellow-300 rounded-full bottom-8 left-2 shadow-lg"></div>
      <div className="cloud-child absolute w-16 h-8 bg-white rounded-full shadow-lg bottom-1">
        <div className="absolute flex flex-row gap-1 bottom-0 top-0 left-0 right-0 m-auto items-center justify-center z-20">
          <div className="mail-dot  w-2 h-2 rounded-full bg-blue-400"></div>
          <div className="mail-dot  w-2 h-2 rounded-full bg-blue-400"></div>
          <div className="mail-dot  w-2 h-2 rounded-full bg-blue-400"></div>
        </div>
      </div>
      <div className="cloud-child absolute w-6 h-6 bg-white rounded-full left-2 bottom-4"></div>
      <div className="cloud-child absolute w-8 h-8 bg-white rounded-full left-6 bottom-4"></div>
    </div>
  );
};

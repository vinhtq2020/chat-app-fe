interface Props {
  isTarget: boolean;
}
export const ContactItem = (props: Props) => {
  return (
   
      <div
        className={`contact-item flex flex-row justify-end items-center md:w-auto ${
          props.isTarget ? "bg-blue-500 rounded-bl-full shadow-lg" : ""
        }  p-1 gap-4`}
      >
        <div className="flex flex-col flex-1 ml-4">
          <h4
            className={`username ${
              props.isTarget ? "text-white " : ""
            } font-semibold text-xs hover:text-white sm:hidden`}
          >
            Truong Quang Vinh
          </h4>
          <h4
            className={`new-message ${
              props.isTarget ? "text-white" : ""
            } font-light text-xs hover:text-white sm:hidden`}
          >
            {" "}
            Something to say ...
          </h4>
        </div>
        <img
          className="h-12 w-12 rounded-full "
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt=""
        />
      </div>
  );
};

import { ContactItem } from "./contact-item";
import "./contact.css";

interface Props {
  user: User[];
}

interface User {
  avatar?: string;
  userId?: string;
  username: string;
}
export default function ContactList(props: Props) {
  return (
    <div className=" sm:w-full md:w-1/6 shadow-xl z-10 flex md:flex-col sm:flex-row sm:overflow-x-scroll sm:h-full sm:justify-center md:justify-start">
      <div className="flex-none sm:w-auto sm:h-full md:h-auto">
        <ContactItem isTarget={false} />
      </div>
      <div className="flex-none sm:w-auto sm:h-full md:h-auto">
        <ContactItem isTarget={false} />
      </div>
      <div className="flex-none sm:w-auto sm:h-full md:h-auto">
        <ContactItem isTarget={false} />
      </div>
    </div>
  );
}

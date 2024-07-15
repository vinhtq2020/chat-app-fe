import { CloudIcon } from "@/src/app/components/CloudIcon/CloudIcon";
import { LoadingScreen } from "../../../components/LoadingScreen/LoadingScreen";
import LGTVSpinner from "../components/LGTVSpinner/LGTVSpinner";

export default function Example() {
  return (
    <div className=" h-screen w-screen justify-center flex items-center">
      {/* <LGTVSpinner /> */}
      <CloudIcon />
    </div>
  );
}

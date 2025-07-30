// import Image from "next/image";
import MsgBoard from "@/app/todoList";

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col text-center mt-[10vh] mb-[10vh]">
      <div className="mb-8">
        <h1 className="text-2xl">小周的TODO List</h1>
      </div>
      <div className="min-w-[90vw] sm:w-[70vw] sm:min-w-0 mx-auto">
        <MsgBoard />
      </div>
    </div>
  );
}

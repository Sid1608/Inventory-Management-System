import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-blue-600">
          LNMIIT Resource Management System
        </h1>
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <Link to="/inventory">
            <button className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600">
              <h3 className="text-2xl font-bold">
                Inventory Management &rarr;
              </h3>
              <p className="mt-4 text-xl">Edit this text in /src/Home.js</p>
            </button>
          </Link>
          <Link to="/employee">
            <button className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600">
              <h3 className="text-2xl font-bold">Employee Management &rarr;</h3>
              <p className="mt-4 text-xl">Edit this text in /src/Home.js</p>
            </button>
          </Link>
          <Link to="/lecturehall">
            <button className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600">
              <h3 className="text-2xl font-bold">
                Lecture Hall Management &rarr;
              </h3>
              <p className="mt-4 text-xl">Edit this text in /src/Home.js</p>
            </button>
          </Link>
          <Link to="/exam">
            <button className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600">
              <h3 className="text-2xl font-bold">Exam Management &rarr;</h3>
              <p className="mt-4 text-xl">Edit this text in /src/Home.js</p>
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

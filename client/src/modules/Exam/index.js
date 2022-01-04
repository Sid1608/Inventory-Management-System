import { Link } from "react-router-dom";

export default function index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      Hello from Exam. Edit this in src/modules/Exam/index.js
      <Link className="text-blue-500 mt-4" to="/">
        Back
      </Link>
    </div>
  );
}

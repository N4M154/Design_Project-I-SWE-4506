import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-black text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/home">
          <h1 className="font-bold text-yellow-400 text-2xl"></h1>
        </Link>
        <ul className="flex gap-4">
          {currentUser && (
            <Link
              to="/home"
              className="font-semibold text-yellow-200 hover:text-yellow-300"
            >
              <li>Home</li>
            </Link>
          )}
          {currentUser && (
            <Link
              to="/compiler"
              className="font-semibold text-yellow-200 hover:text-yellow-300"
            >
              <li>Try it yourself</li>
            </Link>
          )}

          {currentUser && (
            <Link
              to="/about"
              className="font-semibold text-yellow-200 hover:text-yellow-300"
            >
              <li>About</li>
            </Link>
          )}

          <Link to="/profile" className="font-bold text-yellow-200">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-8 w-8 rounded-full object-cover border-2 border-yellow-300"
              />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}

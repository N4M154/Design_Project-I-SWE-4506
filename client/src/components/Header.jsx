import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-slate-800 text-white">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/home">
          <h1 className="font-bold text-yellow-300 text-2xl">DoodleDuck</h1>
        </Link>
        <ul className="flex gap-4">
          {currentUser && (
            <Link to="/home" className="font-semibold text-yellow-200">
              <li>Home</li>
            </Link>
          )}
          {currentUser && (
            <Link to="/compiler" className="font-semibold text-yellow-400">
              <li>Try it yourself</li>
            </Link>
          )}
          {currentUser && (
            <Link to="/about" className="font-semibold text-yellow-600">
              <li>About</li>
            </Link>
          )}

          <Link to="/profile" className="font-bold text-yellow-200">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
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

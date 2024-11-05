import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from "../redux/user/userSlice";
import ProfileChart from "./ProfileChart"; // Import the new ProfileChart component

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center w-full max-w-5xl">
        {/* Profile Section */}
        <div className="w-full max-w-md p-8 bg-gradient-to-b from-yellow-600 via-yellow-700 to-yellow-800 rounded-lg shadow-lg mb-8">
          <h1 className="text-4xl font-bold text-center text-yellow-100 mb-6">
            Profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <div
              className="flex justify-center cursor-pointer"
              onClick={() => fileRef.current.click()}
            >
              <img
                src={formData.profilePicture || currentUser.profilePicture}
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover border-2 border-yellow-400"
              />
            </div>
            <div className="text-center text-sm mt-1">
              {imageError ? (
                <span className="text-red-400">
                  Error: File size is too large!
                </span>
              ) : imagePercent > 0 && imagePercent < 100 ? (
                <span className="text-yellow-100">{`Uploading: ${imagePercent}%`}</span>
              ) : imagePercent === 100 ? (
                <span className="text-green-400">Upload Successful</span>
              ) : null}
            </div>
            <input
              type="text"
              id="username"
              placeholder="Username"
              defaultValue={currentUser.username}
              onChange={handleChange}
              className="w-full p-3 rounded bg-black text-yellow-100 placeholder-yellow-400 focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              defaultValue={currentUser.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-black text-yellow-100 placeholder-yellow-400 focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="password"
              id="password"
              placeholder="New Password"
              onChange={handleChange}
              className="w-full p-3 rounded bg-black text-yellow-100 placeholder-yellow-400 focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="w-full bg-yellow-600 text-yellow-100 py-3 rounded-lg hover:bg-yellow-700 transition font-semibold"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
          <div className="flex justify-between mt-6 text-yellow-100 font-semibold">
            <span
              onClick={handleDeleteAccount}
              className="cursor-pointer hover:text-red-400"
            >
              Delete Account
            </span>
            <span
              onClick={handleSignOut}
              className="cursor-pointer hover:text-green-400"
            >
              Sign Out
            </span>
          </div>
          {error && (
            <p className="mt-4 text-center text-red-400 font-semibold">
              Something went wrong!
            </p>
          )}
          {updateSuccess && (
            <p className="mt-4 text-center text-green-400 font-semibold">
              Profile updated successfully!
            </p>
          )}
        </div>
        {/* Chart Section */}
        <div className="w-full">
          <ProfileChart />
        </div>
      </div>
    </div>
  );
}

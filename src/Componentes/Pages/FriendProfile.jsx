import React, { useState, useEffect } from "react";
import LeftSide from "../LeftSideBar/LeftSide";
import Navbar from "../Navbar/Navbar";
import RightSide from "../RightSideBar/RightSide";
import Main from "../Main/Main";
import profilePic from "../../assets/images/profilePic.jpg";
import { Avatar } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpg";
import { collection, where, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useParams } from "react-router-dom";

const FriendProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      const q = query(collection(db, "users"), where("uid", "==", id));
      await onSnapshot(q, (doc) => {
        setProfile(doc.docs[0].data());
      });
    };
    getUserProfile();
  }, [id]);
  console.log(profile);

  return (
    <div className="w-full">
      <div className="fixed top-0 z-10 w-full bg-white">
        <Navbar></Navbar>
      </div>
      <div className="flex bg-gray-100">
        <div className="flex-auto w-[20%] fixed top-12">
          <LeftSide></LeftSide>
        </div>
        <div className="flex-auto w-[60%] absolute left-[20%] top-14 bg-gray-100 rounded-xl">
          <div className="w-[80%] mx-auto">
            <div>
              <div className="relative py-4">
                <img
                  className="h-96 w-full rounded-md"
                  src={profilePic}
                  alt="profilePic"
                ></img>
                <div className="absolute bottom-10 left-6">
                  <Avatar
                    className="rounded-full"
                    style={{ width: "40px", height: "40px" }}
                    src={profile?.image || avatar}
                    alt="avatar"
                  ></Avatar>
                  <p className="py-2 mr-1 font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none">
                    {profile?.email}
                  </p>
                  <p className="py-2 mr-20 font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none">
                    {profile?.name}
                  </p>
                </div>
              </div>
            </div>
            <Main></Main>
          </div>
        </div>
        <div className="flex-auto w-[20%] fixed right-0 top-12">
          <RightSide></RightSide>
        </div>
      </div>
    </div>
  );
};

export default FriendProfile;

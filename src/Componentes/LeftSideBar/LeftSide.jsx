import React, { useRef, useState, useEffect, useContext } from "react";
import nature from "../../assets/images/nature.jpg";
import { Tooltip } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpg";
import a from "../../assets/sponsors/a.jpeg";
import b from "../../assets/sponsors/b.jpeg";
import c from "../../assets/sponsors/c.png";
import d from "../../assets/sponsors/d.jpeg";
import e from "../../assets/sponsors/e.jpeg";
import f from "../../assets/sponsors/f.jpg";
import g from "../../assets/sponsors/g.jpg";
import h from "../../assets/sponsors/h.png";

import { AuthContext } from "../AppContext/AppContext";

function PayPalButton() {
  return (
    <form
      action="https://www.paypal.com/cgi-bin/webscr"
      method="post"
      target="_top"
    >
      <input type="hidden" name="cmd" value="_s-xclick" />
      <input type="hidden" name="hosted_button_id" value="BEHAFUMD3FX4S" />
      <input type="hidden" name="currency_code" value="USD" />
      <input
        type="image"
        src="https://www.paypalobjects.com/en_US/i/btn/btn_subscribe_LG.gif"
        border="0"
        name="submit"
        title="PayPal - The safer, easier way to pay online!"
        alt="Subscribe"
      />
    </form>
  );
}

const LeftSide = () => {
  const [data, setData] = useState([]);
  const count = useRef(0);
  const { user, userData } = useContext(AuthContext);

  const handleRandom = (arr) => {
    setData(arr[Math.floor(Math.random() * arr?.length)]);
  };

  useEffect(() => {
    const imageList = [
      {
        id: "1",
        image: a,
      },
      {
        id: "2",
        image: b,
      },
      {
        id: "3",
        image: c,
      },
      {
        id: "4",
        image: d,
      },
      {
        id: "5",
        image: e,
      },
      {
        id: "6",
        image: f,
      },
      {
        id: "7",
        image: g,
      },
      {
        id: "8",
        image: h,
      },
    ];

    handleRandom(imageList);
    let countAds = 0;
    let startAds = setInterval(() => {
      countAds++;
      handleRandom(imageList);
      count.current = countAds;
    }, 2000);

    return () => {
      clearInterval(startAds);
    };
  }, []);

  const progressBar = () => {
    switch (count.current) {
      case 1:
        return 15;
      case 2:
        return 30;
      case 3:
        return 45;
      case 4:
        return 60;
      case 5:
        return 75;
      default:
        return 0;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white pb-4 border-2 rounded-r-xl shadow-lg">
      <div className="flex flex-col items-center relative">
        <img className="h-28 w-full rounded-r-xl" src={nature} alt="nature" />

        <div className="absolute -bottom-4 flex justify-center items-center">
          <Tooltip content="Profile" placement="top">
            <Avatar
              className="rounded-full"
              style={{ width: "35px", height: "35px" }}
              src={user?.photoURL || avatar}
              alt="avatar"
            ></Avatar>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col items-center pt-6">
        <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none mb-10">
          {user?.email || userData?.email}
        </p>
        <p className="font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none mb-4">
          Obten el premium
        </p>
        <PayPalButton />
      </div>

      <div className="flex flex-col justify-center items-center pt-20">
        <p className="font-roboto font-bold text-lg no-underline tracking-normal leading-none py-2">
          Patrocinadores
        </p>
        <div
          style={{ width: `${progressBar()}%` }}
          className="bg-blue-600 rounded-xl h-1 mb-4"
        ></div>
        <img className="h-36 rounded-lg" src={data.image} alt="ads" />
      </div>
    </div>
  );
};

export default LeftSide;

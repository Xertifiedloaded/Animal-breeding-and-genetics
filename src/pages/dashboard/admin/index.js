import React, { useEffect, useState } from "react";
import DataTable from "./DashboardComponent";

import { FaPlus, FaUser } from "react-icons/fa";
import { useApiContext } from "@/context-provider/ApiProvider";
import { MdDashboard, MdEmail, MdSettings } from "react-icons/md";
import AdminsPage from "./Admin";
const developmentUrl = 'https://animal-breeding-and-genetics-rbbu.vercel.app'
// const developmentUrl = "http://localhost:3000";
export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token;
  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  try {
    const response = await fetch(`${developmentUrl}/api/auth/me`, {
      headers: {
        Cookie: `token=${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    const { user } = await response.json();
    console.log(user);
    return {
      props: { user },
    };
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}

export default function Admin({ user }) {
  const [currentAction, setCurrentAction] = useState(0);
  const { loading, sendEmailToAllUsers } = useApiContext();

  const collections = [
    {
      name: "Dashboard",
      icon: (
        <MdDashboard
          color="white"
          className="font-400 text-[10px] md:text-sm"
        />
      ),
      onClick: () => handleActionClick(0),
    },
    {
      name: "Admin",
      icon: (
        <FaUser color="white" className="font-400 text-[10px] md:text-sm" />
      ),
      onClick: () => handleActionClick(1),
    },
    {
      name: "Settings",
      icon: (
        <MdSettings color="white" className="font-400 text-[10px] md:text-sm" />
      ),
      onClick: () => handleActionClick(2),
    },
    {
      name: "Email",
      icon: (
        <MdEmail color="white" className="font-400 text-[10px] md:text-sm" />
      ),
      onClick: () => sendEmailToAllUsers(),
    },
  ];

  const handleActionClick = (action) => {
    setCurrentAction(action);
  };

  const renderComponent = () => {
    switch (currentAction) {
      case 0:
        return <DataTable user={user} />;
      case 1:
        return <AdminsPage />;
      case 2:
        return "Settings Component";
      default:
        return null;
    }
  };

  useEffect(() => {}, []);

  const currentTabName = collections[currentAction].name;

  return (
    <>
      <section className="wrapper">
        <div className="flex w-full py-2 justify-between items-center">
          <h1 className="lg:text-5xl text-2xl capitalize">
            Welcome {user.name}!
          </h1>
          <button className="bg-gray-600 rounded-xl hover:bg-gray-950 transition-all duration-300 ease-out text-xs h-[30px] text-white w-[70px] lg:w-[80px]">Log Out</button>
        </div>
        <h4 className="my-4 lg:text-sm xs:text-sm font-600">{`Dashboard > ${currentTabName}`}</h4>
        <div className="grid grid-cols-2 mt-4 lg:grid-cols-4 gap-3">
          {collections.map((collection, idx) => (
            <div
              key={idx}
              onClick={collection.onClick}
              className="border rounded-lg bg-gray-600 text-white px-3 py-1 md:p-4 border-black"
            >
              <h2 className="text-sm md:text-md">{collection.name}</h2>
              <div className="border my-4 md:my-3 md:w-6 md:h-6 w-5 h-5 grid items-center rounded-full justify-center border-white">
                {collection.icon}
              </div>
            </div>
          ))}
        </div>
        {renderComponent()}
      </section>
    </>
  );
}

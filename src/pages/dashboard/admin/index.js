

import React, { useState } from "react";
import DataTable from "./DashboardComponent";
import { FaEnvelope, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { MdDashboard, MdSettings } from "react-icons/md";
import AdminsPage from "./Admin";
import { useApiContext } from "@/context-provider/ApiProvider";

// const developmentUrl = "http://localhost:3000";
const developmentUrl = 'https://animal-breeding-and-genetics-rbbu.vercel.app'
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { sendEmailToAllUsers } = useApiContext();

  const collections = [
    {
      name: "Dashboard",
      icon: <MdDashboard className="text-2xl" />,
      onClick: () => handleActionClick(0),
    },
    {
      name: "Admin",
      icon: <FaUser className="text-2xl" />,
      onClick: () => handleActionClick(1),
    },
    {
      name: "Settings",
      icon: <MdSettings className="text-2xl" />,
      onClick: () => handleActionClick(2),
    },
    {
      name: "Email",
      icon: <FaEnvelope className="text-2xl" />,
      onClick: () => sendEmailToAllUsers(),
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen);
  };

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

  const currentTabName = collections[currentAction].name;

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className={`fixed inset-0 top-0 left-0 lg:relative lg:w-64 w-64 bg-gray-800 text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="py-6 px-4 flex justify-between items-center lg:hidden">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <div className="py-6 px-4 space-y-4">
            {collections.map((collection, idx) => (
              <div
                key={idx}
                onClick={collection.onClick}
                className="flex items-center space-x-3 mb-4  p-2 cursor-pointer hover:bg-gray-700 rounded-lg transition"
              >
                {collection.icon}
                <span className=" text-sm ">{collection.name}</span>
              </div>
            ))}
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <header className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Welcome, {user.name}!
  
            </h2>

            <button
                className="text-black block lg:hidden  focus:outline-none"
                aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? (
                  <FaTimes className="w-3 h-3" />
                ) : (
                  <FaBars className="w-3 h-3" />
                )}
              </button>

          </div>
        </header>
        <h4 className="text-sm text-gray-700 mb-4">{`Dashboard > ${currentTabName}`}</h4>
        {renderComponent()}
      </main>
    </div>
  );
}

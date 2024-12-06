"use client"
import { useRouter } from "next/router"
import { signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { 
  FaUser, 
  FaSignOutAlt, 
  FaDashboard, 
  FaHome, 
  FaNetworkWired 
} from "react-icons/fa"

const Header = ({ session }) => {
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const menuItems = [
    {
      icon: <FaHome className="mr-2" />,
      label: "Home",
      action: () => router.push("/")
    },
    {
      icon: <FaDashboard className="mr-2" />,
      label: "Dashboard",
      action: () => router.push("/dashboard/admin")
    },
    {
      icon: <FaNetworkWired className="mr-2" />,
      label: "Alumni Network",
      action: () => router.push("/alumni")
    }
  ]

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r bg-black text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold flex items-center">
            <FaNetworkWired className="mr-2" />
            Alumni Portal
          </h1>
        </div>

        {session ? (
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-4">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="flex items-center hover:bg-blue-700 px-3 py-2 rounded-md transition-colors"
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center bg-blue-900 hover:bg-blue-800 px-4 py-2 rounded-full transition-colors"
              >
                <FaUser className="mr-2" />
                <span>{session.user.name}</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl overflow-hidden">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        item.action()
                        setIsDropdownOpen(false)
                      }}
                      className="flex items-center w-full px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                  <button
                    onClick={() => signOut({ callbackUrl: "/auth/login" })}
                    className="flex items-center w-full px-4 py-2 hover:bg-red-50 text-red-600 border-t"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}

export default Header
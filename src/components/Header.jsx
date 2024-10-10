"use client"
import { useRouter } from "next/router"
import { signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa" // Importing chevron icons

const Header = ({ session }) => {
  const router = useRouter()
  const [ip, setIp] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const fetchIp = async () => {
      const response = await fetch("/api/ip-address")
      const data = await response.json()
      setIp(data.ip)
    }

    fetchIp()
  }, [])

  const handleNavigation = (path) => {
    router.push(path)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  const closeDropdown = () => {
    setIsDropdownOpen(false)
  }

  return (
    <div className="flex text-sm lg:text-sm justify-between items-center bg-gray-800 text-white p-4 sticky top-0 z-20">
      {session ? (
        <>
          <div className="flex space-x-4">
            <button
              onClick={() =>
                handleNavigation(
                  router.pathname === "/" ? "/dashboard/admin" : "/"
                )
              }
              className={`px-1 py-2 rounded hover:bg-gray-600`}
            >
              {router.pathname === "/" ? "View Dashboard" : "View as Visitor"}
            </button>
          </div>

          <div className="relative">
            <button
              className="p-2 bg-black rounded-lg flex items-center space-x-2"
              onClick={toggleDropdown}
            >
              <span>{session.user.name}!</span>
              {isDropdownOpen ? (
                <FaChevronUp className="text-white" />
              ) : (
                <FaChevronDown className="text-white" />
              )}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 bg-white text-gray-800 rounded-lg shadow-lg mt-2 z-50">
                <div className="py-2 px-4">
                  <small
                    onClick={() => {
                      closeDropdown()
                      signOut({ callbackUrl: "/auth/login" })
                    }}
                    className="cursor-pointer hover:bg-gray-100 rounded-lg block text-left p-2"
                  >
                    Sign Out
                  </small>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <button className="p-2 bg-black rounded-lg flex items-center space-x-2">
          <span>Welcome, Alumni! {ip}</span>
        </button>
      )}
    </div>
  )
}

export default Header

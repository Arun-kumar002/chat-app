import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"
import axios from "axios"

const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const login = async (username, password) => {
    const success = handleInputErrors(username, password);
    if (!success) return;

    setLoading(true)
    try {
      const res = await axios.post('https://chat-app-gpx4.onrender.com/api/auth/login', { username, password },
        {
          withCredentials: true, headers: { "Content-Type": "application/json" },
        })
      const data = res.data;
      if (data.error) {
        throw new Error(data.error)
      }
      localStorage.setItem('chat-user', JSON.stringify(data))
      setAuthUser(data)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, login }
}

export default useLogin

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
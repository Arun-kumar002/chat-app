import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

// Create a context for managing socket-related data
const SocketContext = createContext();

// Custom hook to use the socket context
export const useSocketContext = () => {
    return useContext(SocketContext);
};

// Provider component for managing socket connection and online users
export const SocketContextProvider = ({ children }) => {
    // State for socket connection
    const [socket, setSocket] = useState(null);
    
    // State for online users
    const [onlineUsers, setOnlineUsers] = useState([]);

    // Accessing authentication context to get the authenticated user
    const { authUser } = useAuthContext();

    // Establishing and managing socket connection
    useEffect(() => {
        // Check if there is an authenticated user
        if (authUser) {
            // Connect to the socket server
            const socket = io(`${import.meta.env.VITE_URL}`, {
                query: {
                    userId: authUser._id, // Pass user ID as query parameter
                },
            });

            // Set the socket state
            setSocket(socket);

            // Listen for event to get online users
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users); // Update online users state
            });

            // Clean-up function to close socket connection when component unmounts
            return () => socket.close();
        } else {
            // If there is no authenticated user, close the socket connection
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]); // Re-run effect when authenticated user changes

    // Provide socket and online users data to the context
    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};

import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios"
const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const getMessages = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `https://chat-app-gpx4.onrender.com/api/message/${selectedConversation._id
                }`, { withCredentials: true }
            );
            const data = res.data;
            if (data.error) throw new Error(data.error);
            setMessages(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);

    return { messages, loading, getMessages };
};
export default useGetMessages;

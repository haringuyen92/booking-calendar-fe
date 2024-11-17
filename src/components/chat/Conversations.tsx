import React, {useState, useEffect, useCallback} from 'react';
import { get } from "../../utils/api";
import { showToastError } from "../../utils/toast";

interface User {
    id: string;
    username: string;
    email: string;
    avatar: string;
}

interface Message {
    id: string;
    sender_id: string;
    content: string;
    sent_at: Date;
    is_read: boolean;
}

interface LastMessage {
    content: string;
    send_at: Date;
    sender_id: number;
}

interface Conversation {
    id: string;
    participants: string[];
    created_at: Date;
    updated_at: Date;
    messages: Message[];
    last_message: LastMessage;
}

interface MessageParams {
    conversation_id: string;
}

const Conversations: React.FC = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const currentUserId = '1'; // Assuming the current user id

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                setIsLoading(true);
                const response = await get<Conversation[]>('/users/conversations/');
                setConversations(response.data);
            } catch (error) {
                console.error('Failed to fetch conversations:', error);
                showToastError('Failed to fetch conversations');
            } finally {
                setIsLoading(false);
            }
        };

        fetchConversations();
    }, []);

    const fetchMessages = useCallback(async (params: MessageParams) => {
        try {
            const response = await get<Message[]>('/users/messages', { params: params});
            setConversations((prev) => {
                return prev.map((conversation) => {
                    if (conversation.id === params.conversation_id) {
                        conversation.messages = response.data
                    }
                    return conversation
                })
            });
        } catch (error) {
            console.error('Failed to fetch messages:', error);
            showToastError('Failed to fetch messages');
        }
    }, [])

    const handleConversationClick = async (conversation: Conversation) => {
        await fetchMessages({conversation_id: conversation.id});
        setSelectedConversation(conversation);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() !== '' && selectedConversation) {
            const newMsg: Message = {
                id: Date.now().toString(),
                sender_id: currentUserId,
                content: newMessage,
                sent_at: new Date(),
                is_read: false
            };
            setSelectedConversation({
                ...selectedConversation,
                messages: [...selectedConversation.messages, newMsg]
            });
            setNewMessage('');
            // In a real app, you would also send this message to the server
        }
    };

    const getOtherParticipant = (conversation: Conversation): User => {
        // This is a mock function. In a real app, you'd fetch this data from your user list or API
        const otherUserId = conversation.participants.find(id => id !== currentUserId);
        return {
            id: otherUserId || '',
            username: `User ${otherUserId}`,
            email: `user${otherUserId}@example.com`,
            avatar: `https://i.pravatar.cc/150?img=${otherUserId}`
        };
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Chat</h2>
            </div>

            <div className="flex bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="w-1/3 border-r border-gray-200">
                    <div className="overflow-y-auto h-[calc(100vh-200px)]">
                        {conversations.map((conv) => {
                            const otherUser = getOtherParticipant(conv);
                            const lastMessage = conv.last_message
                            return (
                                <div
                                    key={conv.id}
                                    className={`flex items-center p-4 hover:bg-gray-100 cursor-pointer ${
                                        selectedConversation?.id === conv.id ? 'bg-gray-200' : ''
                                    }`}
                                    onClick={() => handleConversationClick(conv)}
                                >
                                    <img src={otherUser.avatar} alt={otherUser.username} className="w-12 h-12 rounded-full mr-4" />
                                    <div>
                                        <h3 className="font-semibold">{otherUser.username}</h3>
                                        <p className="text-sm text-gray-500 truncate">{lastMessage?.content}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="w-2/3 flex flex-col">
                    {selectedConversation ? (
                        <>
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100vh-300px)]">
                                {selectedConversation.messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`max-w-xs p-3 rounded-lg ${
                                            msg.sender_id === currentUserId
                                                ? 'bg-blue-500 text-white ml-auto'
                                                : 'bg-gray-200 text-gray-800'
                                        }`}
                                    >
                                        {msg.content}
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t border-gray-200">
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-500">
                            Select a conversation to start chatting
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Conversations;

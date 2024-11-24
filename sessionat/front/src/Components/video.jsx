import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import io from 'socket.io-client';

const VideoChat = () => {
    const [roomId, setRoomId] = useState('');
    const [inputRoomId, setInputRoomId] = useState('');
    const [peers, setPeers] = useState(new Map());
    const [socket, setSocket] = useState(null);
    const [stream, setStream] = useState(null);
    const [userCount, setUserCount] = useState(0);
    const [error, setError] = useState(null);
    const [isHost, setIsHost] = useState(false);
    const [isJoined, setIsJoined] = useState(false);
    const [remoteStreams, setRemoteStreams] = useState(new Map());
    const userVideo = useRef();
    const peersRef = useRef(new Map());

    // Generate a random room ID
    const generateRoomId = () => {
        return Math.random().toString(36).substring(2, 9);
    };

    // Create a new room
    const createRoom = () => {
        const newRoomId = generateRoomId();
        setRoomId(newRoomId);
        setIsHost(true);
        joinRoom(newRoomId);
    };

    // Copy room ID to clipboard
    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId);
        alert('Room ID copied to clipboard!');
    };

    // Handle room ID input change
    const handleInputRoomIdChange = (e) => {
        setInputRoomId(e.target.value);
    };

    // Join an existing room
    const joinRoom = (roomIdToJoin = inputRoomId) => {
        if (!stream) {
            setError('Please allow camera access before joining');
            return;
        }
        if (roomIdToJoin && socket) {
            socket.emit('joinRoom', roomIdToJoin);
            setRoomId(roomIdToJoin);
            setIsJoined(true);
        } else {
            setError('Please enter a valid room ID');
        }
    };

    useEffect(() => {
        // First get user media
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(mediaStream => {
                setStream(mediaStream);
                if (userVideo.current) {
                    userVideo.current.srcObject = mediaStream;
                }
                
                // Then initialize socket connection
                const newSocket = io('http://localhost:5000', {
                    transports: ['websocket', 'polling']
                });

                newSocket.on('connect', () => {
                    console.log('Connected to server');
                    setError(null);
                });

                newSocket.on('connect_error', (err) => {
                    console.error('Socket connection error:', err);
                    setError('Failed to connect to server');
                });

                setSocket(newSocket);

                return () => {
                    mediaStream.getTracks().forEach(track => track.stop());
                    if (newSocket) newSocket.close();
                    peers.forEach(peer => peer.destroy());
                };
            })
            .catch(err => {
                console.error('Error accessing media devices:', err);
                setError('Failed to access camera/microphone');
            });
    }, []);

    useEffect(() => {
        if (!socket || !stream) return;

        socket.on('userCount', (count) => {
            setUserCount(count);
        });

        socket.on('roomJoined', (data) => {
            console.log('Joined room:', data);
            setIsJoined(true);
            setUserCount(data.userCount);
        });

        socket.on('existingUsers', (users) => {
            console.log('Existing users:', users);
            // Clean up existing peers
            peersRef.current.forEach(peer => peer.destroy());
            peersRef.current = new Map();
            setPeers(new Map());

            users.forEach(userId => {
                if (userId !== socket.id) {
                    const peer = createPeer(userId, stream);
                    peersRef.current.set(userId, peer);
                }
            });
            setPeers(new Map(peersRef.current));
        });

        socket.on('userJoined', (userId) => {
            console.log('New user joined:', userId);
            if (!peersRef.current.has(userId)) {
                const peer = createPeer(userId, stream);
                peersRef.current.set(userId, peer);
                setPeers(new Map(peersRef.current));
            }
        });

        socket.on('userLeft', (userId) => {
            console.log('User left:', userId);
            if (peersRef.current.has(userId)) {
                peersRef.current.get(userId).destroy();
                peersRef.current.delete(userId);
                setPeers(new Map(peersRef.current));
                
                setRemoteStreams(prev => {
                    const newStreams = new Map(prev);
                    newStreams.delete(userId);
                    return newStreams;
                });
            }
        });

        socket.on('offer', ({ offer, from }) => {
            console.log('Received offer from:', from);
            handleReceiveOffer(offer, from);
        });

        socket.on('answer', ({ answer, from }) => {
            console.log('Received answer from:', from);
            const peer = peersRef.current.get(from);
            if (peer) {
                peer.signal(answer);
            }
        });

        socket.on('ice-candidate', ({ candidate, from }) => {
            console.log('Received ICE candidate from:', from);
            const peer = peersRef.current.get(from);
            if (peer) {
                peer.signal(candidate);
            }
        });

        return () => {
            socket.off('userCount');
            socket.off('roomJoined');
            socket.off('existingUsers');
            socket.off('userJoined');
            socket.off('userLeft');
            socket.off('offer');
            socket.off('answer');
            socket.off('ice-candidate');
        };
    }, [socket, stream]);

    const createPeer = (userId, stream) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
            config: {
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },
                    { urls: 'stun:global.stun.twilio.com:3478' }
                ]
            }
        });

        peer.on('signal', data => {
            console.log('Signaling to:', userId);
            socket.emit('offer', { 
                offer: data, 
                targetUser: userId, 
                roomId 
            });
        });

        peer.on('stream', remoteStream => {
            console.log('Received stream from:', userId);
            setRemoteStreams(prev => {
                const newStreams = new Map(prev);
                newStreams.set(userId, remoteStream);
                return newStreams;
            });
        });

        peer.on('error', err => {
            console.error('Peer error:', err);
            removeVideoStream(userId);
        });

        peer.on('close', () => {
            console.log('Peer closed:', userId);
            removeVideoStream(userId);
        });

        return peer;
    };

    const handleReceiveOffer = (offer, from) => {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
            config: {
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },
                    { urls: 'stun:global.stun.twilio.com:3478' }
                ]
            }
        });

        peer.on('signal', data => {
            socket.emit('answer', { 
                answer: data, 
                targetUser: from 
            });
        });

        peer.on('stream', remoteStream => {
            console.log('Received stream in answer from:', from);
            setRemoteStreams(prev => {
                const newStreams = new Map(prev);
                newStreams.set(from, remoteStream);
                return newStreams;
            });
        });

        peer.on('error', err => {
            console.error('Peer error in answer:', err);
            removeVideoStream(from);
        });

        peer.signal(offer);
        peersRef.current.set(from, peer);
        setPeers(new Map(peersRef.current));
    };

    const removeVideoStream = (userId) => {
        setRemoteStreams(prev => {
            const newStreams = new Map(prev);
            newStreams.delete(userId);
            return newStreams;
        });
    };

    return (
        <div className="p-4 max-w-6xl mx-auto mt-32">
            {/* Error Display */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Room Creation and Joining UI */}
            {!isJoined && (
                <div className="mb-8 space-y-4">
                    {/* Create Room Button */}
                    <div>
                        <button
                            onClick={createRoom}
                            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            Create New Room
                        </button>
                    </div>

                    {/* Join Room Form */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter Room ID"
                            value={inputRoomId}
                            onChange={handleInputRoomIdChange}
                            className="border p-2 rounded flex-grow"
                        />
                        <button
                            onClick={() => joinRoom()}
                            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        >
                            Join Room
                        </button>
                    </div>
                </div>
            )}

            {/* Room Info */}
            {roomId && (
                <div className="mb-6">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-semibold">Room ID: {roomId}</h2>
                        <button
                            onClick={copyRoomId}
                            className="px-4 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
                        >
                            Copy ID
                        </button>
                    </div>
                    <p className="text-gray-600 mt-1">
                        Users in room: {userCount}
                    </p>
                </div>
            )}

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Local Video */}
                <div className="relative bg-gray-200 rounded-lg overflow-hidden aspect-video">
                    <h3 className="absolute top-2 left-2 z-10 font-semibold text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                        Your Video
                    </h3>
                    <video
                        ref={userVideo}
                        muted
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Remote Videos */}
                {Array.from(remoteStreams).map(([userId, remoteStream]) => (
                    <div key={userId} className="relative bg-gray-200 rounded-lg overflow-hidden aspect-video">
                        <h3 className="absolute top-2 left-2 z-10 font-semibold text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                            User {userId.slice(0, 4)}
                        </h3>
                        <video
                            key={userId}
                            autoPlay
                            playsInline
                            ref={el => {
                                if (el) el.srcObject = remoteStream;
                            }}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoChat;
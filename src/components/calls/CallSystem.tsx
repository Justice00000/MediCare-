import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff } from 'lucide-react';

interface CallSystemHandle {
  startCall: (targetUserId: string, targetUserName: string) => void;
}

const CallSystem = forwardRef<CallSystemHandle>((props, ref) => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  
  const [inCall, setInCall] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [incomingCall, setIncomingCall] = useState<any>(null);
  const [currentCall, setCurrentCall] = useState<string | null>(null);
  const [callPartner, setCallPartner] = useState<string>('');
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  useImperativeHandle(ref, () => ({
    startCall: (targetUserId: string, targetUserName: string) => {
      handleStartCall(targetUserId, targetUserName);
    }
  }));

  const handleStartCall = async (targetUserId: string, targetUserName: string) => {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: isVideoEnabled,
        audio: isAudioEnabled,
      });
      
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Create peer connection
      const peerConnection = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
        ],
      });
      
      peerConnectionRef.current = peerConnection;

      // Add local stream to peer connection
      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
      });

      // Handle remote stream
      peerConnection.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      setInCall(true);
      setCallPartner(targetUserName);
      setCurrentCall(targetUserId);

      toast({
        title: "Call Started",
        description: `Starting call with ${targetUserName}`,
      });
    } catch (error) {
      console.error('Error starting call:', error);
      toast({
        title: "Error",
        description: "Failed to start call. Please check your camera/microphone permissions.",
        variant: "destructive",
      });
    }
  };

  const endCall = async () => {
    // Stop local stream
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }

    // Close peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    // Clean up video elements
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    setInCall(false);
    setCurrentCall(null);
    setCallPartner('');

    toast({
      title: "Call Ended",
      description: "The call has been ended",
    });
  };

  const toggleVideo = async () => {
    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks[0].enabled = !videoTracks[0].enabled;
        setIsVideoEnabled(videoTracks[0].enabled);
      } else if (!isVideoEnabled) {
        // Add video track if not present
        try {
          const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
          const videoTrack = videoStream.getVideoTracks()[0];
          if (peerConnectionRef.current && videoTrack) {
            peerConnectionRef.current.addTrack(videoTrack, localStreamRef.current);
            localStreamRef.current.addTrack(videoTrack);
            setIsVideoEnabled(true);
          }
        } catch (error) {
          console.error('Error enabling video:', error);
        }
      }
    }
  };

  const toggleAudio = async () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  return (
    <div className="w-full">
      {/* Call Interface */}
      {inCall && (
        <div className="fixed inset-0 bg-black z-50">
          <div className="relative h-full">
            {/* Remote Video */}
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            
            {/* Local Video */}
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="absolute top-4 right-4 w-48 h-36 object-cover rounded-lg border-2 border-white"
            />

            {/* Call Info */}
            <div className="absolute top-4 left-4 text-white">
              <h2 className="text-xl font-semibold">Call with {callPartner}</h2>
              <p className="text-sm opacity-75">Connected</p>
            </div>

            {/* Call Controls */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <Button
                onClick={toggleAudio}
                variant={isAudioEnabled ? "secondary" : "destructive"}
                size="lg"
                className="rounded-full w-12 h-12"
              >
                {isAudioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
              </Button>
              
              <Button
                onClick={toggleVideo}
                variant={isVideoEnabled ? "secondary" : "destructive"}
                size="lg"
                className="rounded-full w-12 h-12"
              >
                {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
              </Button>
              
              <Button
                onClick={endCall}
                variant="destructive"
                size="lg"
                className="rounded-full w-12 h-12"
              >
                <PhoneOff className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Call System UI for Admin Dashboard */}
      {!inCall && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Call System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <Button
                onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                variant={isVideoEnabled ? "default" : "outline"}
              >
                {isVideoEnabled ? <Video className="w-4 h-4 mr-2" /> : <VideoOff className="w-4 h-4 mr-2" />}
                {isVideoEnabled ? "Video On" : "Video Off"}
              </Button>
              
              <Button
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                variant={isAudioEnabled ? "default" : "outline"}
              >
                {isAudioEnabled ? <Mic className="w-4 h-4 mr-2" /> : <MicOff className="w-4 h-4 mr-2" />}
                {isAudioEnabled ? "Audio On" : "Audio Off"}
              </Button>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Configure your call settings and start calls with medical staff or patients. Click the call buttons next to user profiles to start a call.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
});

CallSystem.displayName = 'CallSystem';

export default CallSystem;
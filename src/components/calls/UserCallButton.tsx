import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Video } from 'lucide-react';

interface UserCallButtonProps {
  userId: string;
  userName: string;
  onStartCall: (targetUserId: string, targetUserName: string) => void;
  disabled?: boolean;
}

const UserCallButton: React.FC<UserCallButtonProps> = ({
  userId,
  userName,
  onStartCall,
  disabled = false,
}) => {
  return (
    <div className="flex space-x-2">
      <Button
        size="sm"
        onClick={() => onStartCall(userId, userName)}
        disabled={disabled}
        className="bg-blue-600 hover:bg-blue-700"
      >
        <Phone className="w-4 h-4 mr-1" />
        Call
      </Button>
      
      <Button
        size="sm"
        variant="outline"
        onClick={() => onStartCall(userId, userName)}
        disabled={disabled}
      >
        <Video className="w-4 h-4 mr-1" />
        Video
      </Button>
    </div>
  );
};

export default UserCallButton;
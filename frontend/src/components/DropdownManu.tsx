import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';

interface DropdownMenuProps {
  onLogout: () => void;
}

const DropdownMenuComponent: React.FC<DropdownMenuProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handleClick = (path: string) => {
    navigate(path);
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{userInfo?.name}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        {userInfo?.isAdmin && (
          <DropdownMenuItem
            onClick={() => handleClick('/admin')}
            className="cursor-pointer"
          >
            <MdAdminPanelSettings className="text-2xl mr-1" />

            <span>Admin Dashboard</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          onClick={() => handleClick('/profile')}
          className="cursor-pointer"
        >
          <FaUserCircle className="text-2xl mr-1" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
          <RiLogoutBoxFill className="text-2xl mr-1" />
          <span>LOGOUT</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuComponent;

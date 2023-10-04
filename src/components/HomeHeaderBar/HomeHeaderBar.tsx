import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchUser } from '@/redux/reducers/userReducers';
import logo from '@/assets/images/chatflow-logo-round-blue-bg.png';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  ButtonGroup,
  HStack,
} from '@chakra-ui/react';
import { SettingsIcon, HamburgerIcon } from '@chakra-ui/icons';
import { AiOutlinePlus, AiOutlineLogout } from 'react-icons/ai';

const HomeHeaderBar = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.profile);
  const { username } = userInfo;

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div
      style={{
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottom: '1px solid #D8D8D8',
        zIndex: 1001,
      }}
    >
      <HStack
        className="h-16 w-screen justify-between flex-1 "
        style={{ maxWidth: '1100px' }}
      >
        {/* Left Part */}
        <HStack>
          <img
            className="w-[35px] h-[35px] rounded-full shadow-2xl mr-2"
            src={logo}
            alt="chat flow logo"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              window.location.href = '/';
            }}
          />
          <h1 className="font-black text-lg">ChatFlow</h1>
        </HStack>
        {/* Right Part */}
        <ButtonGroup spacing="2">
          <Button
            leftIcon={<SettingsIcon />}
            backgroundColor="#F4F4F5"
            _hover={{ bg: '#E5E5E8' }}
            _active={{ bg: '#D8D8D8' }}
            variant="solid"
          >
            Settings
          </Button>
          <Menu isLazy placement="bottom-end" autoSelect={false}>
            <MenuButton
              as={Button}
              rightIcon={<HamburgerIcon />}
              borderColor="#D8D8D8"
              backgroundColor="#FFFFFF"
              _hover={{ bg: '#F4F4F5' }}
              _active={{ bg: '#E4E4E7' }}
              variant="outline"
            >
              <HStack>
                {/* Edit: pass the username */}
                <p>{username}'s Workspace</p>
                {/* Edit: pass the identity */}
                <span
                  style={{
                    backgroundColor: '#F4F4F5',
                    padding: '5px 8px',
                    borderRadius: '0.375rem',
                  }}
                >
                  Free
                </span>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem icon={<AiOutlinePlus />}>New Workspace</MenuItem>
              <MenuItem icon={<AiOutlineLogout />}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </ButtonGroup>
      </HStack>
    </div>
  );
};

export default HomeHeaderBar;

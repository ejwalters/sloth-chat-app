import React, { useState } from 'react'
import styled from 'styled-components';
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useAuthState } from 'react-firebase-hooks/auth';
import Modal from '@material-ui/core/Modal';
import { auth } from "../firebase";
import Button from '@material-ui/core/Button';


function Header() {

    const [user] = useAuthState(auth);
    const [open, setOpen] = useState(false);

    function handleUpgradeClick() {
        console.log('Upgrade Subscription Clicked');
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleInquireClick() {
        // Handle the inquire click here
    }

    return <HeaderContainer>

        {/* Header Left */}
        <HeaderLeft>
            <HeaderAvatar
                onClick={() => auth.signOut()}
                alt={user?.displayName}
                src={user?.photoURL}
            />
            <AccessTimeIcon />
        </HeaderLeft>
        {/* Header Search */}
        <HeaderSearch>
            <SearchIcon />
            <input placeholder='Search'></input>
        </HeaderSearch>
        {/* Header Right */}
        <HeaderRight>
            <UpgradeButton variant="contained" onClick={handleUpgradeClick}>
                Upgrade Subscription
            </UpgradeButton>
        </HeaderRight>

        {/* Upgrade Modal */}
        <StyledModal open={open} onClose={handleClose}>
            <ModalContent>
                <Plan>
                    <h2>Individual Plan</h2>
                    <p>Feature details...</p>
                    <Button onClick={handleInquireClick}>Inquire</Button>
                </Plan>
                <Plan>
                    <h2>Business Plan</h2>
                    <p>Feature details...</p>
                    <Button onClick={handleInquireClick}>Inquire</Button>
                </Plan>
                <Plan>
                    <h2>Enterprise Plan</h2>
                    <p>Feature details...</p>
                    <Button onClick={handleInquireClick}>Inquire</Button>
                </Plan>
            </ModalContent>
        </StyledModal>

    </HeaderContainer>
}

export default Header

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Plan = styled.div`
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  text-align: center;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  outline: none;
`;

const UpgradeButton = styled(Button)`
    && {
        background-color: lightgreen;
        margin-right: 40px;
        color: black;
        font-weight: 600;
    }

    &:hover {
        background-color: darkgreen;
    }
`;

const HeaderRight = styled.div`
    flex: 0.3;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    margin-right: 20px;

    > .MuiSvgIcon-root {
        margin-right: 20px;
    }
`;

const HeaderSearch = styled.div`
    flex: 0.4;
    opacity: 1;
    border-radius: 6px;
    background-color: var(--sloth-chat-color);
    text-align: center;
    display: flex;
    padding: 0 50px;
    color: gray;
    border: 1px gray solid;

    > input {
        background-color: transparent;
        border: none;
        text-align: center;
        min-width: 30vw;
        outline: 0;
        color: white;
    }

`;

const HeaderContainer = styled.div` 
    display: flex;
    position: fixed;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    background-color: var(--sloth-chat-color);
    color: white;

;`

const HeaderLeft = styled.div`
    flex: 0.3;
    display: flex;
    align-items: center;
    margin-left: 20px;

    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 30px;
    }

`;

const HeaderAvatar = styled(Avatar)`
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }


`;
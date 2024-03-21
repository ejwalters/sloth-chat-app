import React, { useState } from 'react'
import styled from 'styled-components';
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { AnalyticsBrowser } from "@segment/analytics-next";
import { useAuthState } from 'react-firebase-hooks/auth';
import Modal from '@material-ui/core/Modal';
import { auth } from "../firebase";
import Button from '@material-ui/core/Button';
import { darken } from 'polished';


function Header() {

    const [user] = useAuthState(auth);
    const [open, setOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('business');
    const analytics = AnalyticsBrowser.load({ writeKey: 'TD0oABfXUMo4C1p01WUgvXL3atnHCaWR' });

    function handleUpgradeClick() {
        console.log('Upgrade Subscription Clicked');
        analytics.track('Upgrade Clicked', {
        });
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleInquireClick(planType) {
        return () => {
            console.log('Inquire Clicked - ', planType);
            analytics.track('Inquire Clicked', {
                planType: planType
            });
        }
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
                <Plan selected={selectedPlan === 'individual'} onClick={() => setSelectedPlan('individual')}>
                    <h2>Individual Plan</h2>
                    <ul>
                        <ListItem><CheckCircleIcon />Free Forever</ListItem>
                        <ListItem><CheckCircleIcon />5 Channels</ListItem>
                        <ListItem><CheckCircleIcon />10 Users</ListItem>
                    </ul>
                    <InquireButton color="lightblue" onClick={handleInquireClick('individual')}>Learn More</InquireButton>
                </Plan>
                <Plan selected={selectedPlan === 'business'} onClick={() => setSelectedPlan('business')}>
                    <h2>Business Plan</h2>
                    <ul>
                        <ListItem><CheckCircleIcon />20 Channels</ListItem>
                        <ListItem><CheckCircleIcon />5 Integrations</ListItem>
                        <ListItem><CheckCircleIcon />20 Users</ListItem>
                    </ul>
                    <InquireButton color="lightgreen" onClick={handleInquireClick('business')}>Learn More</InquireButton>
                </Plan>
                <Plan selected={selectedPlan === 'enterprise'} onClick={() => setSelectedPlan('enterprise')}>
                    <h2>Enterprise Plan</h2>
                    <ul>
                        <ListItem><CheckCircleIcon />Unlimited Channels</ListItem>
                        <ListItem><CheckCircleIcon />Unlimited Integrations</ListItem>
                        <ListItem><CheckCircleIcon />Unlimited Users</ListItem>
                    </ul>
                    <InquireButton color="lightcoral" onClick={handleInquireClick('enterprise')}>Learn More</InquireButton>
                </Plan>
            </ModalContent>
        </StyledModal>

    </HeaderContainer>
}

export default Header

const InquireButton = styled(Button)`
  background-color: ${props => props.color || 'lightgreen'} !important;
  margin-top: 40px !important;

  &:hover {
    background-color: ${props => darken(0.2, props.color || 'lightgreen')} !important;
  }
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;

  .MuiSvgIcon-root {
    color: lightgreen;
    margin-right: 10px;
  }
`;

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
  margin: 20px;
  text-align: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;

  transition: transform 0.3s ease;
  transform: perspective(500px) translateZ(0);

  ${props => props.selected && `
    border: 2px solid lightgreen;
    box-shadow: 0 0 10px lightgreen;
    transform: perspective(500px) translateZ(20px) scale(1.05);
  `}

  ul {
    list-style: none;
    padding: 0;
    text-align: center;
    margin-top: 20px;
  }
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
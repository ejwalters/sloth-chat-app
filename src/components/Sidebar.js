import React from 'react'
import styled from 'styled-components';
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import SidebarOption from './SidebarOption';
import SidebarFeature from './SidebarFeature';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import VideocamIcon from '@material-ui/icons/Videocam';
import PhoneIcon from '@material-ui/icons/Phone';
import AppsIcon from '@material-ui/icons/Apps';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

function Sidebar() {

    const [channels, loading, error] = useCollection(db.collection("rooms"));
    const [user] = useAuthState(auth);
    return (
        <SidebarContainer>
            <SidebarHeader>
                <SidebarInfo>
                    <h2>Sloth Chat HQ</h2>
                    <h3>
                        <FiberManualRecordIcon />
                        Eric Walters
                    </h3>
                </SidebarInfo>
                <CreateIcon />
            </SidebarHeader>
            <SidebarFeature Icon={InsertCommentIcon} title="Threads" />
            <SidebarFeature Icon={InboxIcon} title="Mentions & Reactions" />
            <SidebarFeature Icon={VideocamIcon} title="Start Video Call" />
            <SidebarFeature Icon={PhoneIcon} title="Start Audio Call" />
            <StyledLink to="/support">
                <SidebarFeature Icon={ContactSupportIcon} title="Open Support Ticket" />
            </StyledLink>
            <SidebarFeature Icon={AppsIcon} title="Add Integration" />


            <hr />
            <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
            <hr />
            <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />


            {channels?.docs.map(doc => (
                <StyledLink to="/"><SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
                </StyledLink>
            ))}


        </SidebarContainer >
    )
}

export default Sidebar;

const StyledLink = styled(Link)`
  outline: none;
  text-decoration: none;
  color: inherit; // or any color you want

  &:active {
    color: inherit; // or any color you want
  }
`;

const SidebarContainer = styled.div`
    background-color: var(--sloth-chat-color);
    color: white;
    flex: 0.3;
    border-top: 1px solid white;
    max-width: 260px;
    margin-top: 60px;

    > hr {
        margin-top: 10px;
        margin-bottom: 10px;
        border: 1px solid white;
    }

`;

const SidebarHeader = styled.div`
    display: flex;
    border-bottom: 1px solid white;
    padding-bottom: 10px;
    padding: 13px;

    > .MuiSvgIcon-root {
        padding: 8px;
        color: var(--sloth-chat-color);
        font-size: 18px;
        background-color: white;
        border-radius: 999px;
    }

`;

const SidebarInfo = styled.div`
    flex: 1;

    > h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }

    > h3 {
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center;
    }

    > h3 > .MuiSvgIcon-root {
        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
    }

`;

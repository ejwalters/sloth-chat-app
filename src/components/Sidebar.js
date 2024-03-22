import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import SidebarOption from './SidebarOption';
import SidebarFeature from './SidebarFeature';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VideocamIcon from '@material-ui/icons/Videocam';
import PhoneIcon from '@material-ui/icons/Phone';
import AppsIcon from '@material-ui/icons/Apps';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import { withStyles } from '@material-ui/core/styles';
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import sfdcImage from '../images/sfdc.png';
import gdriveImage from '../images/gdrive.png';
import gcalImage from '../images/gcal.png';
import airtableImage from '../images/airtable.png';
import githubImage from '../images/github.png';
function Sidebar({ traits }) {

    console.log('SIDEBAR TRAITS: ', traits);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [segmentProfileModalOpen, setSegmentProfileModalOpen] = useState(false);
    const integrations = [
        {
            name: 'Salesforce',
            image: sfdcImage,
            description: 'Access customer data and sales insights directly within Sloth Chat for real-time collaboration and faster decision-making.'
        },
        {
            name: 'Google Drive',
            image: gdriveImage,
            description: 'Share and collaborate on documents, spreadsheets, and presentations within Sloth Chat channels, improving communication and productivity.'
        },
        {
            name: 'Google Calendar',
            image: gcalImage,
            description: 'View and manage schedules, set reminders, and schedule meetings without leaving Sloth Chat, fostering better organization and coordination.'
        },
        {
            name: 'Airtable',
            image: airtableImage,
            description: 'Organize and track projects, workflows, and tasks directly within Sloth Chat channels, improving transparency and collaboration.'
        },
        {
            name: 'Github',
            image: githubImage,
            description: 'Receive real-time notifications, monitor code changes, and collaborate on projects seamlessly within Sloth Chat, facilitating smoother development workflows.'
        },
    ];

    const handleAddIntegration = () => {
        console.log('OPEN MODAL');
        setModalIsOpen(true);
    };

    const handleProfileAPIClick = () => {
        console.log('OPEN PROFILE API OPEN');
        setSegmentProfileModalOpen(true);
    };

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
            <SidebarFeature Icon={AccountCircleIcon} title="Segment Profile API" onClick={handleProfileAPIClick} />
            <SidebarFeature Icon={VideocamIcon} title="Start Video Call" />
            <SidebarFeature Icon={PhoneIcon} title="Start Audio Call" />
            <StyledLink to="/support">
                <SidebarFeature Icon={ContactSupportIcon} title="Open Support Ticket" />
            </StyledLink>
            <SidebarFeature Icon={AppsIcon} onClick={handleAddIntegration} title="Add Integration" />
            <hr />
            <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
            <hr />
            <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />

            {channels?.docs.map(doc => (
                <StyledLink to="/"><SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
                </StyledLink>
            ))}

            { /* Add Integration Modal */}
            <StyledModal
                open={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
            >
                <ModalContent>
                    <IntegrationHeader>
                        <h1>Integrations</h1>
                        <RedTooltip title="Your Business Plan only allows 5 integrations.">
                            <span>
                                <Button variant="contained" disabled>
                                    Add Integration
                                </Button>
                            </span>
                        </RedTooltip>
                    </IntegrationHeader>
                    {integrations.map(integration => (
                        <IntegrationRow key={integration.name}>
                            <IntegrationImage src={integration.image} alt={integration.name} />
                            <IntegrationDescription>{integration.description}</IntegrationDescription>
                            <IntegrationStatus>
                                <CheckIcon />
                                Enabled
                            </IntegrationStatus>
                        </IntegrationRow>
                    ))}
                </ModalContent>
            </StyledModal>

            <StyledModal
                open={segmentProfileModalOpen}
                onClose={() => setSegmentProfileModalOpen(false)}
            >
                <ModalContent>
                    {traits && traits.name && <h2>{traits.name}</h2>}
                    <table>
                        <tbody>
                            { /* Check if traits exist and turn traits into array and loop */}
                            {traits && Object.entries(traits).map(([key, value], index) => (
                                <tr key={index}>
                                    <td>{key}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ModalContent>
            </StyledModal>


        </SidebarContainer >
    )
}

export default Sidebar;

const RedTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: 'lightgray',
        fontSize: theme.typography.pxToRem(15),
        color: 'red',
        border: '1px solid red',
        textAlign: 'center',
    },
}))(Tooltip);

const IntegrationHeader = styled.div`
    display: flex;
    justify-content: space-between;

`;


const IntegrationRow = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 15px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const IntegrationImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const IntegrationDescription = styled.p`
  flex-grow: 1;
  font-size: small;
  margin-right: 10px;
`;

const IntegrationStatus = styled.div`
  display: flex;
  align-items: center;
  color: green;
`;


const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
  background: #fff;
  overflow: auto;
  background-color: white;
  outline: none;
  padding: 20px;
  border-radius: 5px;
`;

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

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
import { Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
//import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import CheckIcon from '@material-ui/icons/Check';
import { withStyles } from '@material-ui/core/styles';
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { integrations } from '../static/integrations';

function Sidebar({ traits, events }) {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [segmentProfileModalOpen, setSegmentProfileModalOpen] = useState(false);
    const [isTableCollapsed, setIsTableCollapsed] = useState(true);
    const [isEventsCollapsed, setIsEventsCollapsed] = useState(true);

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
                        <h1 style={{ fontSize: '1em' }}>Integrations</h1>
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
                                <CheckIcon style={{ fontSize: 20 }} />
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
                    {traits && traits.name && <div>{traits.name}</div>}
                    <IconButton onClick={() => setIsTableCollapsed(!isTableCollapsed)}>
                        <ExpandMoreIcon />
                        Traits
                    </IconButton>
                    <TableContainer component={Paper}>
                        <Collapse in={!isTableCollapsed}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Trait Name</TableCell>
                                        <TableCell>Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {traits && Object.entries(traits).map(([key, value], index) => (
                                        <StyledTableRow key={index}>
                                            <BoldTableCell>{key}</BoldTableCell>
                                            <TableCell>{value}</TableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Collapse>
                    </TableContainer>
                    <IconButton onClick={() => setIsEventsCollapsed(!isEventsCollapsed)}>
                        <ExpandMoreIcon />
                        Events
                    </IconButton>
                    <TableContainer component={Paper}>
                        <Collapse in={!isEventsCollapsed}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Event Name</TableCell>
                                        <TableCell>Properties</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {events && events.map((event, index) => (
                                        <StyledTableRow key={index}>
                                            <BoldTableCell>{event.event}</BoldTableCell>
                                            <TableCell>{Object.entries(event.properties).map(([key, value], i) => (
                                                <div key={i}>
                                                    <span style={{ fontWeight: 'bold' }}>{key}: </span>
                                                    <span>{value}</span>
                                                </div>
                                            ))}</TableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Collapse>
                    </TableContainer>
                </ModalContent>
            </StyledModal>


        </SidebarContainer >
    )
}

export default Sidebar;

const BoldTableCell = styled(TableCell)`
  font-weight: bold;
`;

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:hover': {
            backgroundColor: theme.palette.action.selected,
        },
    },
}))(TableRow);

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
  font-size: small;
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

  > div {
    font-size: 50px;
    font-weight: 600;
    margin-bottom: 20px;
  }
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

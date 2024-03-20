import React from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { enterRoom } from "../features/appSlice";

import { db } from '../firebase';
import { AnalyticsBrowser } from "@segment/analytics-next";


function SidebarOption({ Icon, title, addChannelOption, id }) {
    const analytics = AnalyticsBrowser.load({ writeKey: 'TD0oABfXUMo4C1p01WUgvXL3atnHCaWR' });
    const dispatch = useDispatch();
    console.log(Icon, title, addChannelOption, id);

    const addChannel = () => {
        const channelName = prompt('Please enter the channel name');

        if (channelName) {
            db.collection('rooms').add({
                name: channelName
            });

            analytics.track('Channel Added', {
                name: channelName
            });
        }
    };

    const selectChannel = () => {
        if (id) {
            dispatch(enterRoom({
                roomId: id
            }))

            analytics.track('Channel Viewed', {
                name: title
            });
        }
    };

    return (
        <SidebarOptionContainer
            onClick={addChannelOption ? addChannel : selectChannel}
        >
            {Icon && <Icon fontSize='small' style={{ padding: 10 }} />}
            {Icon ? (
                <h3>{title}</h3>

            ) : (
                <SidebarOptionChannel>
                    <span>#</span> {title}
                </SidebarOptionChannel>

            )
            }
        </SidebarOptionContainer >
    );
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
    color: white;
    display: flex;
    font-size: 12px;
    align-items: center;
    padding-left: 2px;
    cursor: pointer;

    :hover {
        opacity: 0.9;
        background-color: var(--sloth-chat-color);
    }

    > h3 {
        font-weight: 500;
    }

    > h3 > span {
        padding: 15px;
    }
`;

const SidebarOptionChannel = styled.h3`
    padding: 10px 0;
    font-weight: 300;


`;
import React from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { enterRoom } from "../features/appSlice";

import { db } from '../firebase';
import { AnalyticsBrowser } from "@segment/analytics-next";

function SidebarFeature({ Icon, title }) {
    const analytics = AnalyticsBrowser.load({ writeKey: 'TD0oABfXUMo4C1p01WUgvXL3atnHCaWR' });

    const trackFeature = () => {
        if (title === 'Open Support Ticket') {
            console.log('Feature clicked - ', title);
            analytics.track('Support Ticket Clicked', {
            });
        } else if (title === 'Add Integration') {
            analytics.track('Integration Added', {
                description: 'User added'
            });
        } else {
            analytics.track('Feature Clicked', {
                name: title
            });
        }
    }

    return (
        <SidebarFeatureContainer onClick={trackFeature}>
            {Icon && <Icon fontSize='small' style={{ padding: 10 }} />}
            <h3>{title}</h3>

        </SidebarFeatureContainer>
    )
}

export default SidebarFeature

const SidebarFeatureContainer = styled.div`
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


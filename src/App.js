import React, { useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Spinner from "react-spinkit";
import { AnalyticsBrowser } from "@segment/analytics-next";
import firebase from 'firebase/compat/app';
import SupportTicket from './components/SupportTicket'; // adjust the path according to your file structure




function App() {

  const [user, loading] = useAuthState(auth);
  const analytics = AnalyticsBrowser.load({ writeKey: 'TD0oABfXUMo4C1p01WUgvXL3atnHCaWR' });

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        analytics.identify(`${user.email}`, {
          name: user.displayName,
          email: user.email
        });
      } else {
        // User is signed out
      }
    });

    return () => unsubscribe(); // Unsubscribe from the auth state listener when component unmounts
  }, []);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img src="https://live.staticflickr.com/65535/53571179802_af31e4ae77_z.jpg" />

          <Spinner
            name="ball-spin-fade-loader" color="purple" fadeIn="none"
          />
        </AppLoadingContents>
      </AppLoading>
    );
  }

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Routes>
                <Route path="/" element={<Chat />} />
                <Route path="/support" element={<SupportTicket />} />
              </Routes>
            </AppBody>
          </>
        )}
      </Router>
    </div >
  );
}

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%
`;
const AppLoadingContents = styled.div`
    text-align: center;
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > img {
      height: 100px;
      padding: 20px;
      margin-bottom: 40px;
    }
`;

export default App;

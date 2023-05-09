import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyM2E5NWEyNS0zYzU0LTQ5YjMtODA1Zi1lZDZhYWYwZDAyMmYiLCJpYXQiOjE2ODM2MTI1NzcsImV4cCI6MTY4ODc5NjU3N30.JBG9sukgs0eEzRDSIr-IuqvGYAVtssd_rx0b6A9NRjs';

function App() {
  React.useEffect(() => {
    initSmallcase().then((res) => {
      window.gatewayInstance = new window.scDK({
        gateway: 'investmint',
        smallcaseAuthToken: res.data.smallcaseAuthToken,
        config: {
          isLeprechaun: true,
          amo: true,
        },
      });
    });
  });

  const onClick = () => {
    fetchSmallCaseTransaction().then((res) => {
      console.log(res);
    });
    window.gatewayInstance
      .fetchHoldings({ version: 'v2', gatewayname: 'gatewaydemo' })
      .then(({ data }) => console.log(data))
      .catch((err) => console.error(err));
  };

  const initSmallcase = () => {
    return axios.get(
      `https://invesapi-dev-pr-840.onrender.com/api/v1/smallcase/broker`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };
  
  const fetchSmallCaseTransaction = () => {
    return axios.post(
      `https://invesapi-dev-pr-840.onrender.com/api/v1/smallcase/transaction?mfHoldings=true`,
      {
        intent: 'HOLDINGS_IMPORT',
        version: 'v2',
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <button onClick={onClick}>Intiate smallcase token</button>
    </div>
  );
}

export default App;

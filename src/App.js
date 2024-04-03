import { useRef, useState } from 'react';
import './App.css';
function App() {
  const iframeElem = useRef();
  const [map, setMap] = useState(false);
/*
  const sendToMainPage = (obj) => {
    let origin = '*';
    console.log(iframeElem);
    if (null !== iframeElem.current) {
      iframeElem.current.contentWindow.postMessage(JSON.stringify(obj), origin);
    }

    // window.addEventListener('message', function(event) {
    //     // Check if the origin of the message is trusted
    //     if (event.origin !== 'https://localhost:3000') {
    //         console.log(`"Message received: " + ${JSON.stringify(obj)} `, event.origin);
    //         return;
    //     }
    // })
  };
*/
  function sendToMainPage(obj) {
    let origin = "*"
    let myIframe = document.getElementById("iframe_1");
    myIframe.contentWindow.postMessage(JSON.stringify(obj), origin);
}
  
  function moveToBuilding(lat, long, alt) {
      let obj = {
          cmd: 'sendToUe4',
          value: {
              cmd: 'moveToBuilding',
              lat: lat.toString(),
              long: long.toString(),
              alt: alt.toString()
          }
      };
      console.log(JSON.stringify(obj))
      sendToMainPage(obj);
/*
      let origin = '*';

      if (null !== iframeElem.current) {
          iframeElem.current.contentWindow.postMessage(JSON.stringify(obj), origin);
      }*/
  }

    function switchTo(val) {
        let obj = {
            cmd: 'sendToUe4',
            value: {
                Teleport: val,
            },
        };
        console.log(JSON.stringify(obj))
        sendToMainPage(obj);
    }

  function showMap(val) {
    let descriptor = {
        Teleport: val,
    };
    let obj = {
        cmd: 'ShowMap',
        value: descriptor,
    };
    console.log(JSON.stringify(obj))
    sendToMainPage(obj);
  }

  function toggleMap() {
    let descriptor = {
        Teleport: "Reveal",
    };
    let obj = {
        cmd: 'ToggleMap',
        value: descriptor,
    };
    console.log(JSON.stringify(obj))
    sendToMainPage(obj);
  }

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
        <div
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                padding: '10px',
                width: '250px',
                marginTop: '20px',
            }}
        >
            <button
                className='cmd-btn'
                style={{
                    outline: 'none',
                    border: 'none',
                    fontSize: '15px',
                    cursor: 'pointer',
                    padding: '8px 12px',
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgb(221 222 224)',
                    color: 'black',
                    fontWeight: '600',
                    borderRadius: '20px',
                }}
                onClick={() => {
                    moveToBuilding(38.9172,-77.0369,0.0);
                }}
            >
                <span style={{ fontSize: '17px' }}></span>{' '}
                <span>Lat/Long</span>
            </button>
            <button
                className='cmd-btn'
                style={{
                    outline: 'none',
                    border: 'none',
                    fontSize: '15px',
                    cursor: 'pointer',
                    padding: '8px 12px',
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgb(221 222 224)',
                    color: 'black',
                    fontWeight: '600',
                    borderRadius: '20px',
                }}
                onClick={() => {
                    setMap(!map);
                    showMap(map);
                }}
            >
                <span style={{ fontSize: '17px' }}></span>{' '}
                <span>Show Map</span>
            </button>
            <button
                className='cmd-btn'
                style={{
                    outline: 'none',
                    border: 'none',
                    fontSize: '15px',
                    cursor: 'pointer',
                    padding: '8px 12px',
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgb(221 222 224)',
                    color: 'black',
                    fontWeight: '600',
                    borderRadius: '20px',
                }}
                onClick={() => {
                    // toggleMap();
                    switchTo('6')
                }}
            >
                <span style={{ fontSize: '17px' }}></span>{' '}
                <span>Toggle Map</span>
            </button>
        </div>
        <div style={{ height: '100%', width: '100%' }}>
            <iframe
              style={{ border: 'none' }}
              ref={iframeElem}
              title='CBRE MC Test'
              allow='camera;microphone'
              id='iframe_1'
              src='https://connector.eagle3dstreaming.com/v5/imerza/CBRE_MarketCanvas_PS/CBRE_MarketCanvas?appVersion=3'
              // src='https://connector.eagle3dstreaming.com/v5/demo/E3DSFeaturesTemplate/E3DS-Iframe-Demo'
              width='100%'
              height='100%'
              allowFullScreen
            />
        </div>
    </div>
  );
}

export default App;

import { useRef, useState } from 'react';
import './App.css';
import { commands } from './utils';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
function App() {
  const iframeElem = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [cmd, setCmd] = useState('');
  const [map, setMap] = useState(false);

  const sendToMainPage = (obj) => {
    let origin = '*';
    console.log(iframeElem);
    if (null !== iframeElem.current) {
      iframeElem.current.contentWindow.postMessage(JSON.stringify(obj), origin);
    }

    window.addEventListener('message', function(event) {
        // Check if the origin of the message is trusted
        if (event.origin !== 'https://localhost:3000') {
            console.log(`"Message received: " + ${JSON.stringify(obj)} `, event.origin);
            return;
        }
    })
  };

  function hideSettings(id){
    let descriptor = {
      id,
      property: 'display',
      value: 'none'
    }

    let obj = {
      cmd: 'style',
      value: descriptor,
    }
    sendToMainPage(obj);
  }

  function switchTo(val) {
    let descriptor = {
      Teleport: val,
    };
    let obj = {
      cmd: 'sendToUe4',
      value: descriptor,
    };
    console.log(JSON.stringify(obj))
    sendToMainPage(obj);
  }

    function moveToBuilding(lat, long, alt) {
        let obj = {
            cmd: 'MoveToBuilding',
            lat: lat,
            long: long,
            alt: alt,
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
    <div style={{ display: 'flex', overflow: 'hidden' }}>
      <div
        style={{
          position: 'relative',
          borderRight: '1px solid #e3e3e3',
          background: '#ececec',
        }}
      >
        <div
          style={{
            display: isOpen ? 'block' : 'none',
          }}
        >
          <div style={{ textAlign: 'center', margin: '10px' }}>
            <img
              style={{ width: '70px', height: '70px' }}
              src='https://eagle3dstreaming.com/wp-content/uploads/2021/04/eagle3d-logo.png'
              alt='logo'
            />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              padding: '10px',
              width: '250px',
              marginTop: '20px',
            }}
          >
            {commands.map((item, index) => (
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
                  background: cmd === item.value ? 'black' : 'rgb(221 222 224)',
                  color: cmd === item.value ? 'white' : 'black',
                  fontWeight: '600',
                  borderRadius: '20px',
                }}
                onClick={() => {
                  setCmd(item.value);
                  switchTo(item.value);
                }}
                key={index}
              >
                <span style={{ fontSize: '17px' }}>{item.icon}</span>{' '}
                <span>{item.name}</span>
              </button>
            ))}
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
                      toggleMap();
                  }}
              >
                  <span style={{ fontSize: '17px' }}></span>{' '}
                  <span>Toggle Map</span>
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
                  background:'rgb(221 222 224)',
                  color: 'black',
                  fontWeight: '600',
                  borderRadius: '20px',
                }}
                onClick={() => {
                  hideSettings('e3ds_control_toggle_Obj');
                }}
              >
                <span style={{ fontSize: '17px' }}><FiSettings/></span>{' '}
                <span>Hide Settings</span>
              </button>
          </div>
        </div>

        <div
          className='left-right-arrow'
          style={{
            position: 'absolute',
            right: '-60px',
            top: '50%',
            fontSize: '40px',
            color: 'rgb(221 222 224)',
            cursor: 'pointer',
            border: 'none',
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <BsFillArrowLeftCircleFill />
          ) : (
            <BsFillArrowRightCircleFill />
          )}
        </div>
      </div>

      <div style={{ height: '100vh', width: '100%' }}>
        <iframe
          style={{ border: 'none' }}
          ref={iframeElem}
          title='demo'
          allow='camera;microphone'
          id='iframe_1'
          src='https://connector_imerza1.eaglepixelstreaming.com/v5/imerza/CBRE_MarketCanvas_PS/CBRE_MarketCanvas'
          // src='https://connector.eagle3dstreaming.com/v5/demo/E3DSFeaturesTemplate/E3DS-Iframe-Demo'
          width='100%'
          height='100%'
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default App;

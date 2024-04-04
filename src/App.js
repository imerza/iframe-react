import {useRef, useState} from 'react';
import './App.css';

function App() {
    const iframeElem = useRef();
    const [map, setMap] = useState(false);

    /* Transmits Data Packet to iFrame */
    function sendToMainPage(obj) {
        let origin = '*';
        console.log(iframeElem);
        console.log(JSON.stringify(obj));
        if (null !== iframeElem.current) {
            iframeElem.current.contentWindow.postMessage(JSON.stringify(obj), origin);
        }
    }

    /* Info Packet Framework, takes Input and Converts for Pass-through */
    function uePacket(payload) {
        let ueObj = {
            cmd: 'sendToUe4',
            value: payload
        };
        sendToMainPage(ueObj);
    }

    /* Jumps Camera to Position */
    function moveToBuilding(lat, long, alt) {
        let payload = {
            ueCmd: 'MoveToBuilding',
            lat: lat.toString(),
            long: long.toString(),
            alt: alt.toString()
        };
        uePacket(payload);
    }

    /* Reveals or Hides Map */
    function showMap(bool) {
        let payload = {
            ueCmd: 'ShowMap',
            showMap: bool
        };
        uePacket(payload);
    }

    /* Toggles Map */
    function toggleMap() {
        let payload = {
            ueCmd: 'ToggleMap'
        };
        uePacket(payload);
    }

    return (
        <div className={'wrapper'}>
            <div className={'cmd-btn-container'}>
                <button
                    className='cmd-btn'
                    onClick={() => {
                        moveToBuilding(38.9172, -77.0369, 0.0);
                    }}
                >
                    <span>Lat/Long</span>
                </button>
                <button
                    className='cmd-btn'
                    onClick={() => {
                        setMap(!map);
                        showMap(map);
                    }}
                >
                    <span>Show Map</span>
                </button>
                <button
                    className='cmd-btn'
                    onClick={() => {
                        toggleMap();
                    }}
                >
                    <span>Toggle Map</span>
                </button>
            </div>
            <iframe
                style={{border: 'none'}}
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
    );
}

export default App;

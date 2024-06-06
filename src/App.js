import {useRef} from 'react';
import './App.css';

function App() {
    const iframeElem = useRef();

    /* Temporary Data */
    const tempJSON = {
        "parameters": {
            "routeURL": "https://market-canvas-cbre-rv.vercel.app/markets/8491580179800618632/tenants/availabilities",
            "presetName": "markets_tenants_availabilties",
            "queries": {
                "boundsSQL": "boundsSQLTestDataGoesHere\r\n //If included will build bounds around regions",
                "propertiesSQL": "boundsSQLTestGoesHere\r\n //If included, will build building outlines",
                "pointsSQL": "boundsSQLTestGoesHere //if included, will build a points layer using this query"
            },
            "style_colors": "HEALTHCARE_5_SEQUENTIAL",
            "pagecontent": {
                "left": "thoughtspot div",
                "middle": "image gallery div",
                "right": "other stuff div"
            },
            "view_state": {
                "latitude": 38.900497,
                "longitude": -77.007507,
                "zoom": 12,
                "pitch": 37.5,
                "bearing": 185,
                "minZoom": 3.5,
                "maxZoom": 18
            }
        }
    }

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

    /* Sends Stringified JSON Object of Parameters to Unreal Engine */
    function showUnrealPreset(parameters) {
        let payload = {
            uecmd: 'ShowUnrealPreset',
            parameters: JSON.stringify(parameters)
        };
        uePacket(payload);
    }

    /* Indicates Stream Active */
    function streamActive() {
        console.log('Stream Active')
        /* Insert Koalition Function */
    }

    /* Listens for Stream Active */
    window.addEventListener("message", (message) => {
        if (message.data.type === 'stage5_playBtnPressed') {
            streamActive()
        }
    });

    return (
        <div className={'wrapper'}>
            <div className={'cmd-btn-container'}>
                <button
                    className='cmd-btn'
                    onClick={() => {
                        showUnrealPreset(tempJSON);
                    }}
                >
                    <span>Show Preset</span>
                </button>
            </div>
            <iframe
                style={{border: 'none'}}
                ref={iframeElem}
                title='CBRE MC Test'
                allow='camera;microphone'
                id='iframe_1'
                src='https://connector_imerza1.eaglepixelstreaming.com/v5/imerza/CBRE_MarketCanvas_PS/CBRE_MarketCanvas'
                width='100%'
                height='100%'
                allowFullScreen
            />
        </div>
    );
}

export default App;

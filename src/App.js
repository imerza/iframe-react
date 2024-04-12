import {useRef} from 'react';
import Polygon from './Polygon.json'
import './App.css';

function App() {
    const iframeElem = useRef();

    /* Temporary Data */
    const tempPrimaryAddress = '59 5th Street, WhereverVilla';
    const tempCeilingHeightFeet = 12;
    const tempCeilingHeightInches = 4;
    const tempLatitude = 38.9172;
    const tempLongitude = -77.0369;
    const tempStories = 4;
    const tempUnitCount = 16;
    const tempPercentLeased = 76;
    const tempGeom = {
        "type": "MultiPolygon",
        "coordinates": [[[[-77.048803612183605, 38.909632671158299], [-77.048803072202702, 38.909632374904099], [-77.048803072202702, 38.908040404363298], [-77.048820248232801, 38.902417506501997], [-77.049494510410796, 38.902379264766502], [-77.050070149165705, 38.901970682013904], [-77.050096314563703, 38.901922376663798], [-77.050110403624103, 38.900813366335299], [-77.050117064719899, 38.895383573205798], [-77.050101141678695, 38.8940041956076], [-77.050090042548007, 38.891985823286802], [-77.050560475102301, 38.892008224836999], [-77.052237378873699, 38.892277936632397], [-77.055427014019202, 38.892899446421801], [-77.055649819415393, 38.892934626221198], [-77.056529314400393, 38.894494263994602], [-77.056634853798599, 38.894951601386701], [-77.056681760197804, 38.895420665378701], [-77.056646580398393, 38.897390734145098], [-77.056634853798599, 38.898551667525297], [-77.0566436062024, 38.898560857549299], [-77.056490968635003, 38.898906936786297], [-77.057208890528997, 38.901021181167401], [-77.057235428234804, 38.901289875438998], [-77.057218842168695, 38.901598376269497], [-77.057069567573294, 38.902119178746702], [-77.056880486419203, 38.9026366640107], [-77.056734529037001, 38.902984971399903], [-77.0566880880518, 38.903220493539301], [-77.056555399522594, 38.9039900870088], [-77.056037914258596, 38.904822707529597], [-77.055649800310604, 38.905433074764098], [-77.055231831443507, 38.9061927165939], [-77.054604878142996, 38.907566042871302], [-77.054362721577107, 38.908007232231], [-77.054057537959906, 38.908355539620203], [-77.053467074004899, 38.908816632259303], [-77.053022567431995, 38.908992444560504], [-77.052571426432607, 38.909065423251597], [-77.052246339535998, 38.909038885545698], [-77.051735488698498, 38.909009030626599], [-77.051211369008101, 38.909038885545698], [-77.050733690302906, 38.909267773258598], [-77.050481582097305, 38.909480074905403], [-77.050415237832695, 38.9096459355669], [-77.050415237832695, 38.9096459355669], [-77.048803612183605, 38.909632671158299]]]]
    }
    const tempFloor = 4;
    const tempTotalFloorsAvail = 5;

    /* View List: market_metro_overview, market_washington_overview, property_overview_map, property_property_availabilities */
    const tempConceptView = 'market_metro_overview';
    const tempConceptView1 = 'market_metro_overview';
    const tempConceptView2 = 'market_washington_overview';
    const tempConceptView3 = 'property_overview_map';
    const tempConceptView4 = 'property_property_availabilities';

    /* Transmits Data Packet to iFrame */
    function sendToMainPage(obj) {
        let origin = '*';
        console.log(iframeElem);
        console.log(JSON.stringify(obj));
        if (null !== iframeElem.current) {
            iframeElem.current.contentWindow.postMessage(JSON.stringify(obj), origin);
        }
    }

    const splitJSON = (largeJSON) => {
        let JSONString = JSON.stringify(largeJSON)
        if (JSONString.length >= 4096) {
            const chunks = [];
            for (let i = 0; i < JSONString.length; i += 4096) {
                chunks.push(JSONString.slice(i, i + 4096));
            }
            return chunks;
        }
        else {
            return JSONString;
        }
    };

    /* Info Packet Framework, takes Input and Converts for Pass-through */
    function uePacket(payload) {
        let ueObj = {
            cmd: 'sendToUe4',
            value: payload
        };
        sendToMainPage(ueObj);
    }

    /* Shows Concept View */
    function showConceptView(view) {
        let payload = {
            uecmd: 'ShowConceptView',
            view: view
        };
        uePacket(payload);
    }

    /* Shows Market Geometry */
    function showMarket(geom) {
        if (JSON.stringify(geom).length >= 4096) {
            for (let i = 0; i < splitJSON(geom).length; i += 1) {
                uePacket({
                    uelongcmd: 'ShowMarket',
                    geomPacket: `${i}`,
                    geom: splitJSON(geom)[i]
                })
            }
        }
        else {
            let payload = {
                uecmd: 'ShowMarket',
                geom: geom
            };
            uePacket(payload);
        }
    }

    /* Shows Region Geometry */
    function showRegion(geom) {
        if (JSON.stringify(geom).length >= 4096) {
            for (let i = 0; i < splitJSON(geom).length; i += 1) {
                uePacket({
                    uelongcmd: 'ShowRegion',
                    geomPacket: `${i}`,
                    geom: splitJSON(geom)[i]
                })
            }
        }
        else {
            let payload = {
                uecmd: 'ShowRegion',
                geom: geom
            };
            uePacket(payload);
        }
    }

    /* Shows SubMarket Geometry */
    function showSubMarket(geom) {
        if (JSON.stringify(geom).length >= 4096) {
            for (let i = 0; i < splitJSON(geom).length; i += 1) {
                uePacket({
                    uelongcmd: 'ShowSubMarket',
                    geomPacket: `${i}`,
                    geom: splitJSON(geom)[i]
                })
            }
        }
        else {
            let payload = {
                uecmd: 'ShowSubMarket',
                geom: geom
            };
            uePacket(payload);
        }
    }

    /*
     Travel to the specified LATITUDE and LONGITUDE, and highlight the selected building based on the passed
     GEOM array. Other fields will be used to populate on-screen UI elements.
    */
    function moveToProperty(
        primaryAddress,
        ceilingHeightFeet,
        ceilingHeightInches,
        latitude,
        longitude,
        stories,
        unitCount,
        percentLeased,
        geom
    ) {
        if (JSON.stringify(geom).length >= 4096) {
            for (let i = 0; i < splitJSON(geom).length; i += 1) {
                uePacket({
                    uelongcmd: 'MoveToProperty',
                    primary_address: primaryAddress.toString(),
                    ceiling_height_feet: ceilingHeightFeet.toString(),
                    ceiling_height_inches: ceilingHeightInches.toString(),
                    latitude: latitude.toString(),
                    longitude: longitude.toString(),
                    stories: stories.toString(),
                    unit_count: unitCount.toString(),
                    percent_leased: percentLeased.toString(),
                    geomPacket: `${i}`,
                    geom: splitJSON(geom)[i]
                })
            }
        }
        else {
            let payload = {
                uecmd: 'MoveToProperty',
                primary_address: primaryAddress.toString(),
                ceiling_height_feet: ceilingHeightFeet.toString(),
                ceiling_height_inches: ceilingHeightInches.toString(),
                latitude: latitude.toString(),
                longitude: longitude.toString(),
                stories: stories.toString(),
                unit_count: unitCount.toString(),
                percent_leased: percentLeased.toString(),
                geom: JSON.stringify(geom)
            };
            uePacket(payload);
        }
    }

    /* Moves closer to the building without highlighting a specific floor. */
    function zoomOnProperty(
        primaryAddress,
        ceilingHeightFeet,
        ceilingHeightInches,
        latitude,
        longitude,
        stories,
        unitCount,
        percentLeased,
        geom
    ) {
        if (JSON.stringify(geom).length >= 4096) {
            for (let i = 0; i < splitJSON(geom).length; i += 1) {
                uePacket({
                    uelongcmd: 'ZoomOnProperty',
                    primary_address: primaryAddress.toString(),
                    ceiling_height_feet: ceilingHeightFeet.toString(),
                    ceiling_height_inches: ceilingHeightInches.toString(),
                    latitude: latitude.toString(),
                    longitude: longitude.toString(),
                    stories: stories.toString(),
                    unit_count: unitCount.toString(),
                    percent_leased: percentLeased.toString(),
                    geomPacket: `${i}`,
                    geom: splitJSON(geom)[i]
                })
            }
        }
        else {
            let payload = {
                uecmd: 'ZoomOnProperty',
                primary_address: primaryAddress.toString(),
                ceiling_height_feet: ceilingHeightFeet.toString(),
                ceiling_height_inches: ceilingHeightInches.toString(),
                latitude: latitude.toString(),
                longitude: longitude.toString(),
                stories: stories.toString(),
                unit_count: unitCount.toString(),
                percent_leased: percentLeased.toString(),
                geom: JSON.stringify(geom)
            };
            uePacket(payload);
        }
    }

    /* Highlights a specific floor of the building. This will also ZoomIn if not already, no need to call it separately */
    function highlightAvailability(floor, totalFloorsAvail) {
        let payload = {
            uecmd: 'HighlightAvailability',
            floor: floor.toString(),
            total_floors_avail: totalFloorsAvail.toString()
        };
        uePacket(payload);
    }

    return (
        <div className={'wrapper'}>
            <div className={'cmd-btn-container'}>
                <button
                    className='cmd-btn'
                    onClick={() => {
                        showMarket(Polygon);
                    }}
                >
                    <span>Show Market</span>
                </button>
                <button
                    className='cmd-btn'
                    onClick={() => {
                        showRegion(tempGeom);
                    }}
                >
                    <span>Show Region</span>
                </button>
                <button
                    className='cmd-btn'
                    onClick={() => {
                        showSubMarket(tempGeom);
                    }}
                >
                    <span>Show SubMarket</span>
                </button>
                <button
                    className='cmd-btn'
                    onClick={() => {
                        moveToProperty(
                            tempPrimaryAddress,
                            tempCeilingHeightFeet,
                            tempCeilingHeightInches,
                            tempLatitude,
                            tempLongitude,
                            tempStories,
                            tempUnitCount,
                            tempPercentLeased,
                            tempGeom
                        );
                    }}
                >
                    <span>Move to Property</span>
                </button>
                <button
                    className='cmd-btn'
                    onClick={() => {
                        zoomOnProperty(
                            tempPrimaryAddress,
                            tempCeilingHeightFeet,
                            tempCeilingHeightInches,
                            tempLatitude,
                            tempLongitude,
                            tempStories,
                            tempUnitCount,
                            tempPercentLeased,
                            tempGeom
                        );
                    }}
                >
                    <span>Zoom on Property</span>
                </button>
                <button
                    className='cmd-btn'
                    onClick={() => {
                        highlightAvailability(
                            tempFloor,
                            tempTotalFloorsAvail
                        );
                    }}
                >
                    <span>Highlight Availability</span>
                </button>
                <button
                    className='cmd-btn'
                    onClick={() => {
                        showConceptView(tempConceptView);
                    }}
                >
                    <span>Show Concept View Temp</span>
                </button>
                <button
                    className='cmd-btn'
                    onClick={() => {
                        showConceptView(tempConceptView1);
                    }}
                >
                    <span>Show View - Metro Overview</span>
                </button>
                <button
                    className='cmd-btn'
                    onClick={() => {
                        showConceptView(tempConceptView2);
                    }}
                >
                    <span>Show View - Washinton Overview</span>
                </button>
                <button
                    className='cmd-btn'
                    onClick={() => {
                        showConceptView(tempConceptView3);
                    }}
                >
                    <span>Show View - Property Overview Map</span>
                </button>
                <button
                    className='cmd-btn'
                    onClick={() => {
                        showConceptView(tempConceptView4);
                    }}
                >
                    <span>Show View - Property Availabilities</span>
                </button>
            </div>
            <iframe
                style={{border: 'none'}}
                ref={iframeElem}
                title='CBRE MC Test'
                allow='camera;microphone'
                id='iframe_1'
                src='https://connector.eagle3dstreaming.com/v5/imerza/CBRE_MarketCanvas_PS/CBRE_MarketCanvas'
                // src='https://connector.eagle3dstreaming.com/v5/demo/E3DSFeaturesTemplate/E3DS-Iframe-Demo'
                width='100%'
                height='100%'
                allowFullScreen
            />
        </div>
    );
}

export default App;

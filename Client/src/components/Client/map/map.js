import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Source } from '@goongmaps/goong-map-react';

const GOONG_MAPTILES_KEY = 'jjnLR19QiJQ5VRmRXGc2215kUXYf2tpUi3MIXPNz';

const Map = () => {
    const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 14.716597953261696,
    longitude: 108.29480072949772,
    zoom: 5
    });
    const mapRef = useRef(null);

    const onClick = event => {
        const feature = event?.features[0];
        const clusterId = feature?.properties?.cluster_id;

        const mapBoxSource = mapRef.current.getMap().getSource('earthquakes');
        // console.log(mapRef.current, 6767);

        mapBoxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) {
                return;
            }
            setViewport({
                ...viewport,
                longitude: feature?.geometry?.coordinates[0],
                latitude: feature?.geometry?.coordinates[1],
                zoom,
                transitionDuration: 500
            });
        });
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function (position) {
                // console.log(position, 'pos');
                setViewport({
                    ...viewport,
                    latitude: position.coords.latitude,
                    Longitude: position.coords.longitude
                })

            });
        }
    }, [])

    return (
        <>
        <ReactMapGL {...viewport}
            width="100%"
            height="100%"
            mapStyle="https://tiles.goong.io/assets/goong_light_v2.json"
            goongApiAccessToken={GOONG_MAPTILES_KEY}
            onViewportChange={setViewport}
            onClick={onClick}
            ref={mapRef}
        >
            <Source
                type="geojson"
                data="https://docs.goong.io/assets/earthquakes.geojson"
                cluster={true}
                clusterMaxZoom={14}
                clusterRadius={50}
            >
            </Source>
            </ReactMapGL>
        </>
    )
}

export default Map;
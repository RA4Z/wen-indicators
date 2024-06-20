import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import GeoJSON from 'data/GeoJSON.json';
import styles from './MapaMundi.module.scss';
import { Marker } from "react-simple-maps"
import { wegs } from "./empresas";

interface Props {
    selectCountry: any
}

export default function MapChart(props: Props) {
    return (
        <div>
            <ComposableMap className={styles.map}>
                <Geographies geography={GeoJSON}>
                    {({ geographies }: any) =>
                        geographies.map((geo: any) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                onClick={() => console.log(geo.properties.name)}
                                style={{
                                    default: {
                                        outline: 'none',
                                    },
                                    hover: {
                                        outline: 'none',
                                    },
                                    pressed: {
                                        outline: 'none',
                                    },
                                }}
                            />
                        ))
                    }
                </Geographies>
                {wegs.map((weg, index) => (
                    <Marker coordinates={[weg.longitude, weg.latitude]} key={index}>
                        <image
                            className={styles.countries}
                            onClick={() => props.selectCountry(weg.name)}
                            href={weg.image}
                            x={-weg.tamanho}
                            y={-weg.tamanho}
                            width={2 * weg.tamanho}
                            height={2 * weg.tamanho}
                        />
                    </Marker>
                ))}
            </ComposableMap>
        </div>
    );
}
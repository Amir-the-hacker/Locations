import { Button, Container, Grid } from '@mui/material'
import type { useLocationsControllerFindAll } from '../api/endpoints/locations/locations'
import { useEffect, useRef } from 'react'
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import TileLayer from 'ol/layer/Tile.js'
import OSM from 'ol/source/OSM.js'
import type { LocationDto } from '../api/models'

interface LocationMapProps {
  locations?: LocationDto[]
}
export const LocationMap = ({ locations }: LocationMapProps) => {
  const mapRef = useRef<Map | null>(null)
  useEffect(() => {
    // create the map
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    })

    mapRef.current = map

    return () => {
      map.setTarget(undefined)
    }
  }, [])

  return (
    <Container>
      <div id="map" style={{ width: '100%', height: '400px' }} />
      <Button id="zoom-out">Zoom out</Button>{' '}
      <Button id="zoom-in">Zoom in</Button>
    </Container>
  )
}

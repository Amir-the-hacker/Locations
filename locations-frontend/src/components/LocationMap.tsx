import { Container } from '@mui/material'
import { useEffect, useRef } from 'react'
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import TileLayer from 'ol/layer/Tile.js'
import OSM from 'ol/source/OSM.js'
import type { LocationDto } from '../api/models'
import 'ol/ol.css'
import Feature from 'ol/Feature.js'
import Point from 'ol/geom/Point.js'
import VectorLayer from 'ol/layer/Vector.js'
import { fromLonLat } from 'ol/proj.js'
import VectorSource from 'ol/source/Vector.js'
import Style from 'ol/style/Style.js'
import Circle from 'ol/style/Circle.js'
import Fill from 'ol/style/Fill'

interface LocationMapProps {
  locations?: LocationDto[]
}

export const LocationMap = ({ locations }: LocationMapProps) => {
  const mapRef = useRef<Map | null>(null)
  //later to add points on map
  const vectorSourceRef = useRef<VectorSource | null>(null)

  useEffect(() => {
    const vectorSource = new VectorSource()
    vectorSourceRef.current = vectorSource

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    })

    const rasterLayer = new TileLayer({
      source: new OSM(),
    })

    const map = new Map({
      layers: [rasterLayer, vectorLayer],
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
  useEffect(() => {
    if (!vectorSourceRef.current) return

    // Clear any existing markers
    vectorSourceRef.current.clear()

    if (!locations || locations.length === 0) return

    const basicStyle = new Style({
      image: new Circle({
        fill: new Fill({ color: 'rgba(255, 0, 0, 0.7)' }),
        radius: 8,
      }),
    })

    const points = locations.map((location) => {
      const { lon, lat } = location.coordinates

      const point = new Feature({
        geometry: new Point(fromLonLat([lon, lat])),
      })

      point.setStyle(basicStyle)
      return point
    })

    vectorSourceRef.current.addFeatures(points)
  }, [locations])
  return (
    <Container>
      <div id="map" style={{ width: '100%', height: '400px' }} />
    </Container>
  )
}

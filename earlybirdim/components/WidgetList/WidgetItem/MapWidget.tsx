import mapbox, { LngLatLike } from 'mapbox-gl'
import { useEffect, useRef } from 'react'
import { useFrame } from 'react-frame-component'

import { MapData, WidgetConfig, WidgetSize } from '../WidgetProps'
import { map } from '../constants'
import Widget from './Widget'

mapbox.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string

export default class MapWidget<T extends MapData> extends Widget<T> {
  override allowSizes: WidgetSize[] = ['1x1', '2x1', '2x2']

  constructor(config: WidgetConfig) {
    super()
    this.setConfig({
      ...config,
      extra: map
    })
  }

  override Render1x1(config: WidgetConfig<MapData>) {
    return <MapWidget.Render {...config} />
  }

  // 2x1
  override Render2x1(config: WidgetConfig<MapData>) {
    return <MapWidget.Render {...config} />
  }

  // 2x1
  override Render2x2(config: WidgetConfig<MapData>) {
    return <MapWidget.Render {...config} />
  }

  private static Render(config: WidgetConfig<MapData>) {
    const { window: frameWindow } = useFrame()

    const containerRef = useRef<HTMLDivElement>(null)
    const elemRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<mapbox.Map>(null)
    const markerRef = useRef<mapbox.Marker>(null)

    function initMap() {
      if (frameWindow) {
        ;(mapbox as any).setWindow(frameWindow)
      }

      const center: LngLatLike = [config.data.longitude, config.data.latitude]

      // Add map
      if (!mapRef.current) {
        // @ts-ignore
        mapRef.current = new mapbox.Map({
          container: containerRef.current!,
          style: process.env.NEXT_PUBLIC_MAPBOX_STYLE as string,
          interactive: false,
          center,
          zoom: Math.max(config.data.zoom - 2, 0)
        })
      }

      // Add marker
      if (!markerRef.current) {
        // @ts-ignore
        markerRef.current = new mapbox.Marker(elemRef.current!)

        // Move marker to center
        markerRef.current.setLngLat(center).addTo(mapRef.current)
      }
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setTimeout(initMap, 100)
    }, [])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const center: LngLatLike = [config.data.longitude, config.data.latitude]

      markerRef.current?.setLngLat(center)
      mapRef.current?.setCenter(center)
    }, [config.data.latitude, config.data.longitude])

    return (
      <div
        id={`widget-${config.id}`}
        className="relative h-full w-full overflow-hidden rounded-3xl"
      >
        <div ref={containerRef} className="h-full w-full"></div>
        <div ref={elemRef} className="absolute left-0 top-0 h-7 w-7">
          <div className="relative h-full w-full">
            <div
              className="absolute -left-3.5 -top-3.5 h-14 w-14 animate-ping rounded-full bg-blue-700 opacity-40"
              style={{
                animationDuration: '2s'
              }}
            />
            <div className="absolute inset-0 rounded-full border-[4px] border-white bg-blue-700 shadow-[0_1px_2px_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]" />
          </div>
        </div>

        <div className="absolute inset-0" />

        {config.data.overrides?.title && (
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="inline-block rounded-xl bg-white/70 px-2.5 py-1.5 text-sm shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06)] backdrop-blur-[20px]">
              {config.data.overrides.title}
            </div>
          </div>
        )}
      </div>
    )
  }
}

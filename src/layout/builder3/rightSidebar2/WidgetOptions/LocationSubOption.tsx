import { Input, Loader } from '@heyforms/ui'
import { isValid } from '@nily/utils'
import { FC, useState, useTransition } from 'react'

import { useOptions } from '~/layout/builder3/context'
import { MapboxPlace, MapboxService } from '~/service'

interface PlaceSearchProps {
  value?: string | MapboxPlace
  isValueAsPlace?: boolean
  onChange?: (value: MapboxPlace) => void
}

interface LocationSubOptionProps {
  title: string
  path: string
}

export const PlaceSearch: FC<PlaceSearchProps> = ({ value, isValueAsPlace = false, onChange }) => {
  const [isPending, startTransition] = useTransition()
  const [places, setPlaces] = useState<MapboxPlace[]>([])
  const [isLoading, setLoading] = useState(false)

  async function handleInputChange(query: string) {
    if (isPending) {
      return
    }

    let result: MapboxPlace[] = []

    if (isValid(query)) {
      setLoading(true)

      try {
        result = await MapboxService.search(query)
      } catch {
        result = []
      }

      setLoading(false)
    }

    startTransition(() => {
      setPlaces(result)
    })
  }

  function handleClick(place: MapboxPlace) {
    setPlaces([])
    onChange?.(place)
  }

  return (
    <div className="relative">
      <Input
        trailing={(isPending || isLoading) && <Loader className="w-4 h-4 text-slate-500" />}
        value={isValueAsPlace ? (value as MapboxPlace)?.placeName : (value as string)}
        placeholder="Search location"
        onChange={handleInputChange}
      />

      {isValid(places) && (
        <ul className="mt-4 space-y-1.5">
          {places.map((place, index) => (
            <li
              key={index}
              className="px-3 py-2 text-sm bg-white text-left text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-50 rounded-md cursor-pointer"
              onClick={() => handleClick(place)}
            >
              <div className="break-words line-clamp-2">{place.placeName}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export const LocationSubOption: FC<LocationSubOptionProps> = ({ title, path }) => {
  const { value, update } = useOptions<AnyMap>(path)

  function handleChange(place: MapboxPlace) {
    update({
      ...value,
      url: `https://www.google.com/maps/@${place.latitude},${place.longitude},13z`,
      data: {
        location: place.placeName
      }
    })
  }

  return (
    <div className="builder-option">
      <div className="builder-option__title">{title}</div>
      <div className="builder-option__content">
        <PlaceSearch value={value?.data?.location} onChange={handleChange} />
      </div>
    </div>
  )
}

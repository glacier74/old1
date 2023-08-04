import { Input } from '@heyforms/ui'
import { IconSearch } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { useState } from 'react'

import { AsyncRequest } from '~/components'

interface UnsplashProps {
  onChange: (src: string) => void
}

interface ImageItemProps {
  image: UnsplashImage
  onChange: (src: string) => void
}

const ImageItem: FC<ImageItemProps> = ({ image, onChange }) => {
  function handleClick() {
    onChange(image.url)
    // UnsplashService.trackDownload(image.downloadUrl)
  }

  return (
    <li className="w-1/2 sm:w-1/3 lg:w-1/4 pl-2 pr-2 pb-4" onClick={handleClick}>
      <div className="group relative rounded-md block h-20 bg-slate-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white-100 focus-within:ring-emerald-500 overflow-hidden cursor-pointer">
        <img
          className="w-full h-full object-cover pointer-events-none group-hover:opacity-75"
          src={image.thumbUrl}
          alt=""
        />
        <a
          className="absolute inset-x-0 bottom-0 px-2 py-1.5 text-xs text-white underline opacity-0 bg-gradient-to-t from-slate-800 group-hover:opacity-100 transition-opacity duration-100 ease-in-out"
          href={image.authorUrl}
          target="_blank"
          rel="noreferrer"
        >
          {image.author}
        </a>
      </div>
    </li>
  )
}

const Skeleton: FC = () => {
  return (
    <ul className="flex flex-wrap -ml-2 -mr-2">
      {Array.from({ length: 12 }).map((_, index) => (
        <li key={index} className="w-1/2 sm:w-1/3 lg:w-1/4 pl-2 pr-2 pb-4">
          <div className="skeleton block h-20 rounded-md" />
        </li>
      ))}
    </ul>
  )
}

export const Unsplash: FC<UnsplashProps> = ({ onChange }) => {
  const [keyword, setKeyword] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<any[]>([])
  const { t } = useTranslation()

  async function fetchImages() {
    if (loading) {
      return
    }

    setLoading(true)

    try {
      // const result = await UnsplashService.search(keyword as string)
      // setImages(result)
    } catch (_) {}

    setLoading(false)
    return images.length > 0
  }

  function handleKeyDown(event: any) {
    if (event.key === 'Enter') {
      setKeyword(event.target.value)
    }
  }

  return (
    <div>
      <Input placeholder={t('common.search')} leading={<IconSearch />} onKeyDown={handleKeyDown} />
      <AsyncRequest className="mt-4" request={fetchImages} deps={[keyword]} skeleton={<Skeleton />}>
        <ul role="list" className="flex flex-wrap -ml-2 -mr-2">
          {images.map(row => (
            <ImageItem key={row.id} image={row} onChange={onChange} />
          ))}
        </ul>
      </AsyncRequest>
    </div>
  )
}

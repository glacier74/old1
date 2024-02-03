import { FC, useMemo } from 'react'

import { UnsplashService } from '~/service/unsplash'

interface ImageItemProps {
  image: UnsplashImage | GradientImage
  onClick?: (src: string, color?: string) => void
}

export const ImageItem: FC<ImageItemProps> = ({ image, onClick }) => {
  function handleClick() {
    if (image.type === 'unsplash') {
      UnsplashService.trackDownload((image as UnsplashImage).downloadUrl)
    }

    onClick?.(image.src, image.color)
  }

  const children = useMemo(() => {
    if (image.type === 'unsplash') {
      const _image = image as UnsplashImage

      return (
        <>
          <img
            src={_image.thumbUrl}
            className="h-full w-full transform-gpu bg-black/5 object-cover transition-transform hover:scale-125"
            style={{
              backgroundColor: _image.color
            }}
          />
          <a
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-800 px-2 py-1.5 text-xs text-white underline opacity-0 transition-opacity duration-100 ease-in-out hover:text-white hover:underline group-hover:opacity-100"
            href={`${_image.authorUrl}?utm_source=earlybird&utm_medium=referral`}
            target="_blank"
          >
            {_image.author}
          </a>
        </>
      )
    }

    return (
      <div
        className="h-full w-full bg-cover bg-center transition-opacity hover:opacity-50"
        style={{
          background: image.src
        }}
      />
    )
  }, [image])

  return (
    <div
      className="h-[75px] w-[120px] cursor-pointer overflow-hidden rounded-md"
      onClick={handleClick}
    >
      <div className="group relative h-full w-full">{children}</div>
    </div>
  )
}

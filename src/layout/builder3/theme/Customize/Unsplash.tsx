import { Button, Loader } from '@heyforms/ui'
import { isEmpty } from '@heyooo-inc/utils'
import { FC, useEffect, useState } from 'react'

import { UnsplashService } from '~/service/unsplash'
import { useRequest } from '~/utils'

import { ImageItem } from './ImageItem'

export const Unsplash: FC<{
  onColorChange?: (color: string) => void
  onChange?: (src: string, color?: string) => void
}> = ({ onColorChange, onChange }) => {
  const [query, setQuery] = useState<string>()
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [images, setImages] = useState<UnsplashImage[]>([])

  const { error, loading, request } = useRequest(
    async () => {
      console.log(page, totalPages)
      if (page > totalPages) {
        return
      }

      const res = await UnsplashService.search(query?.trim(), page)

      setTotalPages(res.totalPages)
      setImages(images => (page === 1 ? res.results : [...images, ...res.results]))
    },
    [query, page],
    {
      fetchWhenDepsChange: true
    }
  )

  function handleClick(src: string, color?: string) {
    onColorChange?.(color!)
    onChange?.(src)
  }

  function handleLoadMore() {
    setPage(p => p + 1)
  }

  useEffect(() => {
    request()
  }, [])

  if (loading && isEmpty(images)) {
    return (
      <div className="h-full flex items-center justify-center p-5">
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center p-5 text-red-500">
        {error.message}
      </div>
    )
  }

  return (
    <div className="p-5">
      <div className="grid grid-cols-3 gap-5">
        {images.map((row, index) => (
          <ImageItem key={index} image={row} onClick={handleClick} />
        ))}
      </div>

      {totalPages > page && (
        <div className="flex justify-center mt-5">
          <Button
            className="!border-none !bg-slate-50 hover:!bg-slate-100 px-10"
            loading={loading}
            onClick={handleLoadMore}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  )
}

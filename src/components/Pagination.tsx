import Link from 'next/link'
import type { FC } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { urlBuilder } from '~/utils'

interface PaginationProps {
  uri: string
  total: number
  page: number
  limit: number
}

export const Pagination: FC<PaginationProps> = ({ uri, total, page = 1, limit = 20 }) => {
  const maxPage = useMemo(() => Math.ceil(total / limit), [total, limit])
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)

  const previousURL = useMemo(() => (page > 1 ? urlBuilder(uri, { page: page - 1 }) : null), [page])
  const nextURL = useMemo(
    () => (page < maxPage ? urlBuilder(uri, { page: page + 1 }) : null),
    [page]
  )

  useEffect(() => {
    setStart((page - 1) * limit + 1)
    setEnd(Math.min(total, page * limit))
  }, [page, limit, total])

  if (maxPage <= 1) {
    return null
  }

  return (
    <nav
      className="py-4 flex items-center justify-between border-t border-gray-100"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-slate-500">
          Showing <span className="font-medium">{start}</span> to{' '}
          <span className="font-medium">{end}</span> of <span className="font-medium">{total}</span>{' '}
          results
        </p>
      </div>

      <div className="flex-1 flex justify-between sm:justify-end">
        {previousURL ? (
          <Link className="link-button" href={previousURL}>
            Previous
          </Link>
        ) : (
          <div className="link-button link-button-disabled">Previous</div>
        )}

        {nextURL ? (
          <Link className="link-button ml-3" href={nextURL}>
            Next
          </Link>
        ) : (
          <div className="link-button link-button-disabled ml-3">Next</div>
        )}
      </div>
    </nav>
  )
}

interface Pagination2Props extends Omit<PaginationProps, 'uri' | 'limit'> {
  limit?: number
  onChange: (page: number) => void
}

export const Pagination2: FC<Pagination2Props> = ({ total, page = 1, limit = 20, onChange }) => {
  const maxPage = useMemo(() => Math.ceil(total / limit), [total, limit])
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)

  const previousPage = useMemo(() => (page > 1 ? page - 1 : null), [page])
  const nextPage = useMemo(() => (page < maxPage ? page + 1 : null), [page])

  useEffect(() => {
    setStart((page - 1) * limit + 1)
    setEnd(Math.min(total, page * limit))
  }, [page, limit, total])

  if (maxPage <= 1) {
    return null
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handlePrevious = useCallback(() => {
    onChange(previousPage!)
  }, [previousPage])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleNext = useCallback(() => {
    onChange(nextPage!)
  }, [nextPage])

  return (
    <nav
      className="py-4 flex items-center justify-between border-t border-gray-100"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-slate-500">
          Showing <span className="font-medium">{start}</span> to{' '}
          <span className="font-medium">{end}</span> of <span className="font-medium">{total}</span>{' '}
          results
        </p>
      </div>

      <div className="flex-1 flex justify-between sm:justify-end">
        {previousPage ? (
          <div className="link-button" onClick={handlePrevious}>
            Previous
          </div>
        ) : (
          <div className="link-button link-button-disabled">Previous</div>
        )}

        {nextPage ? (
          <div className="link-button ml-3" onClick={handleNext}>
            Next
          </div>
        ) : (
          <div className="link-button link-button-disabled ml-3">Next</div>
        )}
      </div>
    </nav>
  )
}

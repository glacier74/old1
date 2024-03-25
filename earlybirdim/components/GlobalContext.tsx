import { deepClone } from '@nily/utils'
import {
  FC,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

interface SongState {
  currentTime: number
  duration: number
  status: 'playing' | 'paused' | 'ended'
}

interface IState {
  productId: number
  domain: string
  isPreview?: boolean
  widgetId?: string
  songId?: string
  songs: Record<string, SongState>
  toggle: (widgetId: string, songId: string, url: string) => void
}

interface GlobalProviderProps extends Pick<ComponentProps, 'children'> {
  initialState: Partial<IState>
}

export const GlobalContext = createContext<IState>({} as IState)

export const GlobalContextProvider: FC<GlobalProviderProps> = ({ initialState, children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [widgetId, setWidgetId] = useState<string>()
  const [songId, setSongId] = useState<string>()
  const [songs, setSongs] = useState<Record<string, SongState>>({})

  const toggle = useCallback(
    (newWidgetId: string, newSongId: string, url: string) => {
      const _songs = deepClone(songs)
      const row = _songs[songId!]

      if (row?.status === 'playing') {
        row.status = 'paused'
        audioRef.current!.pause()

        if (songId! == newSongId) {
          return setSongs(_songs)
        }
      }

      audioRef.current!.src = url

      if (!_songs[newSongId]) {
        _songs[newSongId] = {
          currentTime: 0,
          duration: 100_000,
          status: 'playing'
        }
      } else {
        _songs[newSongId].status = 'playing'

        if (_songs[newSongId].status !== 'ended') {
          audioRef.current!.currentTime = _songs[newSongId].currentTime
        }
      }

      audioRef.current!.play()

      setWidgetId(newWidgetId)
      setSongId(newSongId)
      setSongs(_songs)
    },
    [songId, songs]
  )

  const handleStatusChange = useCallback(
    (status: SongState['status']) => {
      const _songs = deepClone(songs)
      const row = _songs[songId!]

      if (row) {
        row.status = status

        if (status === 'ended') {
          row.currentTime = 0
        }

        setSongs(_songs)
      }
    },
    [songId, songs]
  )

  const handleDurationChange = useCallback(() => {
    const _songs = deepClone(songs)
    const row = _songs[songId!]

    if (row) {
      row.duration = audioRef.current!.duration
      setSongs(_songs)
    }
  }, [songId, songs])

  const handleTimeUpdate = useCallback(() => {
    const _songs = deepClone(songs)
    const row = _songs[songId!]

    if (row) {
      row.currentTime = audioRef.current!.currentTime
      setSongs(_songs)
    }
  }, [songId, songs])

  const value = useMemo(() => {
    return {
      ...initialState,
      widgetId,
      songId,
      songs,
      toggle
    } as IState
  }, [initialState, songId, songs, toggle, widgetId])

  useEffect(() => {
    audioRef.current = new Audio()

    return () => {
      audioRef.current!.pause()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onplay = () => {
        handleStatusChange('playing')
      }
      audioRef.current.onpause = () => {
        handleStatusChange('paused')
      }
      audioRef.current.onended = () => {
        handleStatusChange('ended')
      }
      audioRef.current.ondurationchange = handleDurationChange
      audioRef.current.ontimeupdate = handleTimeUpdate
    }
  }, [songId, songs])

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

export function useGlobalContext(): IState {
  return useContext(GlobalContext)
}

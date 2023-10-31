import { parseURL } from '@earlybirdim/components/utils'
import { Button, Dropdown, Input, Select, Spin, Tooltip } from '@heyforms/ui'
import { exclude, isEmpty, isValid } from '@nily/utils'
import {
  IconGripVertical,
  IconLink,
  IconLocation,
  IconPhoto,
  IconTrash,
  IconX
} from '@tabler/icons'
import clsx from 'clsx'
import { nanoid } from 'nanoid'
import Image from 'next/image'
import { FC, useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { ReactSortable } from 'react-sortablejs'
import isURL from 'validator/lib/isURL'

import { AutoSizeTextarea, IconGroupTitle, MediaPicker } from '~/components'
import { useBuilderContext, useOptions } from '~/layout/builder3/context'
import { MapboxPlace, MapboxService } from '~/service'

import { CREATE_WIDGET_LABELS, WIDGET_SIZE_OPTIONS, WIDGET_URL_PROVIDERS } from '../constants'
import { OptionProps } from './OptionGroup'

interface WidgetItemOptionProps {
  parentName?: string
  index: number
  value: AnyMap<any>
  isSelected?: boolean
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}

interface TextOptionProps {
  title: string
  path: string
  validate?: (value?: string) => void
}

interface SelectOptionProps {
  title: string
  path: string
  options: any[]
}

interface CreateWidgetProps {
  widgetType: string
  onCreate: (value: AnyMap<any>) => void
  onCancel: () => void
}

const TextOption: FC<TextOptionProps> = ({ title, path, validate }) => {
  const { value, update } = useOptions<string>(path)
  const [error, setError] = useState<Error>()

  function handleChange(newValue: string) {
    setError(undefined)

    try {
      validate?.(newValue)
      update(newValue)
    } catch (err: any) {
      setError(err)
    }
  }

  return (
    <div className="builder-option">
      <div className="builder-option__title">{title}</div>
      <div className="builder-option__content">
        <AutoSizeTextarea value={value} onChange={handleChange} />
        {error && <div className="text-red-500 mt-2 text-sm">{error.message}</div>}
      </div>
    </div>
  )
}

const SelectOption: FC<SelectOptionProps> = ({ title, path, options }) => {
  const { value, update } = useOptions<string>(path)

  return (
    <div className="builder-option">
      <div className="builder-option__title">{title}</div>
      <div className="builder-option__content">
        <Select options={options} value={value} onChange={update} />
      </div>
    </div>
  )
}

const GroupTitleOption: FC<Pick<WidgetItemOptionProps, 'parentName' | 'index'>> = ({
  parentName,
  index
}) => {
  return <TextOption title="Title" path={[parentName, index, 'overrides.title'].join('.')} />
}

const MapOption: FC<Pick<WidgetItemOptionProps, 'parentName' | 'index'>> = ({
  parentName,
  index
}) => {
  const { value, update } = useOptions<AnyMap<string>>(
    [parentName, index].filter(Boolean).join('.')
  )

  function handleUpdate(place: MapboxPlace) {
    update({
      ...value,
      url: `https://www.google.com/maps/@${place.latitude},${place.longitude},13z`,
      overrides: {
        ...value?.overrides,
        location: place.placeName
      }
    })
  }

  return (
    <>
      <div className="builder-option">
        <div className="builder-option__title">Location</div>
        <div className="builder-option__content">
          <PlaceSearch value={value?.overrides?.location} onChange={handleUpdate} />
        </div>
      </div>

      <TextOption title="Caption" path={[parentName, index, 'overrides.title'].join('.')} />
    </>
  )
}

const ImageOption: FC<Pick<WidgetItemOptionProps, 'parentName' | 'index'>> = ({
  parentName,
  index
}) => {
  const { value, update } = useOptions<string>([parentName, index, 'overrides.imageUrl'].join('.'))
  const [visible, setVisible] = useState(false)

  function handleChange(_: string, src: string) {
    update(src)
    setVisible(false)
  }

  function handleClear() {
    update(undefined)
  }

  return (
    <div className="builder-option">
      <div className="builder-option__title">Image</div>
      <div className="builder-option__content">
        <div className="flex items-center gap-4">
          {value && (
            <Image
              className="w-[48px] h-[48px] object-contain"
              src={value}
              alt=""
              width={96}
              height={96}
              quality={100}
            />
          )}

          <div className="flex items-center gap-2">
            <Dropdown
              visible={visible}
              placement="left"
              overlay={<MediaPicker allowed={['image']} onChange={handleChange} />}
              offset={[0, 30]}
              onDropdownVisibleChange={setVisible}
            >
              <Button className="!py-1 !px-1.5">Change</Button>
            </Dropdown>

            {value && (
              <Button.Link className="!py-1 !px-2 !text-slate-600" onClick={handleClear}>
                Clear
              </Button.Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const WebsiteOption: FC<Pick<WidgetItemOptionProps, 'parentName' | 'index'>> = ({
  parentName,
  index
}) => {
  const { value: sizeValue } = useOptions<string>([parentName, index, 'size'].join('.'))

  function validate(value?: string) {
    if (isEmpty(value)) {
      throw new Error('The URL is not allowed to be empty')
    }

    if (!isURL(value!)) {
      throw new Error('The URL is not valid')
    }
  }

  return (
    <>
      <TextOption title="URL" path={[parentName, index, 'url'].join('.')} validate={validate} />
      <SelectOption
        title="Size"
        options={WIDGET_SIZE_OPTIONS}
        path={[parentName, index, 'size'].join('.')}
      />
      <TextOption title="Title" path={[parentName, index, 'overrides.title'].join('.')} />
      {(sizeValue === '2x1' || sizeValue === '2x2') && (
        <ImageOption parentName={parentName} index={index} />
      )}
    </>
  )
}

const WidgetItemOption: FC<WidgetItemOptionProps> = ({
  parentName,
  index,
  isSelected,
  value,
  onSelect,
  onDelete
}) => {
  function handleSelect() {
    onSelect(value.id)
  }

  function handleDelete() {
    onDelete(value.id)
  }

  const customURL = useMemo(() => parseURL(value?.url, value?.type), [value?.type, value?.url])

  const children = useMemo(() => {
    switch (customURL.provider) {
      case 'group_title':
        return <GroupTitleOption parentName={parentName} index={index} />

      case 'google_map':
        return <MapOption parentName={parentName} index={index} />

      case 'image':
      case 'video':
        return <ImageOption parentName={parentName} index={index} />

      default:
        return <WebsiteOption parentName={parentName} index={index} />
    }
  }, [customURL.provider, index, parentName])

  return (
    <div
      className={clsx('builder-option__list-item', {
        'builder-option__list-item-selected': isSelected
      })}
    >
      <div className="builder-option__list-item-title">
        <div className="builder-option__list-item-text" onClick={handleSelect}>
          {WIDGET_URL_PROVIDERS[customURL.provider]}
          {value?.overrides?.title && (
            <span className="ml-1 text-slate-500">({value.overrides.title})</span>
          )}
        </div>
        <div className="h-[40px] pl-2 pr-4 flex items-center gap-1">
          <button className="builder-option__list-item-button builder-option__sort-handle cursor-grab">
            <IconGripVertical />
          </button>
          <button className="builder-option__list-item-button" onClick={handleDelete}>
            <IconTrash />
          </button>
        </div>
      </div>
      <div className="builder-option__list-item-content">{children}</div>
    </div>
  )
}

interface PlaceSearchProps {
  value?: string
  onChange: (value: MapboxPlace) => void
}

const PlaceSearch: FC<PlaceSearchProps> = ({ value, onChange }) => {
  const [isPending, startTransition] = useTransition()
  const [places, setPlaces] = useState<MapboxPlace[]>([])

  async function handleInputChange(query: string) {
    if (isPending) {
      return
    }

    let result: MapboxPlace[] = []

    if (isValid(query)) {
      try {
        result = await MapboxService.search(query)
      } catch {
        result = []
      }
    }

    startTransition(() => {
      setPlaces(result)
    })
  }

  function handleClick(place: MapboxPlace) {
    setPlaces([])
    onChange(place)
  }

  return (
    <div className="relative">
      <Input
        leading={<IconLocation className="w-5 h-5" />}
        trailing={isPending && <Spin className="text-slate-500" />}
        value={value}
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

const CreateWidget: FC<CreateWidgetProps> = ({ widgetType, onCreate, onCancel }) => {
  const elemRef = useRef<HTMLDivElement>(null)

  function handleEnter(url: string) {
    onCancel()
    onCreate({
      id: nanoid(6),
      size: '1x1',
      url
    })
  }

  function handleCreateMap(place: MapboxPlace) {
    onCancel()
    onCreate({
      id: nanoid(6),
      size: '1x1',
      url: `https://www.google.com/maps/@${place.latitude},${place.longitude},13z`,
      overrides: {
        location: place.placeName
      }
    })
  }

  const children = useMemo(() => {
    switch (widgetType) {
      case 'website':
        return <Input type="url" placeholder="Enter or paste link here" onEnter={handleEnter} />

      case 'google_map':
        return <PlaceSearch onChange={handleCreateMap} />
    }
  }, [widgetType])

  useEffect(() => {
    elemRef.current?.scrollIntoView()
  }, [])

  return (
    <div ref={elemRef} className="p-4 text-sm gap-2 w-full rounded-lg bg-slate-200/50">
      <div className="builder-option">
        <div className="builder-option__title flex items-center justify-between">
          <span>{CREATE_WIDGET_LABELS[widgetType]}</span>
          <Button
            className="!border-none !bg-transparent !p-1 hover:!bg-white text-xs text-slate-600 hover:text-slate-900"
            leading={<IconX />}
            onClick={onCancel}
          />
        </div>
        <div className="builder-option__content">{children}</div>
      </div>
    </div>
  )
}

export const WidgetListOption: FC<OptionProps> = ({ parentName, schema }) => {
  const { dispatch } = useBuilderContext()

  const name = [parentName, schema.name].filter(Boolean).join('.')
  const { value: listValue, update } = useOptions<AnyMap<any>[]>(name, [])

  const [selected, setSelected] = useState<string | undefined>()
  const [widgetType, setWidgetType] = useState<string>()
  const [visible, setVisible] = useState(false)

  const handleSelect = useCallback(
    (id: string) => {
      setSelected(id === selected ? undefined : id)
    },
    [selected]
  )

  const handleDelete = useCallback(
    (id: string) => {
      update(listValue.filter(v => v.id !== id))
    },
    [update, listValue]
  )

  const handleSetList = useCallback(
    (newListValue: any[]) => {
      update(newListValue.map(v => exclude(v, ['chosen', 'selected'])))
    },
    [update]
  )

  function handleCreate(newValue: any) {
    update([...listValue, newValue])
    setSelected(newValue.id)
  }

  function handleCreateImage(url: string) {
    setVisible(false)
    handleCreate({
      id: nanoid(6),
      type: 'image',
      url
    })
  }

  function handleCreateGroupTitle() {
    handleCreate({
      id: nanoid(6),
      type: 'group_title'
    })
  }

  useEffect(() => {
    dispatch({
      type: 'updateState',
      payload: {
        selectedListId: selected
      }
    })
  }, [selected])

  return (
    <div className="builder-option builder-option__list">
      {parentName && <div className="builder-option__title">{schema.title}</div>}
      <div className="builder-option__content">
        <ReactSortable<any>
          className="space-y-3"
          handle=".builder-option__sort-handle"
          list={listValue}
          setList={handleSetList}
          delay={10}
          animation={150}
        >
          {listValue.map((value, index) => (
            <WidgetItemOption
              key={value.value}
              parentName={name}
              index={index}
              value={value}
              isSelected={selected === value.id}
              onSelect={handleSelect}
              onDelete={handleDelete}
            />
          ))}
        </ReactSortable>

        {widgetType ? (
          <CreateWidget
            widgetType={widgetType}
            onCreate={handleCreate}
            onCancel={() => setWidgetType(undefined)}
          />
        ) : (
          <div className="flex items-center justify-center text-sm gap-2 w-full py-1.5">
            <span>Add</span>
            <div className="flex items-center">
              <Tooltip ariaLabel="Add Link">
                <div>
                  <Button
                    className="!border-none !bg-transparent hover:!bg-slate-200/80"
                    leading={<IconLink className="!text-slate-800" />}
                    onClick={() => setWidgetType('website')}
                  />
                </div>
              </Tooltip>
              <Tooltip ariaLabel="Add Location">
                <div>
                  <Button
                    className="!border-none !bg-transparent hover:!bg-slate-200/80"
                    leading={<IconLocation className="!text-slate-800" />}
                    onClick={() => setWidgetType('google_map')}
                  />
                </div>
              </Tooltip>
              <Tooltip ariaLabel="Add Image">
                <div>
                  <Dropdown
                    visible={visible}
                    placement="auto"
                    overlay={<MediaPicker allowed={['image']} onChange={handleCreateImage} />}
                    offset={[0, 30]}
                    onDropdownVisibleChange={setVisible}
                  >
                    <Button
                      className="!border-none !bg-transparent hover:!bg-slate-200/80"
                      leading={<IconPhoto className="!text-slate-800" />}
                    />
                  </Dropdown>
                </div>
              </Tooltip>
              <Tooltip ariaLabel="Add Group Title">
                <div>
                  <Button
                    className="!border-none !bg-transparent hover:!bg-slate-200/80"
                    leading={<IconGroupTitle className="!text-slate-800" />}
                    onClick={handleCreateGroupTitle}
                  />
                </div>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

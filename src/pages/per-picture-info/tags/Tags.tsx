import './Tags.scss'
import { AllTags, allTags, tags } from './resources/tags'
import { Tag } from './tag/Tag'

export const ALL_TAGS_TO_FALSE: Record<AllTags, false> = {
  clouds: false,
  fire: false,
  fog: false,
  sky: false,
  smoke: false,
  none: false
}

export type TagState = Record<AllTags, boolean>

export const Tags = ({ tagEnabled, setTagEnabled }: { tagEnabled: TagState, setTagEnabled: (tags: TagState) => void }): JSX.Element => {
  const onTagClick = (tagKey: AllTags): void => {
    setTagEnabled({
      ...tagEnabled,
      ...(!tagEnabled[tagKey] ? { none: false } : {}), // tag was false and will transition to true => deselect none
      [tagKey]: !tagEnabled[tagKey]
    })
  }

  const onNoneTagClick = (): void => {
    setTagEnabled({
      ...tagEnabled,
      ...(!tagEnabled.none ? ALL_TAGS_TO_FALSE : {}), // none was false and will transition to true => deselect all other options
      none: !tagEnabled.none
    })
  }

  const tagsElements = allTags.map((tagKey, tagIndex1) => <>
    <Tag tagInfo={tags[tagKey]} enabled={tagEnabled[tagKey]} onClick={tagKey === 'none' ? onNoneTagClick : onTagClick} key={tagIndex1} tagId={tagKey}/>
  </>)
  return (
    <div className='tagsContainer'>
      {tagsElements}
    </div>
  )
}

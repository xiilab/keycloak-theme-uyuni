import React from 'react'
import { Avatar } from '@mui/material'

interface LetterAvatarProps {
  text: string
  width: number | string
  height: number | string
  fontSize: string
  fontWeight: number | string
  type?: 'user' | 'group'
}

/** 텍스트 프로필 컴포넌트 (MUI Avatar 컴포넌트 사용) */
const LetterAvatar = (props: LetterAvatarProps) => {
  /** text 값에 따른 색상 설정 */
  function stringToColor(string: string) {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 20)) & 0xff
      color += `00${value.toString(16)}`.substr(-2)
    }
    /* eslint-enable no-bitwise */

    return color
  }

  /** Avatar 속성 값 설정 */
  function stringAvatar(name: string) {
    const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/ // 한글체크

    /** 한글 포함 체크 */
    if (check_kor.test(props.text)) {
      if (!(props.type !== undefined && props.type === 'group'))
        name = name.slice(1)
    } else {
      name = name.replace('.', ' ')
      name = name.replace('_', ' ')
    }

    return {
      sx: {
        bgcolor: stringToColor(name),
        width: props.width,
        height: props.height,
        fontSize: props.fontSize,
        fontWeight: props.fontWeight,
      },
      children: check_kor.test(props.text)
        ? `${name.split('')[0][0]}${name.split('')[1][0]}`
        : `${name.split(' ')[0][0]}${
            name.split(' ').length > 1 ? name.split(' ')[1][0] : ''
          }`,
    }
  }

  return <Avatar {...stringAvatar(props.text)} />
}

LetterAvatar.defaultProps = {
  height: 24,
  width: 24,
  fontSize: '.9rem',
  fontWeight: 500,
}

export default LetterAvatar

import clsx from 'clsx'
import Image from 'next/image'
import { FC, useMemo } from 'react'

import { Icon3dsmax } from './Icon3dsmax'
import { IconAftereffects } from './IconAftereffects'
import { IconAngular } from './IconAngular'
import { IconArabic } from './IconArabic'
import { IconAutocad } from './IconAutocad'
import { IconAutodeskmaya } from './IconAutodeskmaya'
import { IconBlender } from './IconBlender'
import { IconC } from './IconC'
import { IconChatgpt } from './IconChatgpt'
import { IconChinese } from './IconChinese'
import { IconCinema4d } from './IconCinema4d'
import { IconClaude } from './IconClaude'
import { IconCpp } from './IconCpp'
import { IconCsharp } from './IconCsharp'
import { IconCss } from './IconCss'
import { IconDanish } from './IconDanish'
import { IconDavinci } from './IconDavinci'
import { IconDotnet } from './IconDotnet'
import { IconDutch } from './IconDutch'
import { IconEducation } from './IconEducation'
import { IconEnglish } from './IconEnglish'
import { IconFigma } from './IconFigma'
import { IconFinalcut } from './IconFinalcut'
import { IconFlutter } from './IconFlutter'
import { IconFrench } from './IconFrench'
import { IconGerman } from './IconGerman'
import { IconGo } from './IconGo'
import { IconHtml } from './IconHtml'
import { IconIllustrator } from './IconIllustrator'
import { IconImovie } from './IconImovie'
import { IconIndesign } from './IconIndesign'
import { IconIndonesian } from './IconIndonesian'
import { IconItalian } from './IconItalian'
import { IconJapanese } from './IconJapanese'
import { IconJava } from './IconJava'
import { IconJavascript } from './IconJavascript'
import { IconKorean } from './IconKorean'
import { IconKotlin } from './IconKotlin'
import { IconLightroom } from './IconLightroom'
import { IconMicrosoftoffice } from './IconMicrosoftoffice'
import { IconNext } from './IconNext'
import { IconNode } from './IconNode'
import { IconPhotoshop } from './IconPhotoshop'
import { IconPhp } from './IconPhp'
import { IconPolish } from './IconPolish'
import { IconPortuguese } from './IconPortuguese'
import { IconPremiere } from './IconPremiere'
import { IconPython } from './IconPython'
import { IconRails } from './IconRails'
import { IconReact } from './IconReact'
import { IconRomanian } from './IconRomanian'
import { IconRuby } from './IconRuby'
import { IconRussian } from './IconRussian'
import { IconRust } from './IconRust'
import { IconSketch } from './IconSketch'
import { IconSketchup } from './IconSketchup'
import { IconSpanish } from './IconSpanish'
import { IconSwift } from './IconSwift'
import { IconTailwind } from './IconTailwind'
import { IconTurkish } from './IconTurkish'
import { IconTypescript } from './IconTypescript'
import { IconUkrainian } from './IconUkrainian'
import { IconVietnamese } from './IconVietnamese'
import { IconVue } from './IconVue'
import { IconWork } from './IconWork'
import { IconXd } from './IconXd'
import { IconZbrush } from './IconZbrush'

export interface SkillsIcon {
  iconType: 'svg' | 'image'
  svgName: string
  imageUrl?: string
}

const Icon: FC<Pick<SkillsIcon, 'svgName'> & ComponentProps> = ({ svgName, ...restProps }) => {
  switch (svgName) {
    case 'angular':
      return <IconAngular {...restProps} />

    case 'c':
      return <IconC {...restProps} />

    case 'cpp':
      return <IconCpp {...restProps} />

    case 'csharp':
      return <IconCsharp {...restProps} />

    case 'css':
      return <IconCss {...restProps} />

    case 'dotnet':
      return <IconDotnet {...restProps} />

    case 'go':
      return <IconGo {...restProps} />

    case 'html':
      return <IconHtml {...restProps} />

    case 'java':
      return <IconJava {...restProps} />

    case 'javascript':
      return <IconJavascript {...restProps} />

    case 'kotlin':
      return <IconKotlin {...restProps} />

    case 'next':
      return <IconNext {...restProps} />

    case 'node':
      return <IconNode {...restProps} />

    case 'php':
      return <IconPhp {...restProps} />

    case 'python':
      return <IconPython {...restProps} />

    case 'rails':
      return <IconRails {...restProps} />

    case 'react':
      return <IconReact {...restProps} />

    case 'ruby':
      return <IconRuby {...restProps} />

    case 'rust':
      return <IconRust {...restProps} />

    case 'swift':
      return <IconSwift {...restProps} />

    case 'tailwind':
      return <IconTailwind {...restProps} />

    case 'typescript':
      return <IconTypescript {...restProps} />

    case 'vue':
      return <IconVue {...restProps} />

    case '3dsmax':
      return <Icon3dsmax {...restProps} />

    case 'aftereffects':
      return <IconAftereffects {...restProps} />

    case 'autocad':
      return <IconAutocad {...restProps} />

    case 'autodeskmaya':
      return <IconAutodeskmaya {...restProps} />

    case 'blender':
      return <IconBlender {...restProps} />

    case 'cinema4d':
      return <IconCinema4d {...restProps} />

    case 'figma':
      return <IconFigma {...restProps} />

    case 'illustrator':
      return <IconIllustrator {...restProps} />

    case 'indesign':
      return <IconIndesign {...restProps} />

    case 'lightroom':
      return <IconLightroom {...restProps} />

    case 'photoshop':
      return <IconPhotoshop {...restProps} />

    case 'sketch':
      return <IconSketch {...restProps} />

    case 'sketchup':
      return <IconSketchup {...restProps} />

    case 'xd':
      return <IconXd {...restProps} />

    case 'zbrush':
      return <IconZbrush {...restProps} />

    case 'Arabic':
      return <IconArabic {...restProps} />

    case 'Chinese':
      return <IconChinese {...restProps} />

    case 'Danish':
      return <IconDanish {...restProps} />

    case 'Dutch':
      return <IconDutch {...restProps} />

    case 'English':
      return <IconEnglish {...restProps} />

    case 'French':
      return <IconFrench {...restProps} />

    case 'German':
      return <IconGerman {...restProps} />

    case 'Indonesian':
      return <IconIndonesian {...restProps} />

    case 'Italian':
      return <IconItalian {...restProps} />

    case 'Japanese':
      return <IconJapanese {...restProps} />

    case 'Korean':
      return <IconKorean {...restProps} />

    case 'Polish':
      return <IconPolish {...restProps} />

    case 'Portuguese':
      return <IconPortuguese {...restProps} />

    case 'Romanian':
      return <IconRomanian {...restProps} />

    case 'Russian':
      return <IconRussian {...restProps} />

    case 'Spanish':
      return <IconSpanish {...restProps} />

    case 'Turkish':
      return <IconTurkish {...restProps} />

    case 'Ukrainian':
      return <IconUkrainian {...restProps} />

    case 'Vietnamese':
      return <IconVietnamese {...restProps} />

    case 'flutter':
      return <IconFlutter {...restProps} />

    case 'chatgpt':
      return <IconChatgpt {...restProps} />

    case 'claude':
      return <IconClaude {...restProps} />

    case 'davinci':
      return <IconDavinci {...restProps} />

    case 'finalcut':
      return <IconFinalcut {...restProps} />

    case 'imovie':
      return <IconImovie {...restProps} />

    case 'microsoftoffice':
      return <IconMicrosoftoffice {...restProps} />

    case 'premiere':
      return <IconPremiere {...restProps} />

    case 'education':
      return <IconEducation {...restProps} />

    case 'work':
      return <IconWork {...restProps} />

    default:
      return null
  }
}

export const SkillsIcon: FC<SkillsIcon & ComponentProps> = ({
  className,
  iconType,
  svgName,
  imageUrl,
  ...restProps
}) => {
  const children = useMemo(() => {
    if (iconType === 'svg') {
      return <Icon className="w-full h-full" svgName={svgName} />
    }

    return (
      <div className="p-1.5">
        <Image
          className="block h-full w-full object-cover rounded-md"
          src={imageUrl!}
          alt=""
          width={28}
          height={28}
        />
      </div>
    )
  }, [svgName, iconType, imageUrl])

  return (
    <div
      className={clsx(
        'relative flex max-[400px]:w-8 max-[400px]:h-8 h-10 w-10 items-center justify-center rounded-lg',
        className
      )}
      {...restProps}
    >
      {children}
      <div className="pointer-events-none absolute inset-0 border border-black/10 dark:border-white/20 rounded-lg group-hover/picker:border-black/20"></div>
    </div>
  )
}

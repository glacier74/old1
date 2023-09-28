import dayjs from 'dayjs'
import Image from 'next/image'
import { FC } from 'react'

import { IconProducthunt, IconTwitter } from '~/components'

const TestimonialTwitter: FC<{ testimonial: TestimonialRecord }> = ({ testimonial }) => {
  return (
    <div className="w-full rounded-2xl bg-white py-12 px-8 shadow-xl shadow-slate-900/10">
      <div className="w-full flex items-center">
        <a href={testimonial.URL} target="_blank" rel="noreferrer">
          <Image
            className="w-12 h-12 rounded-full"
            src={testimonial.Avatar!}
            width="48"
            height="48"
            alt={testimonial.Name}
          />
        </a>
        <div className="flex-grow pl-3">
          <div className="flex justify-between my-auto">
            <div>
              <div className="font-bold inline text-md">
                <a
                  className="hover:underline"
                  href={testimonial.URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {testimonial.Name}
                </a>
              </div>
              <div className="text-sm text-slate-500 ">
                <a
                  className="hover:underline"
                  href={testimonial.URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {testimonial.Name}
                </a>
              </div>
            </div>
            <a href={testimonial.URL} target="_blank" rel="noreferrer" aria-label="Twitter">
              <IconTwitter className="w-6 h-6 text-[#1ea1f2]" />
            </a>
          </div>
        </div>
      </div>

      <div className="w-full flex-grow mt-4">
        <div className="text-slate-700 text-md">
          <div dangerouslySetInnerHTML={{ __html: testimonial.Testimonial }} />
        </div>
      </div>

      <div className="w-full flex justify-between mt-2">
        <div className="text-sm text-slate-500 mt-2">
          <a className="hover:underline" href={testimonial.URL} target="_blank" rel="noreferrer">
            {dayjs(testimonial.Date).format('MMM DD, YYYY')}
          </a>
        </div>
      </div>
    </div>
  )
}

const TestimonialProducthunt: FC<{ testimonial: TestimonialRecord }> = ({ testimonial }) => {
  return (
    <div className="w-full rounded-2xl bg-white py-12 px-8 shadow-xl shadow-slate-900/10">
      <div className="w-full flex items-center">
        <a href={testimonial.URL} target="_blank" rel="noreferrer">
          <Image
            className="w-12 h-12 rounded-full"
            src={testimonial.Avatar!}
            width="48"
            height="48"
            alt={testimonial.Name}
          />
        </a>
        <div className="flex-grow pl-3">
          <div className="flex justify-between my-auto">
            <div>
              <div className="font-bold inline text-md">
                <a
                  className="hover:underline"
                  href={testimonial.URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {testimonial.Name}
                </a>
              </div>
              <div className="text-sm text-slate-500 ">{testimonial.Title}</div>
            </div>
            <a href={testimonial.URL} target="_blank" rel="noreferrer" aria-label="Product Hunt">
              <IconProducthunt className="w-6 h-6 text-[#da552f]" />
            </a>
          </div>
        </div>
      </div>

      <div className="w-full flex-grow mt-4">
        <div className="text-slate-700 text-md">
          <div dangerouslySetInnerHTML={{ __html: testimonial.Testimonial }} />
        </div>
      </div>

      <div className="w-full flex justify-between mt-2">
        <div className="text-sm text-slate-500 mt-2">
          <a className="hover:underline" href={testimonial.URL} target="_blank" rel="noreferrer">
            {dayjs(testimonial.Date).format('MMM DD, YYYY')}
          </a>
        </div>
      </div>
    </div>
  )
}

const TestimonialEmail: FC<{ testimonial: TestimonialRecord }> = ({ testimonial }) => {
  return (
    <div className="w-full rounded-2xl bg-white py-12 px-8 shadow-xl shadow-slate-900/10">
      <div className="w-full flex items-center">
        <div>
          <Image
            className="w-12 h-12 rounded-full"
            src={testimonial.Avatar!}
            width="48"
            height="48"
            alt={testimonial.Name}
          />
        </div>
        <div className="flex-grow pl-3">
          <div className="flex justify-between my-auto">
            <div>
              <div className="font-bold inline text-md">{testimonial.Name}</div>
              <div className="text-sm text-slate-500 ">{testimonial.Title}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex-grow mt-4">
        <div className="text-slate-700 text-md">
          <div dangerouslySetInnerHTML={{ __html: testimonial.Testimonial }} />
        </div>
      </div>

      <div className="w-full flex justify-between mt-2">
        <div className="text-sm text-slate-500 mt-2">
          {dayjs(testimonial.Date).format('MMM DD, YYYY')}
        </div>
      </div>
    </div>
  )
}

export const TestimonialItem: FC<{ testimonial: TestimonialRecord }> = ({ testimonial }) => {
  switch (testimonial.Platform) {
    case 'Twitter':
      return <TestimonialTwitter testimonial={testimonial} />

    case 'Product Hunt':
      return <TestimonialProducthunt testimonial={testimonial} />

    case 'Email':
      return <TestimonialEmail testimonial={testimonial} />

    default:
      return null
  }
}

export const HomeTestimonials: FC<{ columns: TestimonialRecord[][] }> = ({ columns }) => {
  return (
    <section className="relative py-32">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-2xl text-center font-bold md:text-5xl text-slate-900">
          People really love EarlyBird
        </h2>
        <div className="mt-6 flex justify-center">
          <div className="flex self-center place-content-center md:flex-row space-x-0 md:space-y-0 md:space-x-5">
            <div>
              <svg className="h-12" viewBox="0 0 122 37" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M104.953 36.286c-4.22 1.634-5.936.086-5.936-.891 1.495-.126 5.067-.331 5.936.891Zm5.356-1.336a5.486 5.486 0 0 1-7.083-.497c1.44-.4 5.372-.874 7.083.497Zm-7.139-3.176c.16 2.033-1.922 3.176-4.17 3.341.41-2.045 2.509-2.958 4.17-3.341Zm4.032-1.874c.238.869-.089 3.228-3.323 4.164.139-1.593.986-3.667 3.323-4.164Zm6.413 2.365a5.005 5.005 0 0 1-6.385.571c1.296-.668 4.408-1.57 6.385-.571Zm-3.417-4.706c.443.856.537 3.295-2.326 4.763-.166-1.57.465-4.255 2.326-4.763Zm7.083.948a4.389 4.389 0 0 1-2.657 2.217 4.243 4.243 0 0 1-3.39-.44c1.805-1.697 4.685-2.348 6.047-1.777Zm-4.28-4.547c1.284 2.24-.073 4.798-1.485 5.849-.628-2.082-.052-4.351 1.484-5.849Zm6.662-.097c.155 3.479-3.478 3.29-5.184 3.313.537-.731 3.522-3.381 5.184-3.313Zm-4.48-3.25c.675.743 1.688 3.599-.555 5.929-.703-1.685-.858-4.272.554-5.929Zm6.385-1.542c.116 2.81-2.249 4.232-4.53 4.21.686-1.354 2.52-3.964 4.53-4.21Zm-4.785-1.936c1.512.89 1.34 3.764.448 5.26-1.002-1.393-1.75-3.124-.448-5.26Zm4.884-2.633c.748 2.559-1.45 4.29-2.769 4.438.338-1.222.781-3.387 2.77-4.438Zm-4.607-.851c1.667.835 2.457 2.832 1.833 4.632-1.163-.937-2.564-2.919-1.833-4.632Zm4.685-3.096c1.03 3.113-1.335 4.13-2.215 4.38.105-1.324.947-3.963 2.215-4.38Zm-4.619-.817c.676.195 2.603 1.777 2.254 4.61-1.268-.714-2.808-2.074-2.254-4.61Zm3.921-3.9c1.152 3.826-.77 5.397-1.401 5.71-.1-1.21-.222-4.037 1.401-5.71Zm-4.264.096c1.207.337 2.73 2.553 2.658 4.684-1.196-.548-2.985-2.827-2.658-4.684Zm.36-5.934c2.802 2.896 3.195 5.18 2.376 7.996-1.269-1.142-2.282-4.569-2.376-7.996ZM17.047 36.286c4.22 1.634 5.936.086 5.936-.891-1.495-.126-5.067-.331-5.936.891ZM11.69 34.95a5.486 5.486 0 0 0 7.083-.497c-1.44-.4-5.372-.874-7.083.497Zm7.139-3.176c-.16 2.033 1.922 3.176 4.17 3.341-.41-2.045-2.509-2.958-4.17-3.341ZM14.798 29.9c-.238.869.089 3.228 3.323 4.164-.139-1.593-.986-3.667-3.323-4.164Zm-6.413 2.365a5.005 5.005 0 0 0 6.385.571c-1.296-.668-4.408-1.57-6.385-.571Zm3.417-4.706c-.443.856-.537 3.295 2.326 4.763.166-1.57-.465-4.255-2.326-4.763Zm-7.083.948a4.389 4.389 0 0 0 2.657 2.217 4.243 4.243 0 0 0 3.39-.44c-1.805-1.697-4.685-2.348-6.047-1.777Zm4.28-4.547c-1.284 2.24.073 4.798 1.485 5.849.628-2.082.052-4.351-1.484-5.849Zm-6.662-.097c-.155 3.479 3.478 3.29 5.184 3.313-.537-.731-3.522-3.381-5.184-3.313Zm4.48-3.25c-.675.743-1.688 3.599.555 5.929.703-1.685.858-4.272-.554-5.929ZM.433 19.071c-.116 2.81 2.249 4.232 4.53 4.21-.686-1.354-2.52-3.964-4.53-4.21Zm4.785-1.936c-1.512.89-1.34 3.764-.448 5.26 1.002-1.393 1.75-3.124.448-5.26ZM.333 14.502c-.748 2.559 1.45 4.29 2.769 4.438-.338-1.222-.781-3.387-2.77-4.438Zm4.607-.851c-1.667.835-2.457 2.832-1.833 4.632 1.163-.937 2.564-2.919 1.833-4.632ZM.255 10.555c-1.03 3.113 1.335 4.13 2.215 4.38-.105-1.324-.947-3.963-2.215-4.38Zm4.619-.817c-.676.195-2.603 1.777-2.254 4.61 1.268-.714 2.808-2.074 2.254-4.61Zm-3.921-3.9c-1.152 3.826.77 5.397 1.401 5.71.1-1.21.222-4.037-1.401-5.71Zm4.264.096c-1.207.337-2.73 2.553-2.658 4.684 1.196-.548 2.985-2.827 2.658-4.684ZM4.857 0C2.055 2.896 1.662 5.18 2.481 7.996 3.75 6.854 4.763 3.427 4.857 0ZM50.44 35c.144 0 .256-.096.256-.24v-1.584a.253.253 0 0 0-.256-.256h-3.92l2.672-2.72c.432-.448 1.488-1.44 1.488-3.104 0-1.968-1.52-3.424-3.712-3.424-1.744 0-2.848.912-3.488 1.84-.08.096-.08.24.032.352l1.104 1.104c.144.128.24.144.368 0 .416-.544.912-1.056 1.776-1.056.928 0 1.536.576 1.536 1.408 0 .992-.816 1.744-1.264 2.192l-3.328 3.376a.478.478 0 0 0-.112.304v1.568c0 .144.112.24.256.24h6.592Zm6.256.208c2.32 0 4.576-1.664 4.576-5.76s-2.256-5.776-4.576-5.776c-2.304 0-4.576 1.68-4.576 5.776s2.272 5.76 4.576 5.76Zm0-2.256c-1.584 0-2.208-1.536-2.208-3.504s.624-3.52 2.208-3.52c1.568 0 2.192 1.552 2.192 3.52s-.624 3.504-2.192 3.504ZM69.608 35c.144 0 .256-.096.256-.24v-1.584a.253.253 0 0 0-.256-.256h-3.92l2.672-2.72c.432-.448 1.488-1.44 1.488-3.104 0-1.968-1.52-3.424-3.712-3.424-1.744 0-2.848.912-3.488 1.84-.08.096-.08.24.032.352l1.104 1.104c.144.128.24.144.368 0 .416-.544.912-1.056 1.776-1.056.928 0 1.536.576 1.536 1.408 0 .992-.816 1.744-1.264 2.192l-3.328 3.376a.478.478 0 0 0-.112.304v1.568c0 .144.112.24.256.24h6.592Zm8.624 0c.144 0 .256-.096.256-.24v-1.584a.253.253 0 0 0-.256-.256h-3.92l2.672-2.72c.432-.448 1.488-1.44 1.488-3.104 0-1.968-1.52-3.424-3.712-3.424-1.744 0-2.848.912-3.488 1.84-.08.096-.08.24.032.352l1.104 1.104c.144.128.24.144.368 0 .416-.544.912-1.056 1.776-1.056.928 0 1.536.576 1.536 1.408 0 .992-.816 1.744-1.264 2.192l-3.328 3.376a.478.478 0 0 0-.112.304v1.568c0 .144.112.24.256.24h6.592ZM17.51 15.13c2 0 3.21-1.49 3.21-3.31v-.72c0-.09-.06-.15-.15-.15h-3.03c-.09 0-.15.06-.15.15v1.09c0 .09.06.16.15.16h1.67c-.06.66-.64 1.23-1.65 1.23-1.22 0-2.09-.86-2.09-2.05s.87-2.06 2.01-2.06c.59 0 1.07.22 1.45.55.08.06.16.06.24-.03l.74-.79c.09-.1.09-.19.01-.28-.6-.62-1.43-1-2.45-1-1.98 0-3.6 1.55-3.6 3.61 0 2.06 1.62 3.6 3.64 3.6Zm6.35-.01c1.48 0 2.58-1.12 2.58-2.57 0-1.45-1.1-2.57-2.58-2.57s-2.57 1.12-2.57 2.57c0 1.45 1.09 2.57 2.57 2.57Zm0-1.4c-.62 0-1.1-.45-1.1-1.17s.48-1.17 1.1-1.17c.62 0 1.1.45 1.1 1.17s-.48 1.17-1.1 1.17ZM28.68 15c.09 0 .16-.06.16-.15V8c0-.09-.07-.15-.16-.15h-1.23c-.09 0-.15.06-.15.15v6.85c0 .09.06.15.15.15h1.23Zm3.32.12c.7 0 1.2-.28 1.53-.75l.02.48c0 .09.07.15.16.15h1.1c.09 0 .17-.06.17-.15V8c0-.09-.07-.15-.16-.15h-1.23c-.09 0-.15.06-.15.15v2.59c-.33-.39-.8-.61-1.44-.61-1.36 0-2.3 1.12-2.3 2.57 0 1.46.94 2.57 2.3 2.57Zm.33-1.39c-.65 0-1.14-.46-1.14-1.18 0-.71.49-1.18 1.14-1.18.67 0 1.13.47 1.13 1.17 0 .72-.46 1.19-1.13 1.19Zm6.21 1.39c.69 0 1.32-.2 1.74-.62.09-.08.09-.16.05-.22l-.41-.58c-.06-.07-.1-.09-.18-.05-.41.23-.75.27-1.08.27-.7 0-1.16-.26-1.33-.79h2.82c.45 0 .58-.3.58-.8 0-1.26-.87-2.35-2.37-2.35-1.51 0-2.52 1.11-2.52 2.55 0 1.49 1.09 2.59 2.7 2.59Zm-1.23-3.05c.12-.58.55-.83 1.06-.83s.9.24 1 .83h-2.06ZM42.96 15c.09 0 .16-.06.16-.15v-2.48c0-.65.32-.99.85-.99.54 0 .82.34.82.99v2.48c0 .09.07.15.16.15h1.21c.09 0 .16-.06.16-.15v-2.84c0-1.28-.75-2.03-1.77-2.03-.7 0-1.15.35-1.43.85l-.05-.57c0-.12-.06-.16-.15-.16h-1.18c-.09 0-.15.06-.15.15v4.6c0 .09.06.15.15.15h1.22Zm7.95 0c.09 0 .15-.06.15-.15v-1.61l.72-.91 1.8 2.58c.05.07.1.09.18.09h1.49c.12 0 .16-.08.09-.18l-2.59-3.73 2.31-2.91c.06-.09.05-.18-.08-.18h-1.56c-.07 0-.13.02-.18.08l-2.18 2.99V8.15c0-.09-.06-.15-.15-.15h-1.28c-.09 0-.15.06-.15.15v6.7c0 .09.06.15.15.15h1.28Zm6.05-5.68c.48 0 .83-.37.83-.84 0-.46-.35-.83-.83-.83s-.84.37-.84.83c0 .47.36.84.84.84Zm.62 5.68c.09 0 .15-.06.15-.15v-4.6c0-.09-.06-.15-.15-.15h-1.24c-.09 0-.15.06-.15.15v4.6c0 .09.06.15.15.15h1.24Zm3.22.12c.34 0 .88-.06.88-.31v-.83c0-.1-.08-.15-.18-.14-.13.01-.22.01-.31.01-.25 0-.42-.14-.42-.41v-2.16h.75c.09 0 .15-.06.15-.15v-.88c0-.09-.06-.15-.15-.15h-.75V8.95c0-.09-.07-.15-.16-.15h-1.23c-.09 0-.16.06-.16.15v1.15h-.61c-.09 0-.15.06-.15.15v.88c0 .09.06.15.15.15h.61v2.33c0 1.14.77 1.51 1.58 1.51Zm3.73 0c.34 0 .88-.06.88-.31v-.83c0-.1-.08-.15-.18-.14-.13.01-.22.01-.31.01-.25 0-.42-.14-.42-.41v-2.16h.75c.09 0 .15-.06.15-.15v-.88c0-.09-.06-.15-.15-.15h-.75V8.95c0-.09-.07-.15-.16-.15h-1.23c-.09 0-.16.06-.16.15v1.15h-.61c-.09 0-.15.06-.15.15v.88c0 .09.06.15.15.15h.61v2.33c0 1.14.77 1.51 1.58 1.51Zm3.89 1.78c.08 0 .15-.04.18-.12l2.6-6.51c.04-.11-.02-.17-.13-.17h-1.24c-.08 0-.16.04-.19.12l-1.08 3-1.08-3c-.03-.08-.11-.12-.19-.12h-1.24c-.11 0-.17.06-.13.17l1.9 4.74-.72 1.71c-.05.12.01.18.13.18h1.19Zm9.35-8.78c-.03-.08-.11-.12-.19-.12h-1.36c-.08 0-.16.04-.19.12l-2.32 6.71c-.04.1.02.17.13.17h1.33c.08 0 .14-.03.17-.12l.3-.94h2.52l.3.94c.03.09.09.12.17.12h1.34c.11 0 .16-.07.12-.17l-2.32-6.71Zm-.87 1.89.81 2.53h-1.62l.81-2.53ZM82.71 15c.08 0 .15-.04.18-.12l1.03-3 1.02 3c.03.08.1.12.18.12h1.25c.08 0 .15-.04.18-.12l1.52-4.61c.04-.11-.01-.17-.12-.17h-1.19c-.08 0-.15.04-.18.12l-.91 3-.99-3a.183.183 0 0 0-.18-.12h-1.17c-.08 0-.15.04-.18.12l-.99 3-.91-3a.183.183 0 0 0-.18-.12h-1.18c-.11 0-.17.06-.13.17l1.52 4.61c.03.08.1.12.18.12h1.25Zm7.88.12c.7 0 1.2-.28 1.53-.75l.02.48c0 .09.07.15.16.15h1.1c.09 0 .17-.06.17-.15v-4.6c0-.09-.07-.15-.16-.15H92.3c-.09 0-.16.06-.16.15l-.02.47c-.32-.46-.81-.74-1.53-.74-1.36 0-2.3 1.12-2.3 2.57 0 1.46.94 2.57 2.3 2.57Zm.33-1.39c-.65 0-1.14-.46-1.14-1.18 0-.71.49-1.18 1.14-1.18.67 0 1.13.47 1.13 1.17 0 .72-.46 1.19-1.13 1.19ZM96.05 15c.09 0 .16-.06.16-.15v-2.36c0-.73.38-1.13 1.01-1.13.15 0 .26.02.36.05.14.03.21 0 .21-.13v-.97c0-.09-.02-.15-.09-.2-.08-.06-.21-.13-.45-.13-.57 0-.88.4-1.04.93l-.05-.65c0-.12-.06-.16-.15-.16h-1.18c-.09 0-.15.06-.15.15v4.6c0 .09.06.15.15.15h1.22Zm4.5.12c.7 0 1.2-.28 1.53-.75l.02.48c0 .09.07.15.16.15h1.1c.09 0 .17-.06.17-.15V8c0-.09-.07-.15-.16-.15h-1.23c-.09 0-.15.06-.15.15v2.59c-.33-.39-.8-.61-1.44-.61-1.36 0-2.3 1.12-2.3 2.57 0 1.46.94 2.57 2.3 2.57Zm.33-1.39c-.65 0-1.14-.46-1.14-1.18 0-.71.49-1.18 1.14-1.18.67 0 1.13.47 1.13 1.17 0 .72-.46 1.19-1.13 1.19Zm5.48 1.39c.99 0 1.86-.52 1.87-1.53.02-.74-.47-1.17-1.08-1.41l-.74-.29c-.22-.09-.39-.22-.39-.4 0-.15.09-.32.39-.32.27 0 .54.14.86.39.09.06.16.07.23 0l.51-.6c.04-.06.07-.14.01-.21-.43-.5-1.04-.77-1.69-.77-.94 0-1.76.55-1.76 1.51 0 .68.42 1.1 1.06 1.35l.64.26c.33.13.44.24.44.43 0 .22-.18.32-.45.32-.35 0-.68-.15-1.11-.46-.08-.05-.17-.08-.25.05l-.4.56c-.07.1-.08.22-.03.29.41.49 1.06.83 1.89.83Z"
                  fill="#334155"
                ></path>
              </svg>
            </div>
            <div>
              <svg className="h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122 37">
                <path
                  d="M104.953 36.286c-4.22 1.634-5.936.086-5.936-.891 1.495-.126 5.067-.331 5.936.891Zm5.356-1.336a5.486 5.486 0 0 1-7.083-.497c1.44-.4 5.372-.874 7.083.497Zm-7.139-3.176c.16 2.033-1.922 3.176-4.17 3.341.41-2.045 2.509-2.958 4.17-3.341Zm4.032-1.874c.238.869-.089 3.228-3.323 4.164.139-1.593.986-3.667 3.323-4.164Zm6.413 2.365a5.005 5.005 0 0 1-6.385.571c1.296-.668 4.408-1.57 6.385-.571Zm-3.417-4.706c.443.856.537 3.295-2.326 4.763-.166-1.57.465-4.255 2.326-4.763Zm7.083.948a4.389 4.389 0 0 1-2.657 2.217 4.243 4.243 0 0 1-3.39-.44c1.805-1.697 4.685-2.348 6.047-1.777Zm-4.28-4.547c1.284 2.24-.073 4.798-1.485 5.849-.628-2.082-.052-4.351 1.484-5.849Zm6.662-.097c.155 3.479-3.478 3.29-5.184 3.313.537-.731 3.522-3.381 5.184-3.313Zm-4.48-3.25c.675.743 1.688 3.599-.555 5.929-.703-1.685-.858-4.272.554-5.929Zm6.385-1.542c.116 2.81-2.249 4.232-4.53 4.21.686-1.354 2.52-3.964 4.53-4.21Zm-4.785-1.936c1.512.89 1.34 3.764.448 5.26-1.002-1.393-1.75-3.124-.448-5.26Zm4.884-2.633c.748 2.559-1.45 4.29-2.769 4.438.338-1.222.781-3.387 2.77-4.438Zm-4.607-.851c1.667.835 2.457 2.832 1.833 4.632-1.163-.937-2.564-2.919-1.833-4.632Zm4.685-3.096c1.03 3.113-1.335 4.13-2.215 4.38.105-1.324.947-3.963 2.215-4.38Zm-4.619-.817c.676.195 2.603 1.777 2.254 4.61-1.268-.714-2.808-2.074-2.254-4.61Zm3.921-3.9c1.152 3.826-.77 5.397-1.401 5.71-.1-1.21-.222-4.037 1.401-5.71Zm-4.264.096c1.207.337 2.73 2.553 2.658 4.684-1.196-.548-2.985-2.827-2.658-4.684Zm.36-5.934c2.802 2.896 3.195 5.18 2.376 7.996-1.269-1.142-2.282-4.569-2.376-7.996ZM17.047 36.286c4.22 1.634 5.936.086 5.936-.891-1.495-.126-5.067-.331-5.936.891ZM11.69 34.95a5.486 5.486 0 0 0 7.083-.497c-1.44-.4-5.372-.874-7.083.497Zm7.139-3.176c-.16 2.033 1.922 3.176 4.17 3.341-.41-2.045-2.509-2.958-4.17-3.341ZM14.798 29.9c-.238.869.089 3.228 3.323 4.164-.139-1.593-.986-3.667-3.323-4.164Zm-6.413 2.365a5.005 5.005 0 0 0 6.385.571c-1.296-.668-4.408-1.57-6.385-.571Zm3.417-4.706c-.443.856-.537 3.295 2.326 4.763.166-1.57-.465-4.255-2.326-4.763Zm-7.083.948a4.389 4.389 0 0 0 2.657 2.217 4.243 4.243 0 0 0 3.39-.44c-1.805-1.697-4.685-2.348-6.047-1.777Zm4.28-4.547c-1.284 2.24.073 4.798 1.485 5.849.628-2.082.052-4.351-1.484-5.849Zm-6.662-.097c-.155 3.479 3.478 3.29 5.184 3.313-.537-.731-3.522-3.381-5.184-3.313Zm4.48-3.25c-.675.743-1.688 3.599.555 5.929.703-1.685.858-4.272-.554-5.929ZM.433 19.071c-.116 2.81 2.249 4.232 4.53 4.21-.686-1.354-2.52-3.964-4.53-4.21Zm4.785-1.936c-1.512.89-1.34 3.764-.448 5.26 1.002-1.393 1.75-3.124.448-5.26ZM.333 14.502c-.748 2.559 1.45 4.29 2.769 4.438-.338-1.222-.781-3.387-2.77-4.438Zm4.607-.851c-1.667.835-2.457 2.832-1.833 4.632 1.163-.937 2.564-2.919 1.833-4.632ZM.255 10.555c-1.03 3.113 1.335 4.13 2.215 4.38-.105-1.324-.947-3.963-2.215-4.38Zm4.619-.817c-.676.195-2.603 1.777-2.254 4.61 1.268-.714 2.808-2.074 2.254-4.61Zm-3.921-3.9c-1.152 3.826.77 5.397 1.401 5.71.1-1.21.222-4.037-1.401-5.71Zm4.264.096c-1.207.337-2.73 2.553-2.658 4.684 1.196-.548 2.985-2.827 2.658-4.684ZM4.857 0C2.055 2.896 1.662 5.18 2.481 7.996 3.75 6.854 4.763 3.427 4.857 0Zm49.105 35c.162 0 .288-.108.288-.27v-1.782a.284.284 0 0 0-.288-.288h-4.41l3.006-3.06c.486-.504 1.674-1.62 1.674-3.492 0-2.214-1.71-3.852-4.176-3.852-1.962 0-3.204 1.026-3.924 2.07-.09.108-.09.27.036.396l1.242 1.242c.162.144.27.162.414 0 .468-.612 1.026-1.188 1.998-1.188 1.044 0 1.728.648 1.728 1.584 0 1.116-.918 1.962-1.422 2.466l-3.744 3.798c-.09.126-.126.216-.126.342v1.764c0 .162.126.27.288.27h7.416Zm4.572 0c.162 0 .288-.108.288-.27v-4.464c0-1.17.576-1.782 1.53-1.782.972 0 1.476.612 1.476 1.782v4.464c0 .162.126.27.288.27h2.178c.162 0 .288-.108.288-.27v-5.112c0-2.304-1.35-3.654-3.186-3.654-1.26 0-2.07.63-2.574 1.53l-.09-1.026c0-.216-.108-.288-.27-.288h-2.124c-.162 0-.27.108-.27.27v8.28c0 .162.108.27.27.27h2.196Zm11.754.216c1.26 0 2.16-.504 2.754-1.35l.036.864c0 .162.126.27.288.27h1.98c.162 0 .306-.108.306-.27V22.4c0-.162-.126-.27-.288-.27H73.15c-.162 0-.27.108-.27.27v4.662c-.594-.702-1.44-1.098-2.592-1.098-2.448 0-4.14 2.016-4.14 4.626 0 2.628 1.692 4.626 4.14 4.626Zm.594-2.502c-1.17 0-2.052-.828-2.052-2.124 0-1.278.882-2.124 2.052-2.124 1.206 0 2.034.846 2.034 2.106 0 1.296-.828 2.142-2.034 2.142ZM20.72 15c.09 0 .15-.06.15-.15v-2.26h.72c1.69 0 2.49-.93 2.49-2.29 0-1.36-.8-2.3-2.49-2.3h-2.15c-.09 0-.15.06-.15.15v6.7c0 .09.06.15.15.15h1.28Zm.15-5.6h.68c.53 0 1.02.17 1.02.9 0 .72-.49.89-1.02.89h-.68V9.4Zm5.5 5.6c.09 0 .16-.06.16-.15v-2.36c0-.73.38-1.13 1.01-1.13.15 0 .26.02.36.05.14.03.21 0 .21-.13v-.97c0-.09-.02-.15-.09-.2-.08-.06-.21-.13-.45-.13-.57 0-.88.4-1.04.93l-.05-.65c0-.12-.06-.16-.15-.16h-1.18c-.09 0-.15.06-.15.15v4.6c0 .09.06.15.15.15h1.22Zm4.77.12c1.48 0 2.58-1.12 2.58-2.57 0-1.45-1.1-2.57-2.58-2.57s-2.57 1.12-2.57 2.57c0 1.45 1.09 2.57 2.57 2.57Zm0-1.4c-.62 0-1.1-.45-1.1-1.17s.48-1.17 1.1-1.17c.62 0 1.1.45 1.1 1.17s-.48 1.17-1.1 1.17Zm5.49 1.4c.7 0 1.2-.28 1.53-.75l.02.48c0 .09.07.15.16.15h1.1c.09 0 .17-.06.17-.15V8c0-.09-.07-.15-.16-.15h-1.23c-.09 0-.15.06-.15.15v2.59c-.33-.39-.8-.61-1.44-.61-1.36 0-2.3 1.12-2.3 2.57 0 1.46.94 2.57 2.3 2.57Zm.33-1.39c-.65 0-1.14-.46-1.14-1.18 0-.71.49-1.18 1.14-1.18.67 0 1.13.47 1.13 1.17 0 .72-.46 1.19-1.13 1.19Zm5.52 1.39c.71 0 1.16-.35 1.44-.85l.04.57c0 .12.07.16.16.16h1.17c.09 0 .16-.06.16-.15v-4.6c0-.09-.07-.15-.16-.15h-1.21c-.09 0-.16.06-.16.15v2.48c0 .65-.33.99-.85.99-.54 0-.82-.34-.82-.99v-2.48c0-.09-.07-.15-.16-.15h-1.22c-.09 0-.15.06-.15.15v2.84c0 1.28.74 2.03 1.76 2.03Zm6.44 0c.79 0 1.45-.35 1.87-.9.06-.07.05-.15-.01-.21l-.69-.66c-.08-.08-.19-.08-.26-.01-.27.25-.53.38-.86.38-.74 0-1.18-.56-1.18-1.2 0-.63.44-1.14 1.16-1.14.34 0 .6.12.86.38.08.07.19.07.27-.01l.69-.66c.06-.06.07-.15.01-.21-.42-.55-1.08-.9-1.9-.9-1.48 0-2.56 1.1-2.56 2.54 0 1.47 1.1 2.6 2.6 2.6Zm4.77 0c.34 0 .88-.06.88-.31v-.83c0-.1-.08-.15-.18-.14-.13.01-.22.01-.31.01-.25 0-.42-.14-.42-.41v-2.16h.75c.09 0 .15-.06.15-.15v-.88c0-.09-.06-.15-.15-.15h-.75V8.95c0-.09-.07-.15-.16-.15h-1.23c-.09 0-.16.06-.16.15v1.15h-.61c-.09 0-.15.06-.15.15v.88c0 .09.06.15.15.15h.61v2.33c0 1.14.77 1.51 1.58 1.51Zm5.95 0c1.48 0 2.58-1.12 2.58-2.57 0-1.45-1.1-2.57-2.58-2.57s-2.57 1.12-2.57 2.57c0 1.45 1.09 2.57 2.57 2.57Zm0-1.4c-.62 0-1.1-.45-1.1-1.17s.48-1.17 1.1-1.17c.62 0 1.1.45 1.1 1.17s-.48 1.17-1.1 1.17ZM64.79 15c.09 0 .16-.06.16-.15v-3.57h.98c.09 0 .15-.06.15-.15v-.88c0-.09-.06-.15-.15-.15h-.98v-.49c0-.33.11-.57.58-.57.11 0 .25.03.42.06.07.01.13 0 .13-.07V8.02c0-.06-.03-.13-.09-.16-.3-.15-.52-.17-.82-.17-1.09 0-1.76.52-1.76 1.72v.69h-.58c-.09 0-.15.06-.15.15v.88c0 .09.06.15.15.15h.58v3.57c0 .09.06.15.15.15h1.23Zm6.08.12c.34 0 .88-.06.88-.31v-.83c0-.1-.08-.15-.18-.14-.13.01-.22.01-.31.01-.25 0-.42-.14-.42-.41v-2.16h.75c.09 0 .15-.06.15-.15v-.88c0-.09-.06-.15-.15-.15h-.75V8.95c0-.09-.07-.15-.16-.15h-1.23c-.09 0-.16.06-.16.15v1.15h-.61c-.09 0-.15.06-.15.15v.88c0 .09.06.15.15.15h.61v2.33c0 1.14.77 1.51 1.58 1.51Zm4.65-5.14c-.7 0-1.15.35-1.43.85V8c0-.09-.07-.15-.16-.15h-1.22c-.09 0-.15.06-.15.15v6.85c0 .09.06.15.15.15h1.22c.09 0 .16-.06.16-.15v-2.48c0-.65.32-.99.85-.99.54 0 .82.34.82.99v2.48c0 .09.07.15.16.15h1.21c.09 0 .16-.06.16-.15v-2.84c0-1.28-.75-2.03-1.77-2.03Zm5.34 5.14c.69 0 1.32-.2 1.74-.62.09-.08.09-.16.05-.22l-.41-.58c-.06-.07-.1-.09-.18-.05-.41.23-.75.27-1.08.27-.7 0-1.16-.26-1.33-.79h2.82c.45 0 .58-.3.58-.8 0-1.26-.87-2.35-2.37-2.35-1.51 0-2.52 1.11-2.52 2.55 0 1.49 1.09 2.59 2.7 2.59Zm-1.23-3.05c.12-.58.55-.83 1.06-.83s.9.24 1 .83h-2.06Zm8.27 3.05c.7 0 1.2-.28 1.53-.75l.02.48c0 .09.07.15.16.15h1.1c.09 0 .17-.06.17-.15V8c0-.09-.07-.15-.16-.15h-1.23c-.09 0-.15.06-.15.15v2.59c-.33-.39-.8-.61-1.44-.61-1.36 0-2.3 1.12-2.3 2.57 0 1.46.94 2.57 2.3 2.57Zm.33-1.39c-.65 0-1.14-.46-1.14-1.18 0-.71.49-1.18 1.14-1.18.67 0 1.13.47 1.13 1.17 0 .72-.46 1.19-1.13 1.19Zm5.81 1.39c.7 0 1.2-.28 1.53-.75l.02.48c0 .09.07.15.16.15h1.1c.09 0 .17-.06.17-.15v-4.6c0-.09-.07-.15-.16-.15h-1.11c-.09 0-.16.06-.16.15l-.02.47c-.32-.46-.81-.74-1.53-.74-1.36 0-2.3 1.12-2.3 2.57 0 1.46.94 2.57 2.3 2.57Zm.33-1.39c-.65 0-1.14-.46-1.14-1.18 0-.71.49-1.18 1.14-1.18.67 0 1.13.47 1.13 1.17 0 .72-.46 1.19-1.13 1.19Zm5.96 3.17c.08 0 .15-.04.18-.12l2.6-6.51c.04-.11-.02-.17-.13-.17h-1.24c-.08 0-.16.04-.19.12l-1.08 3-1.08-3c-.03-.08-.11-.12-.19-.12h-1.24c-.11 0-.17.06-.13.17l1.9 4.74-.72 1.71c-.05.12.01.18.13.18h1.19Z"
                  fill="#334155"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="max-w-3xl mx-auto text-center text-sm text-slate-700 mt-4">
          They even put in extra effort to express how much they adore crafting their landing pages
          on EarlyBird.
        </div>

        <div className="relative mt-16 md:flex md:space-x-8">
          {columns.map((column, i) => (
            <div key={i} className="md:flex-1 flex flex-col gap-y-6 sm:gap-y-8">
              {column.map((testimonial, k) => (
                <TestimonialItem key={k} testimonial={testimonial as TestimonialRecord} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

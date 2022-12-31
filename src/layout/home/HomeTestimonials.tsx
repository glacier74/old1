import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC } from 'react'

export const HomeTestimonals: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="relative py-32 mt-32 bg-emerald-100">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-center font-extrabold text-5xl text-slate-900">
          People *really* love EarlyBird
        </h2>
        <div className="max-w-3xl mx-auto text-center text-xl text-slate-700 mt-4">
          They put in extra effort to express how much they adore crafting their landing pages on
          EarlyBird.
        </div>
        <div className="relative mt-8 columns-1 sm:columns-3 gap-8">
          <div className="w-full bg-white shadow-md shadow-emerald-200/50 border border-slate-200 p-5 mb-4 rounded-md">
            <div className="w-full flex items-center">
              <a href="https://twitter.com/jakubeth" target="_blank" rel="noreferrer">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/twitter-profile-image%2Fjakubeth-880819052?alt=media&token=5e532b41-1fd6-456b-afe9-1104e2184a36"
                />
              </a>
              <div className="flex-grow pl-3">
                <div className="flex justify-between my-auto">
                  <div>
                    <h4 className="font-bold inline text-md">
                      <a
                        className="hover:underline"
                        href="https://twitter.com/jakubeth"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Jakub ☻
                      </a>
                    </h4>
                    <div className="text-sm text-sm text-gray-400 ">
                      <a
                        className="hover:underline"
                        href="https://twitter.com/jakubeth"
                        target="_blank"
                        rel="noreferrer"
                      >
                        @jakubeth
                      </a>
                    </div>
                  </div>
                  <a
                    href="https://twitter.com/jakubeth/status/1562159815736057857"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      className="w-5 h-5 text-sky-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="none"
                    >
                      <g>
                        <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                      </g>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full flex-grow mt-2">
              <div className="text-slate-700 text-md">
                <p>
                  This is by far the most awesome screenshot tool I have ever seen. I have been
                  using it since its beta release and I'm in love with this one.
                </p>
              </div>
            </div>

            <div className="w-full flex justify-between mt-2">
              <div className="inline-flex items-center text-sm text-slate-500 mt-2">
                <p className="text-sm">
                  <a
                    className="hover:underline"
                    href="https://www.producthunt.com/posts/xnapper?comment=1871540"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Aug 23, 2022
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-white shadow-md shadow-emerald-200/50 border border-slate-200 p-5 mb-4 rounded-md">
            2
          </div>
          <div className="w-full bg-white shadow-md shadow-emerald-200/50 border border-slate-200 p-5 mb-4 rounded-md">
            3
          </div>
          <div className="w-full bg-white shadow-md shadow-emerald-200/50 border border-slate-200 p-5 mb-4 rounded-md">
            4
          </div>
          <div className="w-full bg-white shadow-md shadow-emerald-200/50 border border-slate-200 p-5 mb-4 rounded-md">
            5
          </div>
          <div className="w-full bg-white shadow-md shadow-emerald-200/50 border border-slate-200 p-5 mb-4 rounded-md">
            6
          </div>
        </div>
      </div>
    </section>
  )
}

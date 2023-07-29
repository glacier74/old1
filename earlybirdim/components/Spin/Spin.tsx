import { CSSProperties, FC } from 'react'

const Spin: FC<ComponentProps> = props => {
  const styles: CSSProperties = {
    animationName: 'spin-blink',
    animationDuration: '1.4s',
    animationIterationCount: 'infinite',
    animationFillMode: 'both'
  }

  return (
    <>
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M4 17C5.65685 17 7 15.6569 7 14C7 12.3431 5.65685 11 4 11C2.34315 11 1 12.3431 1 14C1 15.6569 2.34315 17 4 17Z"
          fill="currentColor"
          style={styles}
        />
        <path
          d="M14 17C15.6569 17 17 15.6569 17 14C17 12.3431 15.6569 11 14 11C12.3431 11 11 12.3431 11 14C11 15.6569 12.3431 17 14 17Z"
          fill="currentColor"
          style={{
            ...styles,
            animationDelay: '0.2s'
          }}
        />
        <path
          d="M24 17C25.6569 17 27 15.6569 27 14C27 12.3431 25.6569 11 24 11C22.3431 11 21 12.3431 21 14C21 15.6569 22.3431 17 24 17Z"
          fill="currentColor"
          style={{
            ...styles,
            animationDelay: '0.4s'
          }}
        />
      </svg>

      <style
        dangerouslySetInnerHTML={{
          __html: `@keyframes spin-blink {
              0% {
                  opacity: 0.2;
              }
              20% {
                  opacity: 1;
              }
              100% {
                  opacity: 0.2;
              }
          }`
        }}
      />
    </>
  )
}

export default Spin

import { ReactElement } from 'react'

export default function AttentionIcon({ className }: { className?: string }): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="19"
      viewBox="0 0 22 19"
      fill="none"
      className={className}
    >
      <path
        d="M10.7634 7.00414V11.0041M10.7634 15.0041H10.7734M9.37875 1.89586L1.15386 16.1025C0.697654 16.8905 0.469552 17.2845 0.503265 17.6078C0.53267 17.8899 0.680441 18.1462 0.909798 18.3129C1.17276 18.5041 1.62802 18.5041 2.53854 18.5041H18.9883C19.8988 18.5041 20.3541 18.5041 20.6171 18.3129C20.8464 18.1462 20.9942 17.8899 21.0236 17.6078C21.0573 17.2845 20.8292 16.8905 20.373 16.1025L12.1481 1.89586C11.6935 1.11069 11.4663 0.718113 11.1697 0.58626C10.9111 0.471247 10.6158 0.471247 10.3571 0.58626C10.0606 0.718113 9.83331 1.1107 9.37875 1.89586Z"
        stroke="#F9FAFB"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

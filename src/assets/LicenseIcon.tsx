import { ReactElement } from 'react'

export default function LicenseIcon({ className }: { className?: string }): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      className={className}
    >
      <path
        d="M18.5 0.5H0.5M18.5 18.5H0.5M2.5 9.5C2.5 8.56812 2.5 8.10218 2.65224 7.73463C2.85523 7.24458 3.24458 6.85523 3.73463 6.65224C4.10218 6.5 4.56812 6.5 5.5 6.5L13.5 6.5C14.4319 6.5 14.8978 6.5 15.2654 6.65224C15.7554 6.85523 16.1448 7.24458 16.3478 7.73463C16.5 8.10218 16.5 8.56812 16.5 9.5C16.5 10.4319 16.5 10.8978 16.3478 11.2654C16.1448 11.7554 15.7554 12.1448 15.2654 12.3478C14.8978 12.5 14.4319 12.5 13.5 12.5L5.5 12.5C4.56812 12.5 4.10218 12.5 3.73463 12.3478C3.24458 12.1448 2.85523 11.7554 2.65224 11.2654C2.5 10.8978 2.5 10.4319 2.5 9.5Z"
        stroke="#F9FAFB"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

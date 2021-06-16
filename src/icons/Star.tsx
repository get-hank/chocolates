import React from 'react'

const Icon = ({ color = '#FFB656' }: { color?: string }) => (
  <svg width="25" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.667 2l3.09 6.26 6.91 1.01-5 4.87 1.18 6.88-6.18-3.25-6.18 3.25 1.18-6.88-5-4.87 6.91-1.01L12.667 2z"
      fill={color}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Icon

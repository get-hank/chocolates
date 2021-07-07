import React from 'react'

const Check = ({
  scale = 1,
  color = '#23806C',
}: {
  scale?: number
  color?: string
}) => (
  <svg
    width={scale * 16}
    height={scale * 12}
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.083 8.583L14.353 0 16 1.709 6.083 12 0 5.688l1.646-1.709 4.437 4.604z"
      fill={color}
    />
  </svg>
)

export default Check

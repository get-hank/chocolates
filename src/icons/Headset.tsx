import React from 'react'

const Icon = ({ scale = 1 }: { scale?: number }) => (
  <svg
    viewBox="0 0 64 64"
    width={scale * 64}
    height={scale * 64}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.575 54.803H9.88c-3.416 0-6.196-2.748-6.196-6.125V38.589c0-3.377 2.78-6.126 6.196-6.126h.694c1.694 0 3.073 1.363 3.073 3.038v16.264c0 1.675-1.379 3.038-3.072 3.038zM9.88 34.42c-2.324 0-4.216 1.87-4.216 4.17v10.088c0 2.298 1.892 4.167 4.216 4.167h.694c.603 0 1.093-.484 1.093-1.08V35.501c0-.596-.49-1.08-1.092-1.08H9.88z"
      fill="#43CBAE"
    />
    <path
      d="M4.674 48.547C2.097 48.547 0 46.474 0 43.926v-.583c0-2.549 2.097-4.622 4.674-4.622.547 0 .99.438.99.979v7.868a.984.984 0 01-.99.979zm-.99-7.682a2.669 2.669 0 00-1.704 2.478v.583c0 1.123.706 2.086 1.704 2.477v-5.538zM54.12 54.803h-.695c-1.693 0-3.072-1.363-3.072-3.037V35.5c0-1.675 1.379-3.037 3.072-3.037h.695c3.416 0 6.196 2.748 6.196 6.126v10.088c0 3.377-2.78 6.125-6.197 6.125zm-.695-20.382c-.602 0-1.092.484-1.092 1.08v16.265c0 .595.49 1.08 1.092 1.08h.695c2.324 0 4.216-1.87 4.216-4.168V38.59c0-2.299-1.892-4.17-4.216-4.17h-.695z"
      fill="#43CBAE"
    />
    <path
      d="M59.326 48.546a.984.984 0 01-.99-.978V39.7c0-.541.443-.98.99-.98 2.577 0 4.674 2.074 4.674 4.623v.583c0 2.547-2.097 4.62-4.674 4.62zm.99-7.681v5.538a2.668 2.668 0 001.704-2.477v-.583a2.668 2.668 0 00-1.704-2.478z"
      fill="#43CBAE"
    />
    <path
      d="M60.983 41.068a.984.984 0 01-.99-.978V29.633c0-15.26-12.558-27.676-27.993-27.676-15.436 0-27.994 12.416-27.994 27.676V39.7c0 .541-.443.98-.99.98a.984.984 0 01-.99-.98V29.633C2.026 13.293 15.473 0 32 0s29.973 13.294 29.973 29.633V40.09c0 .54-.443.978-.99.978zM47.24 61.165h-8.658a.984.984 0 01-.99-.978c0-.541.443-.98.99-.98h8.658c3.43 0 6.426-2.408 7.126-5.727a.98.98 0 011.17-.758c.535.11.88.627.767 1.157-.889 4.222-4.7 7.286-9.063 7.286z"
      fill="#43CBAE"
    />
    <path
      d="M35.714 64c-2.127 0-3.857-1.711-3.857-3.815 0-2.103 1.73-3.814 3.857-3.814 2.128 0 3.858 1.71 3.858 3.814S37.842 64 35.714 64zm0-5.672a1.87 1.87 0 00-1.877 1.857 1.87 1.87 0 001.877 1.857 1.87 1.87 0 001.878-1.857 1.87 1.87 0 00-1.878-1.857z"
      fill="#43CBAE"
    />
  </svg>
)

export default Icon

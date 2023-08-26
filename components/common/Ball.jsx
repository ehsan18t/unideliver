import React from 'react'

const Ball = ({ text, color = 'green', active = false }) => {
  const colors = {
    green: 'bg-green-600/50 ring-8 ring-green-600/30',
    red: 'bg-red-600/50 ring-8 ring-red-600/30',
    blue: 'bg-sky-600/50 ring-8 ring-sky-600/30',
    yellow: 'bg-yellow-600/50 ring-8 ring-yellow-600/30',
    slate: 'bg-slate-600/50 ring-8 ring-slate-600/30',
  }

  return (
    <div
      className={`${colors[color]} ${
        active && 'animate-pulse'
      } h-32 w-32 p-24 rounded-full flex justify-center items-center text-center text-2xl text-slate-700 font-semibold`}
    >
      {text}
    </div>
  )
}

export default Ball

<template>
  <svg
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <path
        id="a"
        d="m6.02 4.99 2.21-4.42c.25-.51.86-.72 1.37-.46.2.1.36.27.46.47l2.08 4.26c.17.34.5.58.88.63l4.36.52c.59.08 1.02.62.95 1.22-.03.24-.14.47-.32.65l-3.45 3.42c-.14.13-.2.33-.18.53l.57 4.61c.09.66-.38 1.27-1.03 1.35-.25.03-.5-.02-.72-.14l-3.64-2c-.26-.14-.58-.15-.85-.01l-3.77 1.95c-.53.27-1.18.06-1.45-.48-.11-.2-.14-.43-.11-.65l.3-2.12c.15-1.04.79-1.93 1.71-2.41l4.19-2.15c.11-.06.15-.2.1-.31-.05-.09-.14-.14-.24-.12l-5.12.74c-.78.11-1.58-.11-2.19-.62l-1.71-1.4c-.49-.4-.56-1.12-.17-1.62.19-.22.45-.37.74-.41l4.38-.57c.28-.03.52-.21.65-.46z"
      />
      <linearGradient id="b" x1="25%" x2="74.92%" y1=".825%" y2="107.86%">
        <stop offset="0" stop-color="#ffd951" />
        <stop offset="1" stop-color="#ffb222" />
      </linearGradient>
      <linearGradient id="c" x1="50%" x2="50%" y1="0%" y2="99.8%">
        <stop offset="0" stop-color="#e58f0d" />
        <stop offset=".9996" stop-color="#eb7915" />
      </linearGradient>
      <filter id="d" height="110.6%" width="110.3%" x="-5.2%" y="-5.3%">
        <feOffset dx="1" dy="1" in="SourceAlpha" result="shadowOffsetInner1" />
        <feComposite
          in="shadowOffsetInner1"
          in2="SourceAlpha"
          k2="-1"
          k3="1"
          operator="arithmetic"
          result="shadowInnerInner1"
        />
        <feColorMatrix
          in="shadowInnerInner1"
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.657 0"
        />
      </filter>
    </defs>
    <g fill="none" fill-rule="evenodd" transform="translate(1.389 1.389)">
      <use fill="url(#b)" fill-rule="evenodd" xlink:href="#a" />
      <use fill="#000" filter="url(#d)" xlink:href="#a" />
      <use stroke="url(#c)" stroke-width=".89" xlink:href="#a" />
    </g>
  </svg>
</template>

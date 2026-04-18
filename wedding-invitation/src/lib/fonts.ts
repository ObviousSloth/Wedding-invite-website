import localFont from 'next/font/local';

export const fontSlight = localFont({
  src: '../../public/fonts/Slight.otf',
  variable: '--font-slight',
  display: 'swap',
});

export const fontSeasons = localFont({
  src: [
    { path: '../../public/fonts/TheSeasons.woff2',    weight: '400', style: 'normal' },
    { path: '../../public/fonts/TheSeasons-Italic.woff2', weight: '400', style: 'italic' },
    // Add bold weights here if you have them
  ],
  variable: '--font-seasons',
  display: 'swap',
});

export const fontCinzel = localFont({
  src: [
    { path: '../../public/fonts/Cinzel-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Cinzel-Bold.woff2',    weight: '700', style: 'normal' },
  ],
  variable: '--font-cinzel',
  display: 'swap',
});

export const fontOldStandard = localFont({
  src: [
    { path: '../../public/fonts/OldStandard-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/OldStandard-Italic.woff2',  weight: '400', style: 'italic' },
  ],
  variable: '--font-oldstandard',
  display: 'swap',
});

export const fontIcon = localFont({
  src: '../../public/fonts/New-Icon-Script.otf',
  variable: '--font-icon',
  display: 'swap',
});
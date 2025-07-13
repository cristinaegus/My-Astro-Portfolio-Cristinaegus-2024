'use client';
import { useEffect, useMemo, useState } from 'react';
import { useTheme } from 'next-themes';
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from 'react-icon-cloud';

export const cloudProps = {
  containerProps: {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      maxWidth: 800,
      minHeight: 350,
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1.7,
    wheelZoom: false,
    imageScale: 1.2,
    activeCursor: 'default',
    tooltip: 'native',
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: '#ffffff', // White outline for better contrast
    maxSpeed: 0.05,
    minSpeed: 0.025,
  },
};

export const renderCustomIcon = (icon, theme) => {
  const bgHex = theme === 'light' ? '#f3f2ef' : '#ffffff'; // White background for dark mode
  const fallbackHex = theme === 'light' ? '#ffffff' : '#ffffff'; // White fallback for dark mode
  const minContrastRatio = theme === 'dark' ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 30,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: e => e.preventDefault(),
    },
  });
};

export default function IconCloud({ iconSlugs }) {
  const [data, setData] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;

    return Object.values(data.simpleIcons).map(icon =>
      renderCustomIcon(icon, theme || 'light'),
    );
  }, [data, theme]);

  return (
    // @ts-ignore
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  );
}

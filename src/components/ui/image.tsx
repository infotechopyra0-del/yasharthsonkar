import NextImage, { ImageProps as NextImageProps } from 'next/image';

interface ImageProps extends Omit<NextImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export function Image({ src, alt, width, height, ...props }: ImageProps) {
  // If consumer requests `fill`, do not pass width/height to NextImage
  if ((props as any).fill) {
    // Ensure width/height are not forwarded when using `fill`
    const { width: _w, height: _h, ...forward } = props as any;
    return (
      <NextImage
        src={src}
        alt={alt}
        {...forward}
        // If caller set priority, ensure loading is eager for LCP
        loading={forward.priority ? 'eager' : forward.loading}
      />
    );
  }

  // For non-fill images, provide sensible defaults when values are not supplied
  const w = width ?? 800;
  const h = height ?? 600;

  return (
    <NextImage
      src={src}
      alt={alt}
      width={w}
      height={h}
      {...props}
      // If caller set priority, ensure loading is eager for LCP
      loading={(props as any).priority ? 'eager' : (props as any).loading}
    />
  );
}


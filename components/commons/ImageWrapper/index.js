import Image from 'next/image';

/**
 * Image Wrapper
 */
const ImageWrapper = ({
  className, priority, src, alt, layout, objectFit, width, height, unoptimized,
}) => (
  <Image
    className={className}
    priority={priority}
    src={src}
    alt={alt}
    layout={layout}
    objectFit={objectFit}
    width={width}
    height={height}
    unoptimized={unoptimized}
    placeholder="blur"
    blurDataURL={src}
  />
);

export default ImageWrapper;

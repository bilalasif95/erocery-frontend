import React from "react";

import { PlaceholderImage } from "@components/atoms";
import { useNetworkStatus } from "@hooks";
import NoPhoto from "images/no-photo.svg";

import * as S from "../ProductTile/styles";

import { IImage } from "@types";

export const CachedImage: React.FC<IImage> = ({
  url,
  url2x,
  alt,
  children,
  zoom,
  defaultImage = NoPhoto,
  ...props
}: IImage) => {
  const [isUnavailable, setUnavailable] = React.useState(false);
  const { online } = useNetworkStatus();
  const [backgroundPosition, setBackgroundPosition] = React.useState('0% 0%');

  React.useEffect(() => {
    updateAvailability();
  }, [online]);

  async function updateAvailability() {
    let _isUnavailable = false;
    if ("caches" in window) {
      if (!online) {
        const match = await window.caches.match(url!);
        let match2x;
        if (url2x) {
          match2x = await window.caches.match(url2x);
        }
        if (!match && !match2x) {
          _isUnavailable = true;
        }
      }
    }

    if (isUnavailable !== _isUnavailable) {
      setUnavailable(_isUnavailable);
    }
  }

  if (!url || isUnavailable) {
    return children || <PlaceholderImage alt={alt} />;
  }

  const handleMouseMove = (e: any) => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.pageX - left) / width * 100
    const y = (e.pageY - top) / height * 100
    setBackgroundPosition(`${x}% ${y}%`)
  };

  return (
    <>
    {zoom ?
    <figure onMouseMove={handleMouseMove} style={{backgroundPosition,backgroundImage: `url(${url})`}}>
    <S.MagnifiedImage>
      <img
        {...props}
        src={url}
        srcSet={url2x ? `${url} 1x, ${url2x} 2x` : `${url} 1x`}
        alt={alt}
        // navigator.onLine is not always accurate
        onError={() => setUnavailable(true)}
      />
    </S.MagnifiedImage>
    </figure>
    : <img
      {...props}
      src={url}
      srcSet={url2x ? `${url} 1x, ${url2x} 2x` : `${url} 1x`}
      alt={alt}
      // navigator.onLine is not always accurate
      onError={() => setUnavailable(true)}
    />}
    </>
  );
};

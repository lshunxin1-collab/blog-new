"use client";

import { useState } from 'react';

export default function LazyImg({ src, alt = '', className = '', ...rest }: any) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`${className} [transition:filter_.5s_ease-out,opacity_.5s_ease-out,transform_.5s_ease-out] ${loaded ? 'blur-0 opacity-100' : 'opacity-60 md:blur-md'}`}
      {...rest}
    />
  );
}

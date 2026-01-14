'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

type Props = {
  data: string;
  height: number;
  width: number;
};

export function QrCode({ data, height= 200, width= 200}: Props) {
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    let cancelled = false;

    QRCode.toString(data, {
      type: 'svg',
      errorCorrectionLevel: 'M',
      margin: 1,
    }).then((result) => {
      if (!cancelled) setSvg(result);
    });

    return () => {
      cancelled = true;
    };
  }, [data]);

  return (
    <div
      aria-label="QR Code"
      style={{ width: width, height: height }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

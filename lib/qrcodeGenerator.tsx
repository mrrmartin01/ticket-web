'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

type Props = {
  data: string;
};

export function QrCode({ data }: Props) {
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
      style={{ width: 200, height: 200 }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

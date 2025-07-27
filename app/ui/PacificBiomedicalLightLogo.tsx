import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';

type PACBioLogoProps = {
  className?: string;
  width?: number;
  height?: number;
};

export default function PACBioLogo({ className, width, height }: PACBioLogoProps) {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white ${className}`}
    >
      <Image
        src="/Logo-W-Text.png"
        alt="Pacific Bio-medical Logo"
        width={width || 204}
        height={height || 60}
      />
    </div>
  );
}

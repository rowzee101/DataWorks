import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';

type PACBioLogoProps = {
  className?: string;
};

export default function PACBioLogo({ className }: PACBioLogoProps) {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white ${className}`}
    >
      <Image
        src="/Logo-W-Text.png"
        alt="Pacific Bio-medical Logo"
        width={204}
        height={60}
      />
    </div>
  );
}

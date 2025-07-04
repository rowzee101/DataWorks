import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';

export default function PACBioLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
        src="/Logo-W-Text.png"
        alt="Pacific Bio-medical Logo"
        width={171}
        height={50}
        className="rotate-[15deg]"
      />
    </div>
  );
}

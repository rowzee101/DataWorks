import { Modal } from '@/app/ui/components/Modal';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Success',
};


export default async function SuccesPage(props: any) {
  const { params } = await props;

  return (
    <Modal>
      <div className="flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Success!</h1>
      </div>
    </Modal>
  );
}
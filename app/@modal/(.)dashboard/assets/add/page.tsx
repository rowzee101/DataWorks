import { Modal } from '@/app/ui/components/Modal';
// import { AddAssetForm } from '@/app/ui/components/AddAssetForm';

export default function AddAssetModal() {
  return (
    <Modal>
      {/* <AddAssetForm /> */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Add New Asset</h2>
      </div>
    </Modal>
  );
}

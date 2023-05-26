import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface Props {
  handleClose: () => void;
  onDelete: () => Promise<void>;
}

const ProductCategoryDeleteWarning: React.FC<Props> = ({
  handleClose,
  onDelete,
}) => {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 w-full h-screen bg-black/50 dark:bg-gray-100/20 z-30">
      <div className="absolute overflow-y-auto top-0 bottom-0 left-0 right-0 m-auto card max-w-md h-[300px] bg-white p-6 sm:p-8 scrollbar grid grid-rows-[1fr_60px]">
        <div className="flex flex-col items-center justify-center">
          <ExclamationTriangleIcon className="w-14 h-14 text-purple-700" />
          <span className="text-center">
            ¿Estás seguro de que deseas eliminar este recurso?
          </span>
        </div>
        <div className="flex gap-4 pt-6">
          <button
            className="text-sm button-outline w-full"
            type="button"
            onClick={handleClose}
          >
            Cancelar
          </button>
          <button
            className="text-sm button w-full"
            onClick={async () => {
              await onDelete();
              handleClose();
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryDeleteWarning;

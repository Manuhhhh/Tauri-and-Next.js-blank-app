type Props = {
  onDeleteTrue: () => void;
  onDeleteFalse: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function DeleteWindow({ onDeleteTrue, onDeleteFalse }: Props) {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center justify-center bg-white border p-4 rounded-md">
              <h1>¿Estás seguro de que quieres eliminar este evento?</h1>
              <div className="flex gap-2 w-full justify-center">
                <button
                  onClick={onDeleteTrue}
                  className="text-white bg-red-500 px-4 py-2 rounded-md"
                >
                  Sí
                </button>
                <button
                  className="text-white bg-blue-500 px-4 py-2 rounded-md"
                  onClick={() => onDeleteFalse(false)}
                >
                  No
                </button>
              </div>
            </div>
  );
}
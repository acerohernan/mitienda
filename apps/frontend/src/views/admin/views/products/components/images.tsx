import {
  CameraIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { nanoid } from "nanoid";
import Image from "next/image";
import { ChangeEvent, RefObject, useRef } from "react";
import useTranslation from "../../../../../i18n/useTranslation";
import { IProductImage } from "../context/types";

interface Props {
  images: Record<string, IProductImage>;
  setImages: React.Dispatch<
    React.SetStateAction<Record<string, IProductImage>>
  >;
}

const ProductImagesForm: React.FC<Props> = ({ images, setImages }) => {
  const { t } = useTranslation();

  const inputRef: RefObject<any> = useRef(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      const id = nanoid();
      setImages({ ...images, [id]: { featured: false, id, url } });
      inputRef.current.value = "";
    }
  }

  function handleDeleteImg(id: string) {
    return () => {
      if (!images[id]) return;

      const {
        [id]: {},
        ...filtered
      } = images;
      setImages(filtered);
    };
  }

  function handleUpdateImg(image: IProductImage) {
    if (!image.id) return;
    setImages({ ...images, [image.id]: image });
  }

  return (
    <div className="flex gap-4">
      <label
        className={`
        p-2 border border-dashed border-slate-400 relative cursor-pointer bg-slate-50 dark:bg-gray-700
        w-40 h-40 rounded-lg block
        ${Object.values(images).length === 4 && "hidden"}
        `}
        htmlFor="product-image-input"
      >
        <div
          className={`flex w-full h-full items-center justify-center flex-col`}
        >
          <CameraIcon className="w-5 h-5 dark:text-white z-10" />
          <span className="dark:text-white text-sm z-10">
            {t("Upload an image")}
          </span>
        </div>
      </label>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="product-image-input"
        onChange={handleFileChange}
        ref={inputRef}
      />
      {Object.values(images).map((img, index) => {
        /* If is the first upload image, is featured */
        if (index === 0) img.featured = true;

        return (
          <ProductImageCard
            key={img.id}
            img={img}
            onDelete={handleDeleteImg(img.id)}
            onUpdate={handleUpdateImg}
          />
        );
      })}
    </div>
  );
};

interface CardProps {
  img: IProductImage;
  onDelete: () => void;
  onUpdate: (image: IProductImage) => void;
}

export const ProductImageCard: React.FC<CardProps> = ({
  img,
  onDelete,
  onUpdate,
}) => {
  const inputRef: RefObject<any> = useRef(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      onUpdate({ id: img.id, featured: false, url });
      inputRef.current.value = "";
    }
  }

  return (
    <div>
      <div
        className={`relative p-2 border border-dashed   bg-slate-50 dark:bg-gray-700
        w-40 h-40 rounded-lg block ${
          img.featured
            ? "border-purple-700 dark:border-purple-500"
            : "border-slate-400"
        }`}
      >
        <Image
          src={img.url}
          alt={img.url}
          width={500}
          height={500}
          className="object-cover w-full h-full"
        />
        {img.featured && (
          <div className="absolute w-full bottom-0 bg-purple-700 dark:bg-purple-500 dark:white right-0 rounded-b-lg text-sm text-white text-center font-medium">
            Featured
          </div>
        )}
      </div>
      <div className="flex justify-center ml-2 mt-2 gap-2">
        <label className="icon-button block cursor-pointer" htmlFor={img.id}>
          <PencilSquareIcon className="icon" />
        </label>
        <button type="button" className="icon-button" onClick={onDelete}>
          <TrashIcon className="icon" />
        </button>
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id={img.id}
        onChange={handleFileChange}
        ref={inputRef}
      />
    </div>
  );
};

export default ProductImagesForm;

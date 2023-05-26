import { CameraIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import useTranslation from "../../i18n/useTranslation";

interface Props {
  id: string;
  rounded?: string;
  width?: number;
  height?: number;
  className?: string;
  defaultUrl?: string;
  onChange: (file: File) => void;
}

const ImageInput: React.FC<Props> = ({
  id,
  height,
  width,
  rounded,
  className,
  defaultUrl,
  onChange,
}) => {
  const { t } = useTranslation();
  const [imgUrl, setImgUrl] = useState<string>(defaultUrl || "");

  function handleImg(event: ChangeEvent<HTMLInputElement>) {
    if (event.target?.files && event.target.files[0]) {
      let file = event.target.files[0];
      setImgUrl(URL.createObjectURL(file));
      onChange(file);
    }
  }

  return (
    <>
      <label
        className={`p-2 border border-dashed inline-block border-slate-400 relative group cursor-pointer ${
          !imgUrl && "bg-slate-50 dark:bg-gray-700"
        } ${rounded || "rounded-full"} ${className}`}
        htmlFor={id}
      >
        {imgUrl ? (
          <div
            className={`z-10 bg-black/30 dark:bg-black/50 w-full h-full absolute top-0 left-0 hidden group-hover:flex items-center justify-center flex-col ${
              rounded || "rounded-full"
            } `}
          >
            <CameraIcon className="w-5 h-5 text-white" />
            <span className="text-white text-sm">{t("Update image")}</span>
          </div>
        ) : null}
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt="profile"
            width={width || 500}
            height={height || 500}
            className={`${
              rounded || "rounded-full"
            } w-full h-full object-cover`}
          />
        ) : (
          <div
            className={`flex w-full h-full items-center justify-center flex-col`}
          >
            <CameraIcon className="w-5 h-5 dark:text-white z-10" />
            <span className="dark:text-white text-sm z-10">
              {t("Upload an image")}
            </span>
          </div>
        )}
        <input
          type="file"
          className="hidden"
          accept="image/*"
          id={id}
          onChange={handleImg}
        />
      </label>
    </>
  );
};

export default ImageInput;

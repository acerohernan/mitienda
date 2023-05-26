import Image from "next/image";
import Link from "next/link";
import { useStoreContext } from "../context";
import { IStoreSocial } from "../types";

interface Props {}

const StoreFooter: React.FC<Props> = () => {
  const {
    state: { store },
  } = useStoreContext();

  const socialKeyArr = Object.keys(store.social) as Array<keyof IStoreSocial>;

  return (
    <div>
      <div className="w-full bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[2fr_1fr] md:py-4">
          <div className="p-6 pt-8 pb-0">
            {store.name ? (
              <>
                <span className="text-2xl font-medium">
                  Acerca de {store.name}
                </span>

                <p className="font-light text-sm mt-2 border-b border-gray-300 md:border-0 pb-8">
                  {store.description || "We made it with love. 💞"}
                </p>
              </>
            ) : (
              <span className="text-2xl font-medium">MiTienda</span>
            )}
          </div>
          <div className="p-6 md:border-l w-full flex md:pl-10">
            <div className="w-full">
              <span className="text-2xl font-medium">¡Contáctanos!</span>
              <div className="flex items-center gap-3">
                {socialKeyArr.map((key: keyof IStoreSocial, i) => {
                  if (key === "id" || key === "store_id" || !store.social[key])
                    return;

                  return (
                    <a
                      href={`http://${key}.com`}
                      target="_blank"
                      rel="noreferrer"
                      key={i}
                    >
                      <Image
                        src={`/icons/social/${key}.svg`}
                        alt={key}
                        width={100}
                        height={100}
                        className="w-9 h-9 mt-3"
                      />
                    </a>
                  );
                })}
              </div>
              <span className="font-light block mt-3">+{store.telephone}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 w-full">
        <div className="max-w-6xl mx-auto p-6">
          <span className="font-light block">
            Crea tu tienda virtual con{" "}
            <Link
              href="/"
              className="hover:underline  font-medium cursor-pointer"
            >
              MiTienda
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default StoreFooter;

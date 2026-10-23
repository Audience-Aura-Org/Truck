import { CategoryInfo } from "@/lib/types";
import { products } from "@/data/products";

const categoryDefinitions: CategoryInfo[] = [
  {
    name: "Double Coin",
    slug: "double-coin",
    description:
      "Double Coin commercial truck tyres for drive, steer, all-position, and trailer applications, including IM105 and RLB800 models.",
    icon: "truck",
    image: "/uploads/double-coin/double-coin-11r22-5-drive-16pr.avif",
  },
  {
    name: "Michelin",
    slug: "michelin",
    description:
      "Michelin commercial steer and trailer tyres, including XZY, X Works Z, XTE2, and X Maxitrailer models.",
    icon: "truck",
    image: "/uploads/michelin/michelin-10r22-5-steer-xzy.png",
  },
];

export const categories = categoryDefinitions.filter((category) =>
  products.some((product) => product.brand === category.name)
);

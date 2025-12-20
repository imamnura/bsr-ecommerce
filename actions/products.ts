"use server";

import prisma from "@/lib/prisma";

export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        store: {
          select: {
            name: true,
            isOpen: true,
            address: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, data: products };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return { success: false, error: "Gagal memuat produk" };
  }
}

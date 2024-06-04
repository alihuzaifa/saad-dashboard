"use server";
import { revalidatePath, unstable_noStore } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import prisma from './db'
import { Section } from '@/types';

export async function imageUpload(formData: FormData) {
    "use server"
    try {
        const imageFile = formData.get("image") as File;
        const supabase: any = createClient()
        const { data: imageData, error } = await supabase.storage
            .from("images")
            .upload(`${imageFile.name}-${new Date().getTime()}`, imageFile, {
                cacheControl: "2592000",
                contentType: "image/png",
            });

        return imageData
    } catch (error) { return "Failed to Create" }

}
export async function saveProduct(values: any) {
    const { name, price, description, section, images, offer } = values
    "use server"
    try {
        const createdProduct = await prisma.product.create({
            data: {
                name,
                description,
                price,
                offer,
                active: true,
                section_id: section,
            }
        });
        const productId = createdProduct.id;
        const savedImages = [];
        for (const image of images) {
            const savedImage = await prisma.productImage.create({
                data: {
                    url: image.path,
                    product_id: productId,
                },
            });

            savedImages.push({ id: savedImage.id, url: image.path, product_id: productId });
        }
        await prisma.product.update({
            where: { id: productId },
            data: { images: { connect: savedImages } },
        });
        revalidatePath('/dashboard/product')
    } catch (error) {
        console.error('Error saving product:', error);
    }
}
export async function addOrRemoveOffer(id: any, offer: boolean) {
    "use server"
    try {
        await prisma.product.update({
            where: { id: id },
            data: { offer },
        });
        revalidatePath("/dashboard/product")
    } catch (error) {
        console.error('Error saving product:', error);
    }

}
export async function getAllProductsWithImages() {
    try {
        const products = await prisma.product.findMany({

            include: {
                section: true,
                images: true,
            },
        });
        return products;
    } catch (error) {
        throw error;
    }
}
export async function getProduct(id: any) {
    try {
        const product = await prisma.product.findFirst({
            where: { id }, include: {
                section: true,
                images: true,
            },
        });
        return product?.images;
    } catch (error) {
        throw error;
    }
}
export async function findProduct(id: any) {
    try {
        const product = await prisma.product.findFirst({
            where: { id }, include: {
                section: true,
                images: true,
            },
        });
        return product;
    } catch (error) {
        throw error;
    }
}
export async function findOtherProduct(id: any) {
    try {
        const product = await prisma.product.findMany({
            where: { id }, include: {
                section: true,
                images: true,
            },
        });
        return product;
    } catch (error) {
        throw error;
    }
}
export async function findUserRole(id: string) {
    try {
        const user = await prisma.user.findFirst({
            where: { userId: id }
        });
        return user?.role;
    } catch (error) {
        throw error;
    }
}
export async function deleteProduct(productId: any, images: any) {
    try {
        for (let index = 0; index < images.length; index++) {
            const element = images[index];
            await prisma.productImage.delete({
                where: { id: element?.id },
            });
        }
        await prisma.product.delete({
            where: { id: productId },
        });
        revalidatePath("/dashboard/product");
    } catch (error) {
        console.error("Error deleting product:", error);
    }
}
export async function getColor() {
    unstable_noStore();
    const data = await prisma.settings.findUnique({ where: { id: 1 } });
    return data;
}
export async function saveSectionData(name: string) {
    "use server"
    await prisma.section.create({
        data: { name }
    })
    return redirect('/dashboard/sections')
}
export async function getSection(): Promise<Section[]> {
    "use server"
    const data = await prisma.section.findMany({
        where: { active: true },
    })
    return data
}
export async function deleteSection(id: number) {
    "use server"
    await prisma.section.delete({
        where: { id: id },
    })
    revalidatePath('/dashboard/sections')
}
export async function products(page: number, limit = 10) {
    const skip = (page - 1) * limit;
    const take = limit;
    try {
        const [products, totalProducts] = await prisma.$transaction([
            prisma.product.findMany({
                where: { offer: false, active: true },
                include: { images: true },
                skip: skip,
                take: take,
            }),
            prisma.product.count({
                where: { offer: false, active: true },
            }),
        ]);
        const remainingCount = totalProducts - (skip + take);
        return {
            products,
            remainingCount: Math.max(0, remainingCount),
        };
    } catch (error) {
        throw error;
    }
}
export async function deleteFaq(id: number) {
    "use server"
    await prisma.faq.delete({ where: { id: id } })
    revalidatePath('/dashboard/faq')
}
export async function createUserQuestion(data: any) {
    "use server"
    await prisma.userQuestion.create({ data: data })
}
export async function getUserQuestion(): Promise<Section[]> {
    "use server"
    const data = await prisma.userQuestion.findMany({})
    return data
}
export async function deleteUserQuestion(id: number) {
    "use server"
    await prisma.userQuestion.delete({ where: { id: id } })
    revalidatePath('/dashboard/userQuestion')
}
export const getSearchProducts = async (
    searchTerm: string,
    sortOrder: string,
) => {
    try {
        const defaultProductCount = 10;
        if (!searchTerm) {
            return [];
        }
        const filter: any = {
            active: true,
            offer: false,
            OR: [
                {
                    name: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                },
                {
                    description: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                },
            ],
        };
        const take = defaultProductCount;
        const products = await prisma.product.findMany({
            where: filter,
            orderBy: [
                {
                    price: sortOrder === 'price-asc' ? 'asc' : 'desc',
                },
            ],
            take,
            include: {
                images: true,
                section: true,
            },
        });
        return products;
    } catch (error) {
        throw new Error('Failed to fetch products');
    }
};
import { categories } from "@/constants/categories"
import { getPayload } from "payload"
import config from '@payload-config'


const seed = async()=>{
    const payload = await getPayload({config});

    for(const category of categories) {
        const parentCategory = await payload.create({
            collection: 'categories',
            data: {
                name: category.name,
                slug: category.slug,
                color: category.color,
                parent: null
            }
        })
        for (const subCategory of category.subcategories||[]) {
            await payload.create({
              collection: "categories",
              data: {
                name: subCategory.name,
                slug: subCategory.slug,
                parent: parentCategory.id,
              },
            });
        }
    }
}
await seed();

process.exit(0)
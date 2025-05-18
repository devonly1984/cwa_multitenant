import { categories } from "@/constants/categories.constants"
import { getPayload } from "payload"
import config from '@payload-config'


const seed = async()=>{
  const payload = await getPayload({ config });
  //create admin Tenant

  const adminTenant = await payload.create({
    collection: "tenants",
    data: {
      name: "admin",
      slug: "admin",
      stripeAccountId: "admin",
    },
  });
  //create admin user
  await payload.create({
    collection: "users",
    data: {
      email: "admin@demo.com",
      password: "admin",
      roles: ["super-admin"],
      username: "admin",
      tenants: [
        {
          tenant: adminTenant.id,
        },
      ],
    },
  });

  //seed categories
  for (const category of categories) {
    const parentCategory = await payload.create({
      collection: "categories",
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color,
        parent: null,
      },
    });
    for (const subCategory of category.subcategories || []) {
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
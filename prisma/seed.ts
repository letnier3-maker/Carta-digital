import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Limpiar datos previos
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.restaurant.deleteMany()
  await prisma.user.deleteMany()

  // Crear usuario administrador
  const user = await prisma.user.create({
    data: {
      email: 'admin@restaurante.com',
      password: 'password123',
      name: 'Carlos Chef',
    },
  })

  // Crear restaurante con categorías y productos reales
  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'Mi Restaurante Gourmet',
      slug: 'mi-restaurante',
      description: 'La mejor comida artesanal de la ciudad',
      userId: user.id,
      categories: {
        create: [
          {
            name: 'Hamburguesas',
            products: {
              create: [
                { name: 'Hamburguesa Doble Queso', price: 14.50, description: 'Doble carne de res, cheddar fundido y tocino.' },
                { name: 'Hamburguesa Veggie', price: 11.00, description: 'Medallón de garbanzos y aguacate fresco.' },
              ],
            },
          },
          {
            name: 'Bebidas',
            products: {
              create: [
                { name: 'Limonada de Coco', price: 4.00, description: 'Refrescante combinación de coco y limón.' },
                { name: 'Cerveza Artesanal', price: 5.50, description: 'IPA local bien fría.' },
              ],
            },
          },
        ],
      },
    },
  })

  console.log('✅ Base de datos poblada exitosamente para:', restaurant.name)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

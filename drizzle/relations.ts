import { relations } from "drizzle-orm/relations";
import { users, accounts, addresses, carts, guests, cartItems, productVariants, products, colors, sizes, categories, genders, brands, productCollections, collections, productImages, sessions, reviews, orders, orderItems, payments, wishlists } from "./schema";

export const accountsRelations = relations(accounts, ({one}) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	accounts: many(accounts),
	addresses: many(addresses),
	carts: many(carts),
	sessions: many(sessions),
	reviews: many(reviews),
	orders: many(orders),
	wishlists: many(wishlists),
}));

export const addressesRelations = relations(addresses, ({one, many}) => ({
	user: one(users, {
		fields: [addresses.userId],
		references: [users.id]
	}),
	orders_shippingAddressId: many(orders, {
		relationName: "orders_shippingAddressId_addresses_id"
	}),
	orders_billingAddressId: many(orders, {
		relationName: "orders_billingAddressId_addresses_id"
	}),
}));

export const cartsRelations = relations(carts, ({one, many}) => ({
	user: one(users, {
		fields: [carts.userId],
		references: [users.id]
	}),
	guest: one(guests, {
		fields: [carts.guestId],
		references: [guests.id]
	}),
	cartItems: many(cartItems),
}));

export const guestsRelations = relations(guests, ({many}) => ({
	carts: many(carts),
}));

export const cartItemsRelations = relations(cartItems, ({one}) => ({
	cart: one(carts, {
		fields: [cartItems.cartId],
		references: [carts.id]
	}),
	productVariant: one(productVariants, {
		fields: [cartItems.productVariantId],
		references: [productVariants.id]
	}),
}));

export const productVariantsRelations = relations(productVariants, ({one, many}) => ({
	cartItems: many(cartItems),
	product: one(products, {
		fields: [productVariants.productId],
		references: [products.id]
	}),
	color: one(colors, {
		fields: [productVariants.colorId],
		references: [colors.id]
	}),
	size: one(sizes, {
		fields: [productVariants.sizeId],
		references: [sizes.id]
	}),
	productImages: many(productImages),
	orderItems: many(orderItems),
}));

export const productsRelations = relations(products, ({one, many}) => ({
	productVariants: many(productVariants),
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.id]
	}),
	gender: one(genders, {
		fields: [products.genderId],
		references: [genders.id]
	}),
	brand: one(brands, {
		fields: [products.brandId],
		references: [brands.id]
	}),
	productCollections: many(productCollections),
	productImages: many(productImages),
	reviews: many(reviews),
	wishlists: many(wishlists),
}));

export const colorsRelations = relations(colors, ({many}) => ({
	productVariants: many(productVariants),
}));

export const sizesRelations = relations(sizes, ({many}) => ({
	productVariants: many(productVariants),
}));

export const categoriesRelations = relations(categories, ({one, many}) => ({
	category: one(categories, {
		fields: [categories.parentId],
		references: [categories.id],
		relationName: "categories_parentId_categories_id"
	}),
	categories: many(categories, {
		relationName: "categories_parentId_categories_id"
	}),
	products: many(products),
}));

export const gendersRelations = relations(genders, ({many}) => ({
	products: many(products),
}));

export const brandsRelations = relations(brands, ({many}) => ({
	products: many(products),
}));

export const productCollectionsRelations = relations(productCollections, ({one}) => ({
	product: one(products, {
		fields: [productCollections.productId],
		references: [products.id]
	}),
	collection: one(collections, {
		fields: [productCollections.collectionId],
		references: [collections.id]
	}),
}));

export const collectionsRelations = relations(collections, ({many}) => ({
	productCollections: many(productCollections),
}));

export const productImagesRelations = relations(productImages, ({one}) => ({
	product: one(products, {
		fields: [productImages.productId],
		references: [products.id]
	}),
	productVariant: one(productVariants, {
		fields: [productImages.variantId],
		references: [productVariants.id]
	}),
}));

export const sessionsRelations = relations(sessions, ({one}) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	}),
}));

export const reviewsRelations = relations(reviews, ({one}) => ({
	product: one(products, {
		fields: [reviews.productId],
		references: [products.id]
	}),
	user: one(users, {
		fields: [reviews.userId],
		references: [users.id]
	}),
}));

export const ordersRelations = relations(orders, ({one, many}) => ({
	user: one(users, {
		fields: [orders.userId],
		references: [users.id]
	}),
	address_shippingAddressId: one(addresses, {
		fields: [orders.shippingAddressId],
		references: [addresses.id],
		relationName: "orders_shippingAddressId_addresses_id"
	}),
	address_billingAddressId: one(addresses, {
		fields: [orders.billingAddressId],
		references: [addresses.id],
		relationName: "orders_billingAddressId_addresses_id"
	}),
	orderItems: many(orderItems),
	payments: many(payments),
}));

export const orderItemsRelations = relations(orderItems, ({one}) => ({
	order: one(orders, {
		fields: [orderItems.orderId],
		references: [orders.id]
	}),
	productVariant: one(productVariants, {
		fields: [orderItems.productVariantId],
		references: [productVariants.id]
	}),
}));

export const paymentsRelations = relations(payments, ({one}) => ({
	order: one(orders, {
		fields: [payments.orderId],
		references: [orders.id]
	}),
}));

export const wishlistsRelations = relations(wishlists, ({one}) => ({
	user: one(users, {
		fields: [wishlists.userId],
		references: [users.id]
	}),
	product: one(products, {
		fields: [wishlists.productId],
		references: [products.id]
	}),
}));
import useCartStore from './useCartStore';
const useCart = (tenantSlug:string)=>{
    const {
      getCartByTenant,
      addProduct,
      removeProduct,
      clearAllCarts,
      clearCart,
    } = useCartStore();
    const productIds = getCartByTenant(tenantSlug);

    const toggleProducts = (productId:string)=>{
        if (productIds.includes(productId)) {
            removeProduct(tenantSlug,productId)
        } else {
            addProduct(tenantSlug, productId);
        }
    }
    const isProductInCart =(productId:string)=>{
        return productIds.includes(productId)
    }
    const clearTenantCart = ()=>{
        clearCart(tenantSlug);
    }
    return {
      productIds,
      addProduct: (productId: string) => addProduct(tenantSlug, productId),
      removeProduct: (productId: string) =>
        removeProduct(tenantSlug, productId),
      clearCart: clearTenantCart,
      clearAllCarts,
      toggleProducts,
      isProductInCart,
      totalItems: productIds.length,
    };
}
export default useCart;
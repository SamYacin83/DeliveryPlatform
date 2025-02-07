import axiosManager, { ServiceAPI } from '../axiosManager';
import { BackendProduct } from '../Interfaces/Product';

const queryKey = 'product';

const getProductById = async (id: string | undefined) => {
    if (!id) return null;
    
    const axios = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
    const response = await axios.get<BackendProduct>(`GetProduct`,
        {
            params: {
                productId: id
            }
        }
    );
    const { data } = response;

    return {
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.priceAmount,
        quantity: data.stockQuantity,
        categoryId: data.categoryId,
        category: {
            categoryId: data.categoryId,
            name: data.nameCategory,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        imageUrl: data.pictureUrl,
        createdAt: new Date(),
        updatedAt: new Date()
    };
};

export const queryOptionsGetProductById = (id: string | undefined) => ({
    queryKey: [queryKey, id],
    queryFn: () => getProductById(id),
    enabled: !!id
});
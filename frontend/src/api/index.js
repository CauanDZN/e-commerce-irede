const baseUrl = 'http://localhost:3000';

export const api = {
    get: {
        Products: async () => {
            try {
                const response = await fetch(`${baseUrl}/products`);
                if (!response.ok) {
                    throw new Error('Não foi possível obter os produtos');
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(error);
            }
        },

        Categories: async () => {
            try {
                const response = await fetch(`${baseUrl}/products/categories`);
                if (!response.ok) {
                    throw new Error('Não foi possível obter as categorias');
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(error);
            }
        },
    },
}
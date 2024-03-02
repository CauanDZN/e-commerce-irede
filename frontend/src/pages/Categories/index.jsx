import React, { useState, useEffect } from 'react';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:3000/products/categories')
        .then((response) => response.json())
        .then((data) => setCategories(data));
    }, []);
    
    return (
        <div>
        <h1>Categorias</h1>
        <ul>
            {categories.map((category) => {
                <li key={category.id}>{category.nome}</li>
            })}
        </ul>
        </div>
    );
}

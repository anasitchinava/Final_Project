import Link from "next/link";

const ProductItem = ({ product }) => {
    return (
        <div className="border border-gray-200 rounded p-6 relative">
            <div style={{ height: '200px' }}>
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </div>
            <p className="text-lg font-semibold mt-2">{product.title}</p>
            <p className="text-sm text-gray-500">{product.category}</p>
            <p className="text-sm">Price: ${product.price}</p>
            <div className="flex justify-center absolute top-0 left-0 right-0">
                <Link href={`/products/${product.id}`} className="text-teal-800 hover:underline">View in Detail</Link>
            </div>
        </div>
    );
};

export default ProductItem;
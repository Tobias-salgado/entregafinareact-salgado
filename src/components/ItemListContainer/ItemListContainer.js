import { useState, useEffect } from 'react'
import { getDocs, collection, query, where } from 'firebase/firestore'
import Itemlist from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import { db } from '../../services/firebase/firebaseConfig'


const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);

    const { categoryId } = useParams();


    useEffect(() => {
        const myProduct = categoryId ? query(collection(db, 'Products'), where('category', '==', categoryId)) : collection(db, 'Products')

        getDocs(myProduct)
        .then(res => {
            const newProd = res.docs.map(doc => {
                const data = doc.data()
                return {id: doc.id, ...data}
            })
            setProducts(newProd)
        })
        .catch(error => {
            console.log(error)
        })
    }, [categoryId])

    return (
        <div>
            <h1>{greeting}</h1>
            <Itemlist products={products}/>
        </div>
    )
}
export default ItemListContainer
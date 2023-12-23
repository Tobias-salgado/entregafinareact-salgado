import './ItemDetailContainer.css'
import { useState, useEffect } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom'
import { db } from '../../services/firebase/firebaseConfig'


const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null)

    const { itemId } = useParams()

    useEffect(() => {


        const docRef = doc(db, 'Products', itemId)

        getDoc(docRef)
            .then(response => {
                const data = response.data()
                const productsAdapted = { id: response.id, ...data}
                setProduct(productsAdapted)
            })
            .catch(error => {
                console.log(error)
            })
    }, [itemId])

    return(
        <div>
            <ItemDetail {...product} />
        </div>
    )
}

export default ItemDetailContainer
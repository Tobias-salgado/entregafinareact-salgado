import "./Checkout.css";
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { db } from "../../services/firebase/firebaseConfig";
import { collection, addDoc, getDoc, updateDoc, doc } from "firebase/firestore";


const CheckOut = () => {
    const { cart, total, clearCart } = useContext(CartContext)
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmation, setEmailConfirmation] = useState("");
    const [error, setError] = useState('');
    const [ordenId, setOrdenID] = useState("");

    const Form = (event) => {
        event.preventDefault();

        if (!name || !lastName || !phone || !email || !emailConfirmation) {
            setError("Por favor rellene todos los campos");
            return;
        }

        if (email !== emailConfirmation) {
            setError("Los correos no coinciden");
            return;
        }

        const orden = {
            items: cart.map((Products) => ({
                id: Products.item.id,
                name: Products.item.name,
                quantity: Products.quantity,
            })),

            total: cart.reduce(
                (total, Products) => total + Products.item.price * Products.quantity, 0
            ),

            name,
            lastName,
            phone,
            email,
            fecha: new Date(),
        };


        Promise.all(
            orden.items.map(async (orderProduct) => {
                const productRef = doc(db, 'Products', orderProduct.id);
                const productDoc = await getDoc(productRef);
                const livequantity = productDoc.data().stock
                await updateDoc(productRef, {
                    stock: livequantity - orderProduct.quantity,
                });
            })
        )

            .then(() => {
                addDoc(collection(db, 'Orders'), orden)
                    .then((docRef) => {
                        setOrdenID(docRef.id)
                        clearCart();
                    })
                    .catch((error) => {
                        console.error("error al crear orden", error);
                        setError("Se ha producido un error al crear orden")
                    });
            })
            .catch((error) => {
                console.error("error al actualizar el quantity");
                setError("Ha ocurrido un error al actualizar los productos, intentelo mas tarde")
            });
    };

    return (
        <div>
            <h2>CheckOut</h2>
            <form onSubmit={Form} className="formulario">
                {cart.map((Products) => (
                    <div key={Products.item.id}>
                        <p>
                            {Products.item.name} x {Products.quantity}
                        </p>
                        <p>
                            price $: {Products.item.price}
                        </p>
                        <hr />
                    </div>
                ))}
                <p>Total compra: {total}</p>
                <hr />

                <div className="form-group">
                    <label htmlFor=""> Nombre </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Apellido </label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Telefono </label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Correo </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Confirmacion de correo</label>
                    <input type="email" value={emailConfirmation} onChange={(e) => setEmailConfirmation(e.target.value)} />
                </div>

                {error && <p style={{ color: "red" }}> {error} </p>}
                <button className="button" type="submit"> Finalizar Compra </button>
            </form>
            {ordenId && (
                <strong>Muchas gracias por su compra {ordenId} {" "}</strong>
            )}

        </div>
    )


}


export default CheckOut
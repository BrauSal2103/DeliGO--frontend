import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Bienvenida = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
            <div className="w-3/4 flex flex-row items-center justify-between px-16 py-12 bg-gradient-to-br from-purple-100 to-purple-300 rounded-2xl shadow-lg">
                {/* Texto y botón*/}
                <div className="w-1/2 flex flex-col items-center justify-center pr-8 text-center">
                    <h1 className="text-4xl font-bold text-orange-800 mb-4">¡Bienvenido a DeliGO!</h1>
                    <h2 className="text-xl font-bold text-yellow-600 mb-4">Tu delivery favorito, al instante.</h2>
                    <p className="text-gray-600 mb-2">Descubre los mejores restaurantes, pide tus platos favoritos y recíbelos en la puerta de tu casa.</p>
                    <p className="text-gray-600 mb-2">Con DeliGO, la comida deliciosa está a solo un clic de distancia.</p>
                    <p className="text-gray-600 mb-6">¡Comienza tu experiencia gastronómica ahora!</p>
                    <Button variant="contained" component={Link} to={"/login"} style={{backgroundColor: "#e65100"}}>Empezar ahora</Button>
                </div>

                {/* Imagen */}
                <div className="w-1/2 flex justify-end">
                    <img
                        src="src/assets/delivery.gif"
                        alt="Delivery illustration"
                        className="max-w-full h-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default Bienvenida;

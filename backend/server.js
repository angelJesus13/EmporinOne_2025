import express from 'express';
import mongoose from 'mongoose';        
import cors from 'cors'
import dotenv from 'dotenv';
import tramitesRoutes from './routes/tramites.js';


dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tramites',tramitesRoutes)
    mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Conectado a MongoDB');
    
}).catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
});
app.listen(process.env.PORT || 3001, () => {
        console.log(`Servidor corriendo en el puerto ${process.env.PORT || 5000}`);
    });
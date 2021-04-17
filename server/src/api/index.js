import { Router } from 'express';
import authRoutes from "../api/routes/auth"
import userRoutes from "../api/routes/user"

export default () => {
	const app = Router();
	app.use('/auth', authRoutes());
	app.use('/user', userRoutes());
	return app
}
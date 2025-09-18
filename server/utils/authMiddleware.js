import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'dev_secret_change_me';

// rolesAllowed: array of roles, or undefined for any authenticated user
export default function auth(rolesAllowed) {
	return function authenticate(req, res, next) {
		const authHeader = req.headers.authorization || '';
		const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
		if (!token) {
			return res.status(401).json({ error: 'Authorization token missing' });
		}
		try {
			const payload = jwt.verify(token, jwtSecret);
			req.userId = payload.sub;
			req.userRoles = payload.roles || [];
			if (Array.isArray(rolesAllowed) && rolesAllowed.length > 0) {
				const hasRole = req.userRoles.some((r) => rolesAllowed.includes(r));
				if (!hasRole) return res.status(403).json({ error: 'Forbidden' });
			}
			return next();
		} catch (_err) {
			return res.status(401).json({ error: 'Invalid or expired token' });
		}
	};
}



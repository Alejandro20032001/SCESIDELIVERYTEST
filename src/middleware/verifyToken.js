import { verify } from '../services/jwtService';

const mdJWT = (req, res, next) => {
    const token = req.get('X-Token')
    if (token)
        verify(token)
            .then(decoded => {
                decoded._id
                next()
            })
            .catch(err => {
                if (err.name === 'TokenExpiredError')
                    res.status(401).json({ msg: err.message })
                else
                    res.status(401).json({ msg: 'Invalid token' })
            })
    else {
        res.send(401).json({ msg: 'Invalid token' })
    }
}

export { mdJWT }
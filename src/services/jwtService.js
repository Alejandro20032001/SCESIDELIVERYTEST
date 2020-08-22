import jwt from 'jsonwebtoken'
import { SECRET as secret } from '../env'

const minutes = 180;//espacio borrado
const sign = (payload) => {
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * minutes),
        data: payload
    }, secret)

    return Promise.resolve(token)
}

const verify = (token) => {
    let decoded
    try {
        decoded = jwt.verify(token, secret)
    } catch (err) {
        decoded = err
        console.warn('Token Service:', err)
        return Promise.reject(err)
    }

    return Promise.resolve(decoded)
}

const decode = (token) => {
    return Promise.resolve(jwt.decode(token, secret))
}

export { sign, verify, decode }

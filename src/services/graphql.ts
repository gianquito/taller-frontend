import { userType } from '@/types/user'

export const getUser = async (id_session: string): Promise<userType | undefined> => {
    const request = await fetch('http://127.0.0.1:5000/graphql', {
        method: 'POST',
        body: JSON.stringify({
            query: `{ sesiones(idSesion:"${id_session}"){ usuario{ idUsuario, nombre, apellido, email, imagen, rol, idCarrito} }}`,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await request.json()
    if (!data.data.sesiones[0]) return undefined
    return data.data.sesiones[0].usuario
}

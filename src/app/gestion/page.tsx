import AdminFormGestion from '@/components/AdminFormGestion'
import ClientNavigator from '@/components/ClientNavigator'
import GestionCards from '@/components/GestionCards'
import TablaLibroGestion from '@/components/TablaLibrosGestion'
import TablaPedidosGestion from '@/components/TablaPedidosGestion'
import TablaPromocionesGestion from '@/components/TablaPromocionesGestion'
import { getUsers } from '@/services/graphql'
import { getSsrUser } from '@/ssrUtils'

export const dynamic = 'force-dynamic'

export default async function Gestion() {
    const user = await getSsrUser()

    if (!user || user.rol !== 1) return <ClientNavigator route="/" />

    const users = await getUsers(user.sessionId)
    return (
        <div>
            <div>
                <GestionCards sessionId={user.sessionId} users={users} />
            </div>
            <TablaPedidosGestion sessionId={user.sessionId} />
            <TablaLibroGestion sessionId={user.sessionId} />
            <TablaPromocionesGestion />
            <AdminFormGestion users={users} />
        </div>
    )
}

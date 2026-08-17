import RencanaSection from '../display/RencanaSection'
import { getHomeRencana } from './getHomePageData'

export default async function HomeRencana() {
  const data = await getHomeRencana()

  return (
    <div className="flex mt-8">
      <RencanaSection data={data} />
    </div>
  )
}

import DisyorkanSection from '../display/DisyorkanSection'
import { getHomeDisyorkan } from './getHomePageData'

export default async function HomeDisyorkan() {
  const data = await getHomeDisyorkan()

  return (
    <div className="flex mt-8">
      <DisyorkanSection data={data} />
    </div>
  )
}

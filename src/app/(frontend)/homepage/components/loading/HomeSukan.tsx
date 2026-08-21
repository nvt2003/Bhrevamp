import SukanSection from '../display/SukanSection'
import { getHomeSukan } from './getHomePageData'

export default async function HomeSukan() {
  const data = await getHomeSukan()

  return (
    <div className="flex mt-8">
      <SukanSection data={data} />
    </div>
  )
}

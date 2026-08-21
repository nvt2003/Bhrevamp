import BhTvSection from '../display/BhTvSection'
import { getHomeBhTv } from './getHomePageData'

export default async function HomeBhT() {
  const data = await getHomeBhTv()

  return (
    <div className="flex mt-8">
      <BhTvSection data={data} />
    </div>
  )
}

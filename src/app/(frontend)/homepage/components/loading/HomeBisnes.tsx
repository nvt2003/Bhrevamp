import BisnesSection from '../display/BisnesSection'
import { getHomeBisnes } from './getHomePageData'

export default async function HomeBisnes() {
  const data = await getHomeBisnes()

  return <BisnesSection data={data} />
}

import BhPlusSection from '../display/BhPlusSection'
import { getHomeBhPlus } from './getHomePageData'

export default async function HomeBhPlus() {
  const data = await getHomeBhPlus()

  return <BhPlusSection data={data} />
}

import SihatSection from '../display/SihatSection'
import { getHomeSihat } from './getHomePageData'

export default async function HomeSihat() {
  const data = await getHomeSihat()

  return <SihatSection data={data} />
}

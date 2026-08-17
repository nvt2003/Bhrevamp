import HiburanSection from '../display/HiburanSection'
import { getHomeHiburan } from './getHomePageData'

export default async function HomeHiburan() {
  const data = await getHomeHiburan()

  return <HiburanSection data={data} />
}

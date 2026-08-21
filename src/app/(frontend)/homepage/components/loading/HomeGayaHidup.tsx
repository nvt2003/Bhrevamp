import GayaHidupSection from '../display/GayaHidupSection'
import { getHomeGayaHidup } from './getHomePageData'

export default async function HomeGayaHidup() {
  const data = await getHomeGayaHidup()

  return <GayaHidupSection data={data} />
}

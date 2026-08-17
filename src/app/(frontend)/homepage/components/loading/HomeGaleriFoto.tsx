import GaleriFotoSection from '../display/GaleriFotoSection'
import { getHomeGaleriFoto } from './getHomePageData'

export default async function HomeGaleriFoto() {
  const data = await getHomeGaleriFoto()

  return <GaleriFotoSection data={data} />
}

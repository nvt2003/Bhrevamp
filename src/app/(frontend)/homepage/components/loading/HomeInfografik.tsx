import InfografikSection from '../display/InfografikSection'
import { getHomeInfografik } from './getHomePageData'

export default async function HomeInfografik() {
  const data = await getHomeInfografik()

  return <InfografikSection data={data} />
}

import DuniaSection from '../display/DuniaSection'
import { getHomeDunia } from './getHomePageData'

export default async function HomeDunia() {
  const data = await getHomeDunia()

  return <DuniaSection data={data} />
}

import VideoTerkiniSection from '../display/VideoTerkiniSection'
import { getHomeVideoTerkini } from './getHomePageData'

export default async function HomeVideoTerkin() {
  const data = await getHomeVideoTerkini()

  return (
    <div className="flex mt-8">
      <VideoTerkiniSection data={data} />
    </div>
  )
}

import PodcastSection from '../display/PodcastSection'
import { getHomePodcast } from './getHomePageData'

export default async function HomePodcast() {
  const data = await getHomePodcast()

  return <PodcastSection data={data} />
}

// components/MeasureServer.tsx
export async function MeasureServer({
  name,
  children,
}: {
  name: string
  children: Promise<React.ReactNode> | React.ReactNode
}) {
  const start = performance.now()
  const resolvedChildren = await children
  const end = performance.now()

  console.log(`[Server Render/Fetch] <${name} /> mất: ${(end - start).toFixed(2)} ms`)

  return <>{resolvedChildren}</>
}

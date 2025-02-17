'use client'

import { useState, useEffect } from 'react'
import { NeoDBView } from './neodb-view'

interface NeoDBProps {
  url: string
}

interface NeoDBManualProps {
  url: string
  image: string
  title: string
  rate: string
  brief: string
  tag: string
}

interface NeoDBData {
  title: string
  cover_image_url: string
  brief: string
  rating: number
  category: string
}

export function NeoDB({ url }: NeoDBProps) {
  const [data, setData] = useState<NeoDBData | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl: string

        // 检查是否是 neodb.social 的链接
        if (url.match(/^.*neodb\.social\/.*/)) {
          // 提取路径部分
          const path = url.replace(/.*neodb.social\/(.*)/, '$1')
          apiUrl = `https://neodb.social/api/${path}`
        } else {
          // 外部链接使用 catalog/fetch
          apiUrl = `https://neodb.social/api/catalog/fetch?url=${encodeURIComponent(url)}`
        }

        const response = await fetch(apiUrl)
        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`)
        }
        const data = await response.json()
        setData(data)
      } catch (err) {
        console.error('Failed to fetch NeoDB data:', err)
        setError(true)
      }
    }
    fetchData()
  }, [url])

  if (error) {
    return (
      <p className="text-center">
        <small>远程获取内容失败，请检查 API 有效性。</small>
      </p>
    )
  }

  if (!data) return null

  return (
    <NeoDBView
      url={url}
      coverImage={data.cover_image_url}
      title={data.title}
      rating={data.rating}
      brief={data.brief}
      category={data.category}
    />
  )
}

export function NeoDBManual({ url, image, title, rate, brief, tag }: NeoDBManualProps) {
  return (
    <NeoDBView
      url={url}
      coverImage={image}
      title={title}
      rating={Number(rate)}
      brief={brief}
      category={tag}
    />
  )
}

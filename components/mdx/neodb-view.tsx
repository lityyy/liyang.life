import Image from 'next/image'

// 星星背景的 base64 编码
const STAR_EMPTY =
  'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOTA4LjEgMzUzLjFsLTI1My45LTM2LjljLTUuMy0uOC0xMC4yLTMuOS0xMy4yLTguNGwtMTEzLjYtMjMwLjRjLTcuNC0xNS0yOS45LTE1LTM3LjMgMGwtMTEzLjYgMjMwLjRjLTMgNC41LTcuOSA3LjYtMTMuMiA4LjRMMTA5LjQgMzUzLjFjLTE2LjUgMi40LTIzLjEgMjIuNy0xMS4yIDM0LjNsMTgzLjcgMTc5LjFjNC4zIDQuMiA2LjMgMTAuMiA1LjIgMTYuMWwtNDMuNCAyNTIuOWMtMi44IDE2LjQgMTQuNCAyOSAyOS4xIDIxLjJsMjI3LjEtMTE5LjRjNS4yLTIuNyAxMS40LTIuNyAxNi42IDBsMjI3LjEgMTE5LjRjMTQuNyA3LjcgMzEuOS00LjggMjkuMS0yMS4ybC00My40LTI1Mi45Yy0xLjEtNS45LjktMTEuOSA1LjItMTYuMWwxODMuNy0xNzkuMWMxMS45LTExLjYgNS4zLTMxLjktMTEuMi0zNC4zeiIgZmlsbD0iI2VlZWVlZSIvPjwvc3ZnPg=='
const STAR_FULL =
  'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOTA4LjEgMzUzLjFsLTI1My45LTM2LjljLTUuMy0uOC0xMC4yLTMuOS0xMy4yLTguNGwtMTEzLjYtMjMwLjRjLTcuNC0xNS0yOS45LTE1LTM3LjMgMGwtMTEzLjYgMjMwLjRjLTMgNC41LTcuOSA3LjYtMTMuMiA4LjRMMTA5LjQgMzUzLjFjLTE2LjUgMi40LTIzLjEgMjIuNy0xMS4yIDM0LjNsMTgzLjcgMTc5LjFjNC4zIDQuMiA2LjMgMTAuMiA1LjIgMTYuMWwtNDMuNCAyNTIuOWMtMi44IDE2LjQgMTQuNCAyOSAyOS4xIDIxLjJsMjI3LjEtMTE5LjRjNS4yLTIuNyAxMS40LTIuNyAxNi42IDBsMjI3LjEgMTE5LjRjMTQuNyA3LjcgMzEuOS00LjggMjkuMS0yMS4ybC00My40LTI1Mi45Yy0xLjEtNS45LjktMTEuOSA1LjItMTYuMWwxODMuNy0xNzkuMWMxMS45LTExLjYgNS4zLTMxLjktMTEuMi0zNC4zeiIgZmlsbD0iI2Y5OWIwMSIvPjwvc3ZnPg=='

interface NeoDBViewProps {
  url: string
  coverImage: string
  title: string
  rating?: number
  brief: string
  category: string
  showRating?: boolean
}

export function NeoDBView({
  url,
  coverImage,
  title,
  rating,
  brief,
  category,
  showRating = true,
}: NeoDBViewProps) {
  const formattedTitle = title.startsWith('「') ? title : `「${title}」`

  return (
    <div className="bg-card mx-12 my-8 rounded-lg shadow-[0_5px_15px_rgba(0,0,0,0.1)] transition-shadow duration-200 hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)]">
      <div className="relative flex p-3">
        <div className="mr-4 w-[100px] flex-shrink-0">
          <Image
            src={coverImage}
            alt={title}
            width={100}
            height={150}
            className="rounded object-cover"
            unoptimized
          />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="relative z-10 mb-1">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="text-base text-[#7AA874] no-underline transition-colors duration-200"
            >
              {formattedTitle}
            </a>
          </div>
          {showRating && (
            <div className="mb-1 flex items-center">
              {rating !== undefined && (
                <>
                  <div className="relative mr-2 h-4 w-20 bg-[url('data:image/svg+xml;base64,PHN2Z...')]">
                    <div
                      className="absolute left-0 h-4 bg-[url('data:image/svg+xml;base64,PHN2Z...')]"
                      style={{ width: `${rating * 10}%` }}
                    />
                  </div>
                  <span className="text-sm">{rating}</span>
                </>
              )}
            </div>
          )}
          <div
            className="relative z-0 max-h-[120px] overflow-y-auto text-sm text-gray-600"
            style={{
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {brief}
          </div>
        </div>
        <div className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-[#7AA874] px-2 py-0.5 text-sm italic text-white">
          {category}
        </div>
      </div>
    </div>
  )
}

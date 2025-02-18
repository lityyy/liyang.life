'use client'

import { Clock, Map } from 'lucide-react'
import { useEffect, useState } from 'react'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Link } from '~/components/ui/link'
import { Twemoji } from '~/components/ui/twemoji'
import { AUTHOR_INFO } from '~/data/author-info'

const TIME_IS = 'https://time.is/Beijing'
const MY_TIMEZONE = 'Asia/Shanghai'
const MY_TIMEZONE_OFFSET = AUTHOR_INFO.address.timeZone * -60

function getTime() {
  const date = new Date()
  const visitorTimezoneOffset = date.getTimezoneOffset()
  const hoursDiff = (visitorTimezoneOffset - MY_TIMEZONE_OFFSET) / 60
  const diff =
    hoursDiff === 0
      ? 'same time'
      : hoursDiff > 0
        ? `${hoursDiff}h ahead`
        : `${hoursDiff * -1}h behind`

  const time = new Intl.DateTimeFormat('en-US', {
    timeZone: MY_TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)

  return { time, diff }
}

export function AddressAndTime() {
  const [timeData, setTimeData] = useState({ time: '', diff: '' })

  useEffect(() => {
    // 初始化时间
    setTimeData(getTime())

    // 每分钟更新一次时间
    const timer = setInterval(() => {
      setTimeData(getTime())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-2 py-1.5 text-gray-800 dark:text-gray-200">
      <div className="flex items-center gap-2">
        <Map className="h-5 w-5" />
        <span className="font-medium">
          {AUTHOR_INFO.address.city}
          {AUTHOR_INFO.address.flag && (
            <>
              , <Twemoji emoji={AUTHOR_INFO.address.flag} className="!h-4.5" />
            </>
          )}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5" />
        {timeData.time && (
          <Link href={TIME_IS}>
            <GrowingUnderline className="font-medium" data-umami-event="footer-time">
              {timeData.time}{' '}
              <span className="text-gray-500 dark:text-gray-400">({timeData.diff})</span>
            </GrowingUnderline>
          </Link>
        )}
      </div>
    </div>
  )
}

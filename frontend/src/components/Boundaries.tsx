import { Search, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface NotFoundProps {
  title?: string
  description?: string
}

export function Illustration({
  className,
  type,
}: {
  className: string
  type: 'error' | 'not-found'
}) {
  switch (type) {
    case 'not-found':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 362 145"
          className={className}
        >
          <path
            fill="currentColor"
            d="M62.6 142c-2.133 0-3.2-1.067-3.2-3.2V118h-56c-2 0-3-1-3-3V92.8c0-1.333.4-2.733 1.2-4.2L58.2 4c.8-1.333 2.067-2 3.8-2h28c2 0 3 1 3 3v85.4h11.2c.933 0 1.733.333 2.4 1 .667.533 1 1.267 1 2.2v21.2c0 .933-.333 1.733-1 2.4-.667.533-1.467.8-2.4.8H93v20.8c0 2.133-1.067 3.2-3.2 3.2H62.6zM33 90.4h26.4V51.2L33 90.4zM181.67 144.6c-7.333 0-14.333-1.333-21-4-6.666-2.667-12.866-6.733-18.6-12.2-5.733-5.467-10.266-13-13.6-22.6-3.333-9.6-5-20.667-5-33.2 0-12.533 1.667-23.6 5-33.2 3.334-9.6 7.867-17.133 13.6-22.6 5.734-5.467 11.934-9.533 18.6-12.2 6.667-2.8 13.667-4.2 21-4.2 7.467 0 14.534 1.4 21.2 4.2 6.667 2.667 12.8 6.733 18.4 12.2 5.734 5.467 10.267 13 13.6 22.6 3.334 9.6 5 20.667 5 33.2 0 12.533-1.666 23.6-5 33.2-3.333 9.6-7.866 17.133-13.6 22.6-5.6 5.467-11.733 9.533-18.4 12.2-6.666 2.667-13.733 4-21.2 4zm0-31c9.067 0 15.6-3.733 19.6-11.2 4.134-7.6 6.2-17.533 6.2-29.8s-2.066-22.2-6.2-29.8c-4.133-7.6-10.666-11.4-19.6-11.4-8.933 0-15.466 3.8-19.6 11.4-4 7.6-6 17.533-6 29.8s2 22.2 6 29.8c4.134 7.467 10.667 11.2 19.6 11.2zM316.116 142c-2.134 0-3.2-1.067-3.2-3.2V118h-56c-2 0-3-1-3-3V92.8c0-1.333.4-2.733 1.2-4.2l56.6-84.6c.8-1.333 2.066-2 3.8-2h28c2 0 3 1 3 3v85.4h11.2c.933 0 1.733.333 2.4 1 .666.533 1 1.267 1 2.2v21.2c0 .933-.334 1.733-1 2.4-.667.533-1.467.8-2.4.8h-11.2v20.8c0 2.133-1.067 3.2-3.2 3.2h-27.2zm-29.6-51.6h26.4V51.2l-26.4 39.2z"
          />
        </svg>
      )
    case 'error':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          width="850"
          zoomAndPan="magnify"
          viewBox="0 0 637.5 269.999989"
          height="360"
          preserveAspectRatio="xMidYMid meet"
          version="1.0"
        >
          <defs>
            <g />
          </defs>
          <g fill="currentColor" fill-opacity="1">
            <g transform="translate(1.64934, 204.303101)">
              <g>
                <path d="M 92.21875 0 L 16.539062 0 L 16.539062 -131.40625 L 92.21875 -131.40625 L 92.21875 -108.578125 L 44.402344 -108.578125 L 44.402344 -79.726562 L 88.894531 -79.726562 L 88.894531 -56.894531 L 44.402344 -56.894531 L 44.402344 -23.007812 L 92.21875 -23.007812 Z M 92.21875 0 " />
              </g>
            </g>
          </g>
          <g fill="currentColor" fill-opacity="1">
            <g transform="translate(104.741773, 204.303101)">
              <g>
                <path d="M 44.402344 -73.074219 L 53.390625 -73.074219 C 62.199219 -73.074219 68.699219 -74.542969 72.894531 -77.476562 C 77.089844 -80.414062 79.1875 -85.027344 79.1875 -91.320312 C 79.1875 -97.550781 77.042969 -101.984375 72.757812 -104.621094 C 68.476562 -107.257812 61.839844 -108.578125 52.851562 -108.578125 L 44.402344 -108.578125 Z M 44.402344 -50.421875 L 44.402344 0 L 16.539062 0 L 16.539062 -131.40625 L 54.828125 -131.40625 C 72.683594 -131.40625 85.898438 -128.15625 94.464844 -121.65625 C 103.035156 -115.152344 107.320312 -105.28125 107.320312 -92.039062 C 107.320312 -84.308594 105.191406 -77.433594 100.9375 -71.410156 C 96.683594 -65.390625 90.660156 -60.671875 82.871094 -57.253906 C 102.644531 -27.714844 115.527344 -8.628906 121.519531 0 L 90.601562 0 L 59.230469 -50.421875 Z M 44.402344 -50.421875 " />
              </g>
            </g>
          </g>
          <g fill="currentColor" fill-opacity="1">
            <g transform="translate(226.259619, 204.303101)">
              <g>
                <path d="M 44.402344 -73.074219 L 53.390625 -73.074219 C 62.199219 -73.074219 68.699219 -74.542969 72.894531 -77.476562 C 77.089844 -80.414062 79.1875 -85.027344 79.1875 -91.320312 C 79.1875 -97.550781 77.042969 -101.984375 72.757812 -104.621094 C 68.476562 -107.257812 61.839844 -108.578125 52.851562 -108.578125 L 44.402344 -108.578125 Z M 44.402344 -50.421875 L 44.402344 0 L 16.539062 0 L 16.539062 -131.40625 L 54.828125 -131.40625 C 72.683594 -131.40625 85.898438 -128.15625 94.464844 -121.65625 C 103.035156 -115.152344 107.320312 -105.28125 107.320312 -92.039062 C 107.320312 -84.308594 105.191406 -77.433594 100.9375 -71.410156 C 96.683594 -65.390625 90.660156 -60.671875 82.871094 -57.253906 C 102.644531 -27.714844 115.527344 -8.628906 121.519531 0 L 90.601562 0 L 59.230469 -50.421875 Z M 44.402344 -50.421875 " />
              </g>
            </g>
          </g>
          <g fill="currentColor" fill-opacity="1">
            <g transform="translate(347.777465, 204.303101)">
              <g>
                <path d="M 135.8125 -65.882812 C 135.8125 -44.132812 130.417969 -27.414062 119.632812 -15.730469 C 108.847656 -4.042969 93.386719 1.796875 73.253906 1.796875 C 53.121094 1.796875 37.660156 -4.042969 26.875 -15.730469 C 16.089844 -27.414062 10.695312 -44.191406 10.695312 -66.0625 C 10.695312 -87.933594 16.105469 -104.636719 26.917969 -116.171875 C 37.734375 -127.707031 53.238281 -133.476562 73.433594 -133.476562 C 93.628906 -133.476562 109.070312 -127.664062 119.769531 -116.039062 C 130.464844 -104.414062 135.8125 -87.695312 135.8125 -65.882812 Z M 39.90625 -65.882812 C 39.90625 -51.203125 42.695312 -40.148438 48.265625 -32.71875 C 53.839844 -25.285156 62.167969 -21.570312 73.253906 -21.570312 C 95.484375 -21.570312 106.601562 -36.34375 106.601562 -65.882812 C 106.601562 -95.484375 95.542969 -110.285156 73.433594 -110.285156 C 62.347656 -110.285156 53.988281 -106.554688 48.355469 -99.09375 C 42.722656 -91.632812 39.90625 -80.5625 39.90625 -65.882812 Z M 39.90625 -65.882812 " />
              </g>
            </g>
          </g>
          <g fill="currentColor" fill-opacity="1">
            <g transform="translate(494.281966, 204.303101)">
              <g>
                <path d="M 44.402344 -73.074219 L 53.390625 -73.074219 C 62.199219 -73.074219 68.699219 -74.542969 72.894531 -77.476562 C 77.089844 -80.414062 79.1875 -85.027344 79.1875 -91.320312 C 79.1875 -97.550781 77.042969 -101.984375 72.757812 -104.621094 C 68.476562 -107.257812 61.839844 -108.578125 52.851562 -108.578125 L 44.402344 -108.578125 Z M 44.402344 -50.421875 L 44.402344 0 L 16.539062 0 L 16.539062 -131.40625 L 54.828125 -131.40625 C 72.683594 -131.40625 85.898438 -128.15625 94.464844 -121.65625 C 103.035156 -115.152344 107.320312 -105.28125 107.320312 -92.039062 C 107.320312 -84.308594 105.191406 -77.433594 100.9375 -71.410156 C 96.683594 -65.390625 90.660156 -60.671875 82.871094 -57.253906 C 102.644531 -27.714844 115.527344 -8.628906 121.519531 0 L 90.601562 0 L 59.230469 -50.421875 Z M 44.402344 -50.421875 " />
              </g>
            </g>
          </g>
        </svg>
      )
    default:
      return null
  }
}

export function NotFound({
  title = 'Strona nie znaleziona',
  description = 'Przepraszamy, ale nie możemy odnaleźć strony, której szukasz. Sprawdź adres URL lub wróć na stronę główną.',
}: NotFoundProps) {
  return (
    <div className="relative text-center z-[1] md:pt-52">
      <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-primary sm:text-7xl">
        {title}
      </h1>
      <p className="mt-6 text-pretty text-lg font-medium text-muted-foreground sm:text-xl/8">
        {description}
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-y-3 sm:space-x-2 mx-auto sm:max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8" />
        </div>
        <Button variant="outline">Szukaj</Button>
      </div>
      <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-y-3 gap-x-6">
        <Button variant="secondary" asChild className="group">
          <a href="#">
            <ArrowLeft
              className="me-2 ms-0 opacity-60 transition-transform group-hover:-translate-x-0.5"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Powrót
          </a>
        </Button>
        <Button className="-order-1 sm:order-none" asChild>
          <a href="#">Strona główna</a>
        </Button>
      </div>
    </div>
  )
}

export const NotFoundPage = () => (
  <div className="relative flex flex-col w-full justify-center bg-background p-6 md:p-10">
    <div className="relative max-w-5xl mx-auto w-full">
      <Illustration
        type={'not-found'}
        className="absolute inset-0 w-full h-[50vh] opacity-[0.04] dark:opacity-[0.03] text-foreground"
      />
      <NotFound
        title="Strona nie znaleziona"
        description="Przepraszamy, ale nie możemy odnaleźć strony, której szukasz. Sprawdź adres URL lub wróć na stronę główną."
      />
    </div>
  </div>
)

export const ErrorPage = ({ error }: { error: unknown }) => {
  console.log('Error in route:', error)
  return (
    <div className="relative flex flex-col w-full justify-center bg-background p-6 md:p-10">
      <div className="relative max-w-5xl mx-auto w-full">
        <Illustration
          type={'error'}
          className="absolute inset-0 w-full h-[50vh] opacity-[0.04] dark:opacity-[0.03] text-foreground"
        />
        <NotFound
          title="Ups… Coś poszło nie tak"
          description="Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę lub wróć później."
        />
      </div>
    </div>
  )
}

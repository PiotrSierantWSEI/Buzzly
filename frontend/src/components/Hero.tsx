import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <>
      <div>
        <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
          <div className="flex justify-center">
            <a
              className="inline-flex items-center gap-x-2 rounded-full border p-1 ps-3 text-sm transition"
              href="#"
            >
              <span className="hidden md:block">
                Zaloguj się aby uzyskać dostęp do pełnej funkcjonalności
              </span>
              <span className="md:hidden">Podziel się opinią</span>
              <span className="bg-muted-foreground/15 inline-flex items-center justify-center gap-x-2 rounded-full px-2.5 py-1.5 text-sm font-semibold">
                <svg
                  className="h-4 w-4 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </a>
          </div>
          <div className="mx-auto mt-5 max-w-2xl text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Buzzly - system zarządzania recenzjami produktów
            </h1>
          </div>
          <div className="mx-auto mt-5 max-w-3xl text-center">
            <p className="text-muted-foreground text-xl">
              Zarządzaj recenzjami produktów w jednej, przejrzystej platformie —
              szybko, sprawnie i z pełną kontrolą.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size={'lg'}>Przeglądaj produtky</Button>
            <Button size={'lg'} variant={'outline'}>
              Dowiedź się więcej
            </Button>
          </div>
          <div className="mt-5 flex items-center justify-center text-muted-foreground gap-x-1 text-sm flex-wrap">
              Zbuduj{' '}
              <strong className="text-black dark:text-white">zaufanie</strong>{' '}
              klientów dzięki autentycznym opiniom
          </div>
        </div>
      </div>
    </>
  )
}

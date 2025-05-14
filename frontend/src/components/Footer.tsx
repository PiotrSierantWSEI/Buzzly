'use client'

import { useTheme } from '@/providers/ThemeProvider'
import { ArrowUp, Heart, Mail, Moon, Sun } from 'lucide-react'

function handleScrollTop() {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  })
}

const navigation = {
  categories: [
    {
      id: 'footer-nav',
      name: 'footer-nav',
      sections: [
        {
          id: 'autentication',
          name: 'Autentykacja',
          items: [
            { name: 'Logowanie', href: '/logowanie' },
            { name: 'Rejestracja', href: '/rejestracja' },
          ],
        },
        {
          id: 'home',
          name: 'Strona główna',
          items: [
            { name: 'Strona głowna', href: '/' },
            { name: 'Wyszukiwarka', href: '/#search' },
          ],
        },
        {
          id: 'Det',
          name: 'Custom',
          items: [{ name: 'Wszystkie produkty', href: '/wszystkie-produkty' }],
        },
        {
          id: 'products',
          name: 'Produkty',
          items: [{ name: 'Top 4 produktów', href: '/#top-hero' }],
        },

        {
          id: 'fn',
          name: 'Funkcje',
          items: [{ name: 'Funkcje', href: '/#funkcje' }],
        },
      ],
    },
  ],
}

export default function Footer() {
  return (
    <footer className="border-ali/20 :px-4 mx-auto w-full border-b   border-t  px-2">
      <div className="relative mx-auto grid  max-w-7xl items-center justify-center gap-6 p-10 pb-0 md:flex ">
        <a href="/">
          <p className="flex items-center justify-center rounded-full  ">
            Buzzly
          </p>
        </a>
        <p className="bg-transparent text-center text-xs leading-4 text-primary/60 md:text-left">
          Buzzly to nowoczesne, kompleksowe narzędzie stworzone z myślą o
          firmach, które chcą w pełni wykorzystać potencjał opinii swoich
          klientów. W świecie e-commerce, gdzie konkurencja stale rośnie,
          zaufanie użytkowników staje się kluczowym czynnikiem decydującym o
          sukcesie. Buzzly pozwala gromadzić, moderować i analizować recenzje
          produktów w jednym miejscu
          <strong>
            {' '}
            © {new Date().getFullYear()} Buzzly. Wszelkie prawa zastrzeżone.
          </strong>
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="border-b border-dotted"> </div>
        <div className="py-10">
          {navigation.categories.map((category) => (
            <div
              key={category.name}
              className="grid grid-cols-3 flex-row justify-between gap-6 leading-6 md:flex"
            >
              {category.sections.map((section) => (
                <div key={section.name}>
                  <ul
                    role="list"
                    aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                    className="flex flex-col space-y-2"
                  >
                    {section.items.map((item) => (
                      <li key={item.name} className="flow-root">
                        <a
                          href={item.href}
                          className="text-sm text-slate-600 hover:text-black dark:text-slate-400 hover:dark:text-white md:text-xs"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="border-b border-dotted"> </div>
      </div>

      <div className="flex flex-wrap justify-center gap-y-6">
        <div className="flex flex-wrap items-center justify-center gap-6 gap-y-4 px-6">
          <a
            aria-label="Logo"
            href="mailto:piotr.sierant96@gmail.com"
            rel="noreferrer"
            target="_blank"
            className={
              'hover:-translate-y-1 border border-dotted rounded-xl p-2.5 transition-transform'
            }
          >
            <Mail strokeWidth={1.5} className="h-5 w-5" />
          </a>
          <a
            aria-label="Logo"
            href="https://x.com/PiotrSierant96"
            rel="noreferrer"
            target="_blank"
            className={
              'hover:-translate-y-1 border border-dotted rounded-xl p-2.5 transition-transform'
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M 2.296875 2 C 2.052875 2 1.9117344 2.2756094 2.0527344 2.4746094 L 6.4882812 8.7050781 L 2.0136719 14 L 3.3457031 14 L 7.09375 9.5527344 L 9.9609375 13.580078 C 10.148938 13.844078 10.452391 14 10.775391 14 L 13.703125 14 C 13.947125 14 14.088266 13.724391 13.947266 13.525391 L 9.2753906 6.9628906 L 13.457031 2 L 12.154297 2 L 8.6738281 6.1191406 L 6.0390625 2.4199219 C 5.8510625 2.1559219 5.5476094 2 5.2246094 2 L 2.296875 2 z M 3.6542969 3 L 5.2246094 3 L 12.345703 13 L 10.775391 13 L 3.6542969 3 z"></path>
            </svg>
          </a>
          <a
            aria-label="Logo"
            href="https://www.instagram.com/dzd07"
            rel="noreferrer"
            target="_blank"
            className={
              'hover:-translate-y-1 border border-dotted rounded-xl p-2.5 transition-transform'
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M 4.773438 1 C 2.695313 1 1 2.695313 1 4.773438 L 1 10.230469 C 1 12.304688 2.695313 14 4.773438 14 L 10.230469 14 C 12.304688 14 14 12.304688 14 10.226563 L 14 4.773438 C 14 2.695313 12.304688 1 10.226563 1 Z M 4.773438 2 L 10.226563 2 C 11.765625 2 13 3.234375 13 4.773438 L 13 10.226563 C 13 11.765625 11.765625 13 10.230469 13 L 4.773438 13 C 3.234375 13 2 11.765625 2 10.230469 L 2 4.773438 C 2 3.234375 3.234375 2 4.773438 2 Z M 11.5 3 C 11.222656 3 11 3.222656 11 3.5 C 11 3.777344 11.222656 4 11.5 4 C 11.777344 4 12 3.777344 12 3.5 C 12 3.222656 11.777344 3 11.5 3 Z M 7.5 4 C 5.574219 4 4 5.574219 4 7.5 C 4 9.425781 5.574219 11 7.5 11 C 9.425781 11 11 9.425781 11 7.5 C 11 5.574219 9.425781 4 7.5 4 Z M 7.5 5 C 8.886719 5 10 6.113281 10 7.5 C 10 8.886719 8.886719 10 7.5 10 C 6.113281 10 5 8.886719 5 7.5 C 5 6.113281 6.113281 5 7.5 5 Z"></path>
            </svg>
          </a>
          <a
            aria-label="Logo"
            href="https://www.linkedin.com/in/piotr-sierant/"
            rel="noreferrer"
            target="_blank"
            className={
              'hover:-translate-y-1 border border-dotted rounded-xl p-2.5 transition-transform'
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M 2.757813 1 C 1.792969 1 1 1.792969 1 2.757813 L 1 12.246094 C 1 13.207031 1.792969 14 2.757813 14 L 12.246094 14 C 13.207031 14 14 13.207031 14 12.246094 L 14 2.757813 C 14 1.792969 13.207031 1 12.246094 1 Z M 2.757813 2 L 12.246094 2 C 12.667969 2 13 2.332031 13 2.757813 L 13 12.246094 C 13 12.667969 12.667969 13 12.246094 13 L 2.757813 13 C 2.332031 13 2 12.667969 2 12.246094 L 2 2.757813 C 2 2.332031 2.332031 2 2.757813 2 Z M 4 3 C 3.449219 3 3 3.449219 3 4 C 3 4.550781 3.449219 5 4 5 C 4.550781 5 5 4.550781 5 4 C 5 3.449219 4.550781 3 4 3 Z M 3 6 L 3 12 L 5 12 L 5 6 Z M 6 6 L 6 12 L 8 12 L 8 9.320313 C 8 8.488281 8.078125 7.742188 9.078125 7.742188 C 10.0625 7.742188 10 8.636719 10 9.375 L 10 12 L 12 12 L 12 9.039063 C 12 7.320313 11.640625 6 9.691406 6 C 8.753906 6 8.28125 6.375 8.023438 6.875 L 8 6.875 L 8 6 Z"></path>
            </svg>
          </a>
          <a
            aria-label="Logo"
            href="https://www.github.com/PiotrSierant"
            rel="noreferrer"
            target="_blank"
            className={
              'hover:-translate-y-1 border border-dotted rounded-xl p-2.5 transition-transform'
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M 7.5 1 C 3.910156 1 1 3.90625 1 7.488281 C 1 10.355469 2.863281 12.789063 5.445313 13.648438 C 5.769531 13.707031 6 13.375 6 13.125 C 6 12.972656 6.003906 12.789063 6 12.25 C 4.191406 12.640625 3.625 11.375 3.625 11.375 C 3.328125 10.625 2.96875 10.410156 2.96875 10.410156 C 2.378906 10.007813 3.011719 10.019531 3.011719 10.019531 C 3.664063 10.0625 4 10.625 4 10.625 C 4.5 11.5 5.628906 11.414063 6 11.25 C 6 10.851563 6.042969 10.5625 6.152344 10.378906 C 4.109375 10.019531 2.996094 8.839844 3 7.207031 C 3.003906 6.242188 3.335938 5.492188 3.875 4.9375 C 3.640625 4.640625 3.480469 3.625 3.960938 3 C 5.167969 3 5.886719 3.871094 5.886719 3.871094 C 5.886719 3.871094 6.453125 3.625 7.496094 3.625 C 8.542969 3.625 9.105469 3.859375 9.105469 3.859375 C 9.105469 3.859375 9.828125 3 11.035156 3 C 11.515625 3.625 11.355469 4.640625 11.167969 4.917969 C 11.683594 5.460938 12 6.210938 12 7.207031 C 12 8.839844 10.890625 10.019531 8.851563 10.375 C 8.980469 10.570313 9 10.84375 9 11.25 C 9 12.117188 9 12.910156 9 13.125 C 9 13.375 9.226563 13.710938 9.558594 13.648438 C 12.140625 12.785156 14 10.355469 14 7.488281 C 14 3.90625 11.089844 1 7.5 1 Z"></path>
            </svg>
          </a>
        </div>
        <ThemeToogleFooter />
      </div>

      <div className="mx-auto mb-10 mt-10 flex flex-col justify-between text-center text-xs md:max-w-7xl">
        <div className="flex flex-row items-center justify-center gap-1 text-slate-600 dark:text-slate-400">
          <span> © </span>
          <span>{new Date().getFullYear()}</span>
          <span>Wykonane z</span>
          <Heart className="text-red-600 mx-1 h-4 w-4 animate-pulse" />
          <span> przez </span>
          <span className="hover:text-ali dark:hover:text-ali cursor-pointer text-black dark:text-white">
            <a
              aria-label="Logo"
              className="font-bold"
              href="https://www.instagram.com/aliimam.in/"
              target="_blank"
            >
              Piotr Sierant {''}
            </a>
          </span>
          -
          <span className="hover:text-ali dark:hover:text-red-600 cursor-pointer text-slate-600 dark:text-slate-400">
            <a aria-label="Logo" className="" href="/">
              Buzzly
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export const ThemeToogleFooter = () => {
  const { setTheme } = useTheme()
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center rounded-full border border-dotted">
        <button
          onClick={() => setTheme('light')}
          className="bg-black mr-3 rounded-full p-2 text-white dark:bg-background dark:text-white"
        >
          <Sun className="h-5 w-5" strokeWidth={1} />
          <span className="sr-only">T</span>
        </button>

        <button type="button" onClick={handleScrollTop}>
          <ArrowUp className="h-3 w-3" />
          <span className="sr-only">Top</span>
        </button>

        <button
          onClick={() => setTheme('dark')}
          className="dark:bg-black ml-3 rounded-full p-2 text-black dark:text-white"
        >
          <Moon className="h-5 w-5" strokeWidth={1} />
          <span className="sr-only">T</span>
        </button>
      </div>
    </div>
  )
}

import { Card, CardContent } from '@/components/ui/card'
import {
  RocketIcon,
  ShieldCheckIcon,
  ZapIcon,
  BarChartIcon,
} from 'lucide-react'

const features = [
  {
    icon: RocketIcon,
    title: 'Moderacja treści',
    description:
      'Pełna lista wszystkich recenzji w jednym panelu – żadnych rozsianych plików czy maili.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Centralne zarządzanie',
    description:
      'Zatwierdzaj, odrzucaj, poprawiaj lub usuwaj recenzje jednym kliknięciem.',
  },
  {
    icon: ZapIcon,
    title: 'Analiza',
    description:
      '	Średnia ocena, liczba opinii, trendy w czasie – wszystko w formie czytelnych wykresów.',
  },
  {
    icon: BarChartIcon,
    title: 'Akcje zbiorcze',
    description:
      'Masowe zatwierdzanie, odrzucanie i usuwanie recenzji pozwoli Ci oszczędzić godziny pracy.',
  },
]

export default function Feature() {
  return (
    <section id="funkcje" className="container mx-auto space-y-8 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold">
          Funkcje, które usprawnią Twoją pracę
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Wszystko, czego potrzebujesz, aby wykonywać swoją pracę wydajnie i
          skutecznie. Zbudowane dla twórców i firm, zaprojektowane dla sukcesu.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.title} className="p-0">
            <CardContent className="space-y-2 p-6">
              <feature.icon className="text-primary h-12 w-12" />
              <h3 className="font-bold">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

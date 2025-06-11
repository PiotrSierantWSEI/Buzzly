import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaDescription,
  CredenzaBody,
} from "@/components/ui/credenza"
import type { Product } from "@/routes/wszystkie-produkty"
import { AddReviewForm } from "./forms/AddReviewForm"

type AddReviewModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product
}

export function AddReviewModal({ open, onOpenChange, product }: AddReviewModalProps) {
  return (
    <Credenza open={open} onOpenChange={onOpenChange}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle className="leading-6">Dodaj recenzję do: {product.title}</CredenzaTitle>
          <CredenzaDescription>
            Wypełnij formularz i podziel się swoją opinią o tym produkcie.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <AddReviewForm product={product} onOpenChange={onOpenChange} />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  )
}

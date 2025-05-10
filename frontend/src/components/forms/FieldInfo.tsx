import { type AnyFieldApi } from '@tanstack/react-form'
export function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length > 0 ? (
        <small className="block text-red-600">
          {field.state.meta.errors.join(', ')}
        </small>
      ) : null}
    </>
  )
}
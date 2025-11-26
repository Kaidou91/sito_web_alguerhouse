import {CreditCard} from 'lucide-react';

export default function PaymentWidget() {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-primary-600" />
        <p className="text-lg font-semibold text-primary-800">Pagamento sicuro</p>
      </div>
      <p className="mt-2 text-sm text-primary-600">
        Stripe PaymentIntent con possibilità di acconto 30% o pagamento completo. I dati saranno confermati in seguito.
      </p>
      <button className="btn-primary mt-4">Procedi</button>
    </div>
  );
}

export interface PaymentProps {
  transaction_status: string;
  payment_type: string;
  fraud_status: string;
  signature_key: string;
  order_id: string;
  gross_amount: number;
  status_code: string;
}

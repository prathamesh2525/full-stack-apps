import { useSearchParams } from "react-router-dom"

const PaymentSuccess = () => {
  const seachQuery = useSearchParams()[0]

  const referenceNum = seachQuery.get("reference")

  return (
    <div className="h-screen justify-items-center">
      <div className="text-4xl uppercase">Order Successfull</div>
      <div>Reference No.{referenceNum}</div>
    </div>
  )
}

export default PaymentSuccess

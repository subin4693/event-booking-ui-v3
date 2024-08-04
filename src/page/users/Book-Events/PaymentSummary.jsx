import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

const PaymentSummary = ({ code, setCode, totalCost, handlePayment }) => {
    const [loading, setLoading] = useState(false);
    return (
        <div className="bg-secondary rounded-lg p-5 w-full lg:w-1/2   space-y-3 shadow-lg">
            <h1 className="text-xl">Payment Summary</h1>
            <p>Please check the below details & proceed</p>
            <div className=" p-1 flex shadow-custom rounded-sm  overflow-hidden darK:border border-background dark:border-[1px]">
                <input
                    type="text"
                    placeholder="Voucher Code / Promo Code"
                    className="bg-secondary   border-none   p-3 pl-5  w-full   outline-none flex-1"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />

                <Button
                    variant="outline"
                    disabled={!code}
                    className=" h-[3.2rem] rounded-md"
                >
                    Apply
                </Button>
            </div>
            <div>
                <p>
                    <span className="text-xl">Sub Total :</span> {totalCost}
                </p>

                <p>
                    <span className="text-2xl ">Total:</span> {totalCost}
                </p>
            </div>
            <Button
                onClick={() => handlePayment(setLoading)}
                className="w-full md:w-1/2"
                disabled={loading}
            >
                {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    "Proceed to Payment"
                )}
            </Button>
        </div>
    );
};

export default PaymentSummary;

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const TicketPriceDialog = ({
    setCategorys,
    categorys,
    setShowDialog,
    showDialog,
    handleConfirm,
    setPublishLoading,
    eventId,
}) => {
    const { toast } = useToast();
    return (
        <Dialog className="w-[5000px]" open={showDialog}>
            <DialogContent>
                {/* <DialogHeader> */}
                <DialogTitle className="cursor-default flex justify-between items-center">
                    Select or Create Ticket types
                    <Button
                        onClick={() => {
                            if (categorys.length === 0)
                                return toast({
                                    variant: "destructive",
                                    title: "Provide a valid category",
                                });
                            const isOk = categorys.every(
                                (cat) => cat.category.trim().length > 0
                            );

                            if (!isOk)
                                return toast({
                                    variant: "destructive",
                                    title: "Provide a valid category name",
                                });
                            setShowDialog(false);
                            return handleConfirm(
                                eventId,
                                setPublishLoading,
                                categorys
                            );
                            1;
                        }}
                    >
                        Publish
                    </Button>
                </DialogTitle>
                {/* </DialogHeader> */}
                <div className="md:flex gap-2 justify-between  ">
                    <div className="flex-1">
                        <button
                            className="w-full rounded-md hover:bg-secondary   px-5 py-3"
                            onClick={() => {
                                setCategorys(typeOne);
                            }}
                        >
                            Tip
                        </button>

                        <button
                            className="w-full rounded-md hover:bg-secondary  px-5 py-3 mt-2"
                            onClick={() => {
                                setCategorys(typeTwo);
                            }}
                        >
                            New
                        </button>
                    </div>
                    <div className="w-full   flex-1 space-y-3">
                        {categorys?.map(({ category, price }, index) => (
                            <div className="flex gap-2  " key={index}>
                                <input
                                    type="text"
                                    value={category}
                                    className="bg-input rounded-md p-3 pl-5 w-full shadow-custom outline-none"
                                    placeholder="Category"
                                    onChange={(e) => {
                                        const newCategorys = [...categorys];
                                        newCategorys[index] = {
                                            ...newCategorys[index],
                                            category: e.target.value,
                                        };
                                        setCategorys(newCategorys);
                                    }}
                                />
                                <input
                                    value={price}
                                    type="text"
                                    className="bg-input rounded-md p-3 pl-5 w-full shadow-custom outline-none"
                                    placeholder="Price"
                                    onChange={(e) => {
                                        if (isNaN(e.target.value)) return;
                                        const newCategorys = [...categorys];
                                        newCategorys[index] = {
                                            ...newCategorys[index],
                                            price: e.target.value,
                                        };
                                        setCategorys(newCategorys);
                                    }}
                                />
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        const newCategorys = [...categorys];
                                        const newval = newCategorys.filter(
                                            (cat, ind) => index !== ind
                                        );
                                        setCategorys(newval);
                                    }}
                                >
                                    <Trash />
                                </Button>
                            </div>
                        ))}
                        <button
                            className="border border-1 w-full rounded-md hover:bg-secondary cursor-default px-5 py-3 mt-2"
                            onClick={() => {
                                const newCategorys = [...categorys];
                                newCategorys.push({ category: "", price: "" });
                                setCategorys(newCategorys);
                            }}
                        >
                            Add
                        </button>
                    </div>
                </div>
                {/* <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </DialogDescription> */}
            </DialogContent>
        </Dialog>
    );
};

export default TicketPriceDialog;

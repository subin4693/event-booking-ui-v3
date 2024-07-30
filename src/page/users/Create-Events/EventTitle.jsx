import React from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { DatePickerWithRange } from "@/components/DatePicker";

const EventTitle = ({
  setTitle,
  title,
  setDescription,
  description,
  setShowTitleField,
  setImage,
  image,
  date,
  setDate,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80">
      <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-[900px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-center text-xl font-bold">Create Event</h1>
          <div>
            <Button>
              <Link to="/users/events">Close</Link>
            </Button>{" "}
            &nbsp;&nbsp;&nbsp;
            <Button
              onClick={() => {
                if (title.trim() && description.trim() && image)
                  return setShowTitleField(false);
              }}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row  gap-5">
          <div className="flex-1 ">
            <div className="  bg-input rounded-[25px] h-full overflow-hidden border  group shadow-custom">
              <label className=" h-full min-h-[300px] cursor-pointer flex items-center justify-center">
                <input
                  type="file"
                  className="hidden w-full"
                  onChange={(e) => {
                    return setImage(e.target.files[0]);
                  }}
                />
                {image ? (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      className="w-full h-full min-h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div
                      className={`absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-70 transition duration-300`}
                    ></div>
                  </div>
                ) : (
                  <>
                    {" "}
                    <ImageIcon className="size-20 text-gray-400" />
                    {/* <CiImageOn className="size-20 text-gray-400" />{" "} */}
                  </>
                )}
              </label>
            </div>
          </div>
          <div className="flex-1   space-y-5">
            <input
              type="text"
              className="bg-input rounded-[25px] p-2 w-full shadow-custom"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event Title"
            />
            <DatePickerWithRange
              date={date}
              setDate={setDate}
              className=" bg-input rounded-[25px]  w-full shadow-custom"
            />
            <textarea
              rows="5"
              className="bg-input rounded-[25px] p-4 w-full shadow-custom resize-none overflow-auto box-border h-[60%]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event Description"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTitle;

import {DEFAULT_END_TIME, DEFAULT_START_TIME} from "@/common/constant";

export function defaultSlotTime(){
    const config = {
        isAllDay: false,
        isHoliday: false,
        data: [
            {
                from: DEFAULT_START_TIME,
                to: DEFAULT_END_TIME,
            }
        ]
    }
    return JSON.parse(JSON.stringify(config));
}
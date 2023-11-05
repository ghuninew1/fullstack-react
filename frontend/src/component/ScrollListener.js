import { useState, useEffect,useMemo,useCallback } from "react";

export default function ScrollListener() {
    const [data, setData] = useState({
        x: 0,
        y: 0,
        lastX: 0,
        lastY: 0,
    });
    
    const handleScroll = useCallback(() => {
        setData((prev) => ({
            x: window.scrollX,
            y: window.scrollY,
            lastX: prev.x,
            lastY: prev.y,
        }));
    } ,[]);


    const dataScroll = useMemo(() => {
        return {
            x: data.x,
            y: data.y,
            lastX: data.lastX,
            lastY: data.lastY,
        };
    } ,[data]);        


    useEffect(() => {
        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    return dataScroll;
}

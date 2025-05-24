"use client";
import React from "react";
import Image from "next/image";

function AnimatedTopics() {
    const topics =( [
        "cricket",
        "operation Sindoor",
        "trump",
        "market",
        "worldwar3",
        "fashion",
        "sports",
        "person",
        "AI ChatGPT",
        "Job",
    ]);
    const [index, setIndex] = React.useState(0);
    const [animating, setAnimating] = React.useState(false);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setAnimating(true);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % topics.length);
                setAnimating(false);
            }, 400);
        }, 2200);
        return () => clearInterval(interval);
    }, [topics.length]);

    const [isInputActive, setIsInputActive] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");

    const handleFocus = () => setIsInputActive(true);
    const handleBlur = () => setIsInputActive(false);
    const handleChange = (e) => setInputValue(e.target.value);

    return (
        <div
            className="text-gray-400 flex justify-between flex-row items-center rounded-full bg-dark-4"
            style={{
             
                width: "100%",
                height: "40px",
                position:"relative"
            }}
        >    <input type="text"
                    className=" text-light-1 outline-dashed rounded-full w-full relative"
                    value={inputValue}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                        background: "transparent",
                        zIndex: 2,
                        width: "400px",
                        height: "40px",
                        paddingLeft: "16px"
                    }}
                    placeholder="Search for "
                />
            <div  className={
                `overflow-hidden left-0 text-light-3 absolute top-0 -translate-y-1/2 transition-all duration-600 ease-out  pointer-events-none ${
                            animating ? "animate-slide-up" : "animate-slide-in"
                        }`} 
                         style={{
                            position:"absolute",
                            width:"200px",

                }}
                        
                        >
                {!isInputActive && !inputValue && (
                                          topics[index]

                )}
            
            </div>
            <Image
                src="/assets/search.svg"
                alt="Search"
                width={20}
                height={25}
                style={{
                    opacity: 0.7,
                    width: "20%",
                    height: "25px",
                    cursor: "pointer",
                    position:"absolute",
                    right: "0"


                }}
            />
            <style jsx>{`
                .animate-slide-up {
                    opacity: 0;
                    transform: translateY(-20px);
                    transition: opacity 0.4s, transform 0.4s;
                    translate:92px;
                }
                .animate-slide-in {
                    opacity: 1;
                    transform: translateY(0);
                    transition: opacity 0.4s, transform 0.4s;
                    translate:92px;
                }
            `}</style>
        </div>
    );
}

export default AnimatedTopics;

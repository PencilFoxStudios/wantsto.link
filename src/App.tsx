

import yipToLogo from './assets/yiptoyellow.png';
import './App.css'
import { TypeAnimation } from 'react-type-animation';
import { useLocation } from "react-router";
import {useEffect} from "react";
const names = ['fred', 'paul', 'mike']
const domains = ['yips.to', 'meows.to', 'barks.to', 'wantsto.link', 'wantsyouto.click']
const slugs = ['discord', 'bluesky', 'youtube']

const allowedDomains = ["https://yip.to", "https://www.yip.to", "yip.to", "www.yip.to"]

function App() {
    // redirect to main app URL if not currently there and not on dev environment
    const location = useLocation()

    useEffect(() => {
        const isDev = import.meta.env.MODE === 'development'
        if(isDev) return console.log("Development environment detected!", location.pathname, location.search);
        const currentHost = window.location.hostname

        if (!allowedDomains.includes(currentHost) && (location.pathname.length <= 1)) {
            console.log("redirecting", location.pathname, location.search)
            window.location.href = `https://yip.to${location.pathname}${location.search}`
        }
    }, [location.pathname, location.search])

    function getSequence(arr: string[], delay:number = 1000): (string|number)[] {
        const seq = [];
        for (const item of arr) {
            seq.push(item)
            seq.push(delay);
        }
        return seq;
    }

    return (
        <>
            <div>
                <a href="https://yip.to" target="_blank">
                    <img src={yipToLogo} className="logo" alt="yip.to logo" />
                </a>

            </div>
            <h1>

                <TypeAnimation
                    sequence={getSequence(names, 10000)}
                    cursor={false}
                    repeat={Infinity}
                    style={{color: "#eb5858"}}
                    className={"silkscreen-regular"}
                /><span className={"silkscreen-regular"}>.</span>
                <TypeAnimation
                    sequence={getSequence(domains, 7500)}
                    cursor={false}
                    repeat={Infinity}
                    style={{color: "#23a55a"}}
                    className={"silkscreen-regular"}
                /><span className={"silkscreen-regular"}>/</span>
                <TypeAnimation
                    sequence={getSequence(slugs, 3000)}
                    cursor={false}
                    repeat={Infinity}
                    style={{color: "#56a8f5"}}
                    className={"silkscreen-regular"}
                />

            </h1>
            <h2 className={"silkscreen-regular"}>a branded url shortener for the modern era</h2>
            <p className={"silkscreen-bold"}>coming soon</p>

        {/*    footer saying made with love by Pencil Fox Studios */}
            <footer className={"silkscreen-regular"}>
                &copy; 2025 <a style={{color: "#ff7a26", textDecoration: "none"}} href={"https://pnfx.dev"}>Pencil Fox Studios</a>. All rights reserved. {import.meta.env.MODE === 'development'?<strong style={{color: "pink"}}>DEVELOPMENT MODE IS CURRENTLY ACTIVE.</strong>:<></>}
            </footer>

        </>
    )
}

export default App
